import axios, { AxiosResponse } from "axios";
import { put, call } from "redux-saga/effects";
import { api } from "../../api";
import NetworkStatus from "../../utils/enums/NetworkStatus";
import { CompanyActions, TCompany } from "../actions/company";
import { TResponse } from "../types/network";

export function* fetchCompany() {
    yield put(CompanyActions.setNetworkStatus(NetworkStatus.loading));
    const { data }: AxiosResponse<TResponse<TCompany>> = yield call(
        axios.get,
        api.getCompany
    );
    if (data.success) {
        yield put(CompanyActions.setCompany(data.result));
        yield put(CompanyActions.setNetworkStatus(NetworkStatus.ready));
    }
}
