import { fork, all } from "redux-saga/effects";
import { CartWatcher } from "./cart";
import { fetchCatalog } from "./catalog";
import { fetchCompany } from "./company";
import { HistoriesWatcher } from "./history";
import { fetchPromotions } from "./promotions";
import { userWatcher } from "./user";

export default function* rootSaga() {
    yield all([
        fork(fetchCompany),
        fork(fetchPromotions),
        fork(fetchCatalog),
        fork(CartWatcher),
        fork(HistoriesWatcher),
        fork(userWatcher),
    ]);
}
