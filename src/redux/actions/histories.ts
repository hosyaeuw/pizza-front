import NetworkStatus from "../../utils/enums/NetworkStatus";

export const Types = {
    FETCH_HISTORIES: "HISTORIES@FETCH:HISTORIES",
};

export type THistoryProduct = {
    id: number;
    img: string;
    name: string;
    characteristics: string[];
    quantity: number;
    price: number;
};

export type THistory = {
    id: number;
    products: THistoryProduct[];
    date: string;
    total: number;
    status: string;
    payment: string;
    address: string;
};

type TFetchAction = {
    type: typeof Types.FETCH_HISTORIES;
    payload: number;
};

type THistoriesActions = {
    fetchHistories: (page: number) => TFetchAction;
};

export const HistoriesActions: THistoriesActions = {
    fetchHistories(page) {
        return {
            type: Types.FETCH_HISTORIES,
            payload: page,
        };
    },
};

export const AsyncTypes = {
    SET_HISTORIES: "HISTORIES@SET:HISTORIES:ASYNC",
    SET_NETWORK_STATUS: "HISTORIES@SET:NETWORK:STATUS:ASYNC",
};

type TSetHistories = {
    type: typeof AsyncTypes.SET_HISTORIES;
    payload: Record<number, THistory[]>;
};

type TSetNetworkStatus = {
    type: typeof AsyncTypes.SET_NETWORK_STATUS;
    payload: NetworkStatus;
};

export type TReducerHistoriesActions = TSetNetworkStatus;

type THistoriesAsyncActions = {
    setHistories: (histories: Record<number, THistory[]>) => TSetHistories;
};

export const HistoriesAsyncActions: THistoriesAsyncActions = {
    setHistories(histories) {
        return {
            type: AsyncTypes.SET_HISTORIES,
            payload: histories,
        };
    },
};
