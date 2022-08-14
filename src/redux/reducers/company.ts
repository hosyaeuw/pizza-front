import NetworkStatus from "../../utils/enums/NetworkStatus";
import { TCompany, AsyncTypes, TReducerCompanyActions } from "../actions/company";

export declare type CompanyState = {
    info: TCompany | null;
    networkStatus: NetworkStatus;
};

const initState: CompanyState = {
    info: null,
    networkStatus: NetworkStatus.pending,
};

const company = (state = initState, action: TReducerCompanyActions): CompanyState => {
    let newState;
    switch (action.type) {
        case AsyncTypes.SET_COMPANY:
            newState = { ...state, info: action.payload };
            break;
        case AsyncTypes.SET_NETWORK_STATUS:
            newState = { ...state, networkStatus: action.payload };
            break;
    }
    return (newState as any) || state;
};

export default company;
