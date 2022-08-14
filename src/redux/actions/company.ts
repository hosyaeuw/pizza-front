import NetworkStatus from "../../utils/enums/NetworkStatus";

export const Types = {
    FETCH_COMPANY: "COMPANY@FETCH:COMPANY",
};

export type TCompany = {
    id: number;
    timeStart: string;
    timeFinish: string;
    averageDeliveryTime: string;
};

export const AsyncTypes = {
    SET_COMPANY: "COMPANY@SET:COMPANY:ASYNC",
    SET_NETWORK_STATUS: "COMPANY@SET:NETWORK:STATUS:ASYNC",
};

type TSetCompany = {
    type: typeof AsyncTypes.SET_COMPANY;
    payload: TCompany;
};

type TSetNetworkStatus = {
    type: typeof AsyncTypes.SET_NETWORK_STATUS;
    payload: NetworkStatus;
};

export type TReducerCompanyActions = TSetCompany | TSetNetworkStatus;

type TCompanyActions = {
    setCompany: (payload: TCompany) => TSetCompany;
    setNetworkStatus: (payload: NetworkStatus) => TSetNetworkStatus;
};

export const CompanyActions: TCompanyActions = {
    setCompany(payload) {
        return {
            type: AsyncTypes.SET_COMPANY,
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
