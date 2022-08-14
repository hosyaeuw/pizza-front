import NetworkStatus from "../../utils/enums/NetworkStatus";
import { AsyncTypes, TReducerUserActions, TUser } from "../actions/user";

export declare type UserState = {
    user: TUser | null;
    networkStatus: NetworkStatus;
};

const initState: UserState = {
    user: null,
    networkStatus: NetworkStatus.pending,
};

const user = (state = initState, action: TReducerUserActions): UserState => {
    let newState;
    switch (action.type) {
        case AsyncTypes.SET_USER:
            newState = { ...state, user: action.payload };
            break;
        case AsyncTypes.SET_NETWORK_STATUS:
            newState = { ...state, networkStatus: action.payload };
            break;
    }
    return (newState as any) || state;
};

export default user;
