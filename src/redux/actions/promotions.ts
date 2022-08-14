import NetworkStatus from "../../utils/enums/NetworkStatus";

export const Types = {
    FETCH_PROMOTIONS: "PROMOTIONS@FETCH:PROMOTIONS",
};

export const AsyncTypes = {
    SET_PROMOTIONS: "PROMOTIONS@SET:PROMOTIONS:ASYNC",
    SET_NETWORK_STATUS: "PROMOTIONS@SET:NETWORK:STATUS:ASYNC",
};

type TSetPromotions = {
    type: typeof AsyncTypes.SET_PROMOTIONS;
    payload: any[];
};

type TSetNetworkStatus = {
    type: typeof AsyncTypes.SET_NETWORK_STATUS;
    payload: NetworkStatus;
};

export type TReducerPromotionsActions = TSetPromotions | TSetNetworkStatus;

type TPromotionsActions = {
    setPromotions: (payload: any[]) => TSetPromotions;
    setNetworkStatus: (payload: NetworkStatus) => TSetNetworkStatus;
};

export const PromotionsActions: TPromotionsActions = {
    setPromotions(payload) {
        return {
            type: AsyncTypes.SET_PROMOTIONS,
            payload,
        };
    },
    setNetworkStatus(payload) {
        return {
            type: AsyncTypes.SET_NETWORK_STATUS,
            payload,
        };
    },
};
