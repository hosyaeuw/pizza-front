import { put, select, takeEvery } from "redux-saga/effects";
import { HistoriesAsyncActions, Types } from "../actions/histories";
import { AppStateType } from "../reducers";

const products = Array(3)
    .fill({
        img: "/static/media/Rectangle_4.png",
        name: "Пепперони по-деревенски",
        characteristics: ["Традиционное тесто", "23 см"],
        quantity: 1,
        price: 399,
    })
    .map((item, index) => ({ ...item, id: index }));

const maxCount = 17;

const historiesTemp = Array(maxCount).fill({
    id: 130312,
    products: products,
    date: "22.06.2021",
    total: 399,
    status: "Обрабатывается",
    payment: "Картой",
    address: "ул. Львовская 48/2, офис 301, 2 этаж, домофон 4801#",
});

export function* fetchHistories({
    payload,
}: {
    type: string;
    payload: number;
}) {
    const { histories }: AppStateType = yield select();

    if (!histories.histories || (histories.histories && !histories.histories[payload])) {
        const pageSize = histories.pageSize;
        const currentPage = historiesTemp.slice(
            (payload - 1) * pageSize,
            payload * pageSize
        );
        yield put(
            HistoriesAsyncActions.setHistories({
                ...histories.histories,
                [payload]: currentPage,
            })
        );
    }
}

export function* HistoriesWatcher() {
    yield takeEvery(Types.FETCH_HISTORIES, fetchHistories);
}
