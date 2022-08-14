// import axios, { AxiosResponse } from "axios";
import { put } from "redux-saga/effects";
import NetworkStatus from "../../utils/enums/NetworkStatus";
// import { api } from "../../api";
import { PromotionsActions } from "../actions/promotions";

export function* fetchPromotions() {
    yield put(PromotionsActions.setNetworkStatus(NetworkStatus.loading));
    yield put(PromotionsActions.setPromotions(Array(6).fill(0)));
    yield put(PromotionsActions.setNetworkStatus(NetworkStatus.ready));
}
