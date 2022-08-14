import NetworkStatus from "../../utils/enums/NetworkStatus";

export const Types = {
    FETCH_USER: "USER@FETCH:USER",
    LOGOUT: "USER@LOGOUT",
};

type TAddress = {
    street: string;
    house?: string;
    entrance?: string;
    floor?: string;
    flat?: string;
    intercom?: string;
};

export type TUser = {
    username: string;
    bonuses: number;
    name: string;
    phone: string;
    email?: string;
    address: TAddress;
};

type TFetchAction = {
    type: typeof Types.FETCH_USER;
};

type TUserActions = {
    fetchUser: () => TFetchAction;
    logout: () => void;
};

export const UserActions: TUserActions = {
    fetchUser() {
        return {
            type: Types.FETCH_USER,
        };
    },
    logout() {
        return {
            type: Types.LOGOUT,
        };
    },
};

export const AsyncTypes = {
    SET_USER: "USER@SET:USER:ASYNC",
    SET_NETWORK_STATUS: "USER@SET:NETWORK:STATUS:ASYNC",
};

type TSetUser = {
    type: typeof AsyncTypes.SET_USER;
    payload: TUser;
};

type TSetNetworkStatus = {
    type: typeof AsyncTypes.SET_NETWORK_STATUS;
    payload: NetworkStatus;
};

export type TReducerUserActions = TSetUser | TSetNetworkStatus;

type TUserAsyncActions = {
    setUser: (user: TUser) => TSetUser;
};

export const UserAsyncActions: TUserAsyncActions = {
    setUser(user) {
        return {
            type: AsyncTypes.SET_USER,
            payload: user,
        };
    },
};
