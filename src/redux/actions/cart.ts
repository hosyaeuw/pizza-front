import NetworkStatus from "../../utils/enums/NetworkStatus";
import { TIngredient, TProduct } from "../types/catalog";

export type TCartItem = {
    product: TProduct;
    quantity: number;
    additionalIngredients: TIngredient[];
    deleteIngredients: TIngredient[];
};

export const Types = {
    ADD_TO_CART: "CART@ADD:TO:CART",
    CHANGE_QUANTITY: "CART@CHANGE:QUANTITY",
    DELETE_FROM_CART: "CART@DELETE:FROM:CART",
};

type TAddToCart = {
    type: typeof Types.ADD_TO_CART;
    payload: {
        product: TProduct;
        price: number;
        additionalIngredients?: TIngredient[];
        deleteIngredients?: TIngredient[];
    };
};

type TDeleteFromCart = {
    type: typeof Types.DELETE_FROM_CART;
    payload: number;
};

type TChangeQuantity = {
    type: typeof Types.ADD_TO_CART;
    payload: {
        quantity: number;
        id: number;
    };
};

type TCartActions = {
    addToCart: (
        product: TProduct,
        price: number,
        additionalIngredients?: TIngredient[],
        deleteIngredients?: TIngredient[]
    ) => TAddToCart;
    deleteFromCart: (id: number) => TDeleteFromCart;
    changeQuantity: (quantity: number, id: number) => TChangeQuantity;
};

export const CartActions: TCartActions = {
    addToCart(
        product,
        price,
        additionalIngredients = [],
        deleteIngredients = []
    ) {
        return {
            type: Types.ADD_TO_CART,
            payload: {
                product,
                price,
                additionalIngredients,
                deleteIngredients,
            },
        };
    },
    deleteFromCart(id) {
        return {
            type: Types.DELETE_FROM_CART,
            payload: id,
        };
    },
    changeQuantity(quantity, id) {
        return {
            type: Types.CHANGE_QUANTITY,
            payload: {
                quantity,
                id,
            },
        };
    },
};

export const AsyncTypes = {
    ADD_TO_CART: "CART@ADD:TO:CART:ASYNC",
    DELETE_FROM_CART: "CART@DELETE:FROM:CART:ASYNC",
    CHANGE_QUANTITY: "CART@CHANGE:QUANTITY:ASYNC",
    HAVE_NEW_ITEM: "CART@HAVE:NEW:ITEM:ASYNC",
    SET_NETWORK_STATUS: "CART@SET:NETWORK:STATUS:ASYNC",
};

type TAddAsyncToCart = {
    type: typeof AsyncTypes.ADD_TO_CART;
    payload: Record<string, TCartItem>;
};

type TAsyncDeleteFromCart = {
    type: typeof AsyncTypes.DELETE_FROM_CART;
    payload: number;
};

type TAsyncChangeQuantity = {
    type: typeof AsyncTypes.ADD_TO_CART;
    payload: {
        quantity: number;
        id: number;
    };
};

type THaveNewItem = {
    type: typeof AsyncTypes.HAVE_NEW_ITEM;
    payload: boolean;
};

type TSetNetworkStatus = {
    type: typeof AsyncTypes.SET_NETWORK_STATUS;
    payload: NetworkStatus;
};

export type TReducerCartActions = TAddAsyncToCart | TSetNetworkStatus;

type TCartAsyncActions = {
    addToCart: (payload: Record<string, TCartItem>) => TAddAsyncToCart;
    deleteFromCart: (id: number) => TAsyncDeleteFromCart;
    haveNewItem: (payload: boolean) => THaveNewItem;
    changeQuantity: (quantity: number, id: number) => TAsyncChangeQuantity;
};

export const CartAsyncActions: TCartAsyncActions = {
    addToCart(payload) {
        return {
            type: AsyncTypes.ADD_TO_CART,
            payload,
        };
    },
    deleteFromCart(id) {
        return {
            type: AsyncTypes.DELETE_FROM_CART,
            payload: id,
        };
    },
    haveNewItem(payload) {
        return {
            type: AsyncTypes.HAVE_NEW_ITEM,
            payload,
        };
    },
    changeQuantity(quantity, id) {
        return {
            type: AsyncTypes.CHANGE_QUANTITY,
            payload: {
                quantity,
                id,
            },
        };
    },
};
