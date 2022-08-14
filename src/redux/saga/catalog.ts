import axios, { AxiosResponse } from "axios";
import { put, call } from "redux-saga/effects";
import { api } from "../../api";
import NetworkStatus from "../../utils/enums/NetworkStatus";
import { CatalogActions } from "../actions/catalog";
import { TCatalogItem } from "../types/catalog";
import { TResponse } from "../types/network";

export function* fetchCatalog() {
    yield put(CatalogActions.setNetworkStatus(NetworkStatus.loading));
    const { data }: AxiosResponse<TResponse<TCatalogItem[]>> = yield call(
        axios.get,
        api.getCatalog
    );
    if (data.success) {
        yield put(CatalogActions.setCatalog(data.result));
        yield put(CatalogActions.setNetworkStatus(NetworkStatus.ready));
    }
}
