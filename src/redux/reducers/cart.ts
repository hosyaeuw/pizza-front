import NetworkStatus from "../../utils/enums/NetworkStatus";
import { TReducerCartActions, AsyncTypes, TCartItem } from "../actions/cart";

export declare type CatalogState = {
    cart: Record<string, TCartItem> | null;
    haveNewItem: boolean;
    networkStatus: NetworkStatus;
    resultSum: number;
    additionalCategories: number[];
};

const initState: CatalogState = {
    cart: null,
    haveNewItem: false,
    networkStatus: NetworkStatus.pending,
    resultSum: 0,
    additionalCategories: [3, 4],
};

const cart = (state = initState, action: TReducerCartActions): CatalogState => {
    let newState;
    switch (action.type) {
        case AsyncTypes.ADD_TO_CART:
            newState = { ...state, cart: action.payload };
            break;
        case AsyncTypes.CHANGE_QUANTITY: {
            const { quantity, id } = action.payload as any;
            const cart = { ...state.cart };
            cart[id]["quantity"] = quantity;
            newState = { ...state, cart: cart };
            break;
        }
        case AsyncTypes.DELETE_FROM_CART: {
            const cart = { ...state.cart };
            delete cart[action.payload as number];
            newState = {
                ...state,
                cart: Object.keys(cart).length > 0 ? cart : null,
            };
            break;
        }
        case AsyncTypes.HAVE_NEW_ITEM:
            newState = { ...state, haveNewItem: action.payload };
            break;
        case AsyncTypes.SET_NETWORK_STATUS:
            newState = { ...state, networkStatus: action.payload };
            break;
    }
    if (newState && newState.cart) {
        newState.resultSum = Object.values(newState.cart).reduce(
            (acc, cartItem) => acc + cartItem.product.price * cartItem.quantity,
            0
        );
    }
    return (newState as any) || state;
};

export default cart;
