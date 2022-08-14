import NetworkStatus from "../../utils/enums/NetworkStatus";
import { TReducerPromotionsActions, AsyncTypes } from "../actions/promotions";

export declare type PromotionsHistory = {
    promotions: any[];
    networkStatus: NetworkStatus;
};

const initState: PromotionsHistory = {
    promotions: [],
    networkStatus: NetworkStatus.pending,
};

const promotions = (
    state = initState,
    action: TReducerPromotionsActions
): PromotionsHistory => {
    let newState;
    switch (action.type) {
        case AsyncTypes.SET_PROMOTIONS:
            newState = { ...state, promotions: action.payload };
            break;
        case AsyncTypes.SET_NETWORK_STATUS:
            newState = { ...state, networkStatus: action.payload };
            break;
    }
    return (newState as any) || state;
};

export default promotions;
