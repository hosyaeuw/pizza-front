import { put, takeEvery } from "redux-saga/effects";
import { Types, TUser, UserAsyncActions } from "../actions/user";

const user = {
    username: "hosyaeuw",
    bonuses: 100,
    name: "Иван",
    phone: "+79999999999",
    email: "example@mail.ru",
    address: {
        street: "Москва, Проспект маршала Жукова 1а",
    },
};

export function* fetchUser({ payload }: { type: string; payload: TUser }) {
    yield put(UserAsyncActions.setUser(user));
}

export function* userWatcher() {
    yield takeEvery(Types.FETCH_USER, fetchUser);
}
