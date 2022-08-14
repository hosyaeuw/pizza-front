import NetworkStatus from "../../utils/enums/NetworkStatus";
import { TCatalogItem } from "../types/catalog";

export const Types = {
    FETCH_CATALOG: "CATALOG@FETCH:CATALOG",
};

export const AsyncTypes = {
    SET_CATALOG: "CATALOG@SET:CATALOG:ASYNC",
    SET_NETWORK_STATUS: "CATALOG@SET:NETWORK:STATUS:ASYNC",
};

type TSetCatalog = {
    type: typeof AsyncTypes.SET_CATALOG;
    payload: TCatalogItem[];
};

type TSetNetworkStatus = {
    type: typeof AsyncTypes.SET_NETWORK_STATUS;
    payload: NetworkStatus;
};

export type TReducerCatalogActions = TSetCatalog | TSetNetworkStatus;

type TCatalogActions = {
    setCatalog: (payload: TCatalogItem[]) => TSetCatalog;
    setNetworkStatus: (payload: NetworkStatus) => TSetNetworkStatus;
};

export const CatalogActions: TCatalogActions = {
    setCatalog(payload) {
        return {
            type: AsyncTypes.SET_CATALOG,
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
