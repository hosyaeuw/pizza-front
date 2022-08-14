import NetworkStatus from "../../utils/enums/NetworkStatus";
import { TReducerCatalogActions, AsyncTypes } from "../actions/catalog";
import { TCatalogItem } from "../types/catalog";

export declare type CatalogState = {
    catalog: TCatalogItem[];
    networkStatus: NetworkStatus;
};

const initState: CatalogState = {
    catalog: [],
    networkStatus: NetworkStatus.pending,
};

const catalog = (
    state = initState,
    action: TReducerCatalogActions
): CatalogState => {
    let newState;
    switch (action.type) {
        case AsyncTypes.SET_CATALOG:
            newState = { ...state, catalog: action.payload };
            break;
        case AsyncTypes.SET_NETWORK_STATUS:
            newState = { ...state, networkStatus: action.payload };
            break;
    }
    return (newState as any) || state;
};

export default catalog;
