import NetworkStatus from "../../utils/enums/NetworkStatus";
import {
    AsyncTypes,
    THistory,
    TReducerHistoriesActions,
} from "../actions/histories";

export declare type HistoriesState = {
    histories: Record<number, THistory[]> | null;
    networkStatus: NetworkStatus;
    pageSize: number;
    totalPages: number;
};

const maxCount = 17;

const initState: HistoriesState = {
    histories: null,
    pageSize: 3,
    totalPages: maxCount,
    networkStatus: NetworkStatus.pending,
};

const histories = (
    state = initState,
    action: TReducerHistoriesActions
): HistoriesState => {
    let newState;
    switch (action.type) {
        case AsyncTypes.SET_HISTORIES:
            newState = { ...state, histories: action.payload };
            break;
        case AsyncTypes.SET_NETWORK_STATUS:
            newState = { ...state, networkStatus: action.payload };
            break;
    }
    return (newState as any) || state;
};

export default histories;
