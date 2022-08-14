import { put, select, takeEvery } from "redux-saga/effects";
import { CartAsyncActions, Types } from "../actions/cart";
import { AppStateType } from "../reducers";
import { TIngredient, TProduct } from "../types/catalog";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export function* changeQuantity({
    payload,
}: {
    type: string;
    payload: { quantity: number; id: number };
}) {
    yield put(CartAsyncActions.changeQuantity(payload.quantity, payload.id));
}

export function* deleteFromCart({
    payload,
}: {
    type: string;
    payload: number;
}) {
    yield put(CartAsyncActions.deleteFromCart(payload));
}

export function* addToCart({
    payload,
}: {
    type: string;
    payload: {
        product: TProduct;
        price: number;
        additionalIngredients: TIngredient[];
        deleteIngredients: TIngredient[];
    };
}) {
    const { cart }: AppStateType = yield select();
    const cartId = `${payload.product.id},${payload.additionalIngredients
        .map((ingredient) => ingredient.id)
        .join("")},${payload.deleteIngredients
        .map((ingredient) => ingredient.id)
        .join("")}`;
    console.log(cartId, payload);
    const newCartObj = {
        [cartId]: {
            product: { ...payload.product, price: payload.price },
            quantity: 1,
            additionalIngredients: payload.additionalIngredients,
            deleteIngredients: payload.deleteIngredients,
        },
    };
    if (!cart.cart) {
        yield put(CartAsyncActions.addToCart(newCartObj));
    } else {
        if (!Object.keys(cart.cart).includes(`${cartId}`)) {
            yield put(
                CartAsyncActions.addToCart({ ...cart.cart, ...newCartObj })
            );
        } else {
            cart.cart[cartId].quantity += 1;
            CartAsyncActions.addToCart({ ...cart.cart });
        }
    }
    yield put(CartAsyncActions.haveNewItem(true));
    yield delay(2000);
    yield put(CartAsyncActions.haveNewItem(false));
}

export function* CartWatcher() {
    yield takeEvery(Types.ADD_TO_CART, addToCart);
    yield takeEvery(Types.CHANGE_QUANTITY, changeQuantity);
    yield takeEvery(Types.DELETE_FROM_CART, deleteFromCart);
}
