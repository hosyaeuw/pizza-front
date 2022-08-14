import { combineReducers } from "redux";

import catalog from "./catalog";
import cart from "./cart";
import histories from "./histories";
import user from "./user";
import company from "./company";
import promotions from "./promotions";

const rootReducer = combineReducers({
    catalog,
    cart,
    histories,
    user,
    promotions,
    company,
});

export default rootReducer;

export type AppStateType = ReturnType<typeof rootReducer>;
