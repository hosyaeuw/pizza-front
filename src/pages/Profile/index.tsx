import * as React from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { RadioSelect } from "../../components/fields";
import { History, Settings } from "./components";

import styles from "./styles.module.scss";

const routes = [
    {
        btnText: "История заказов",
        path: "history",
        Element: History,
    },
    {
        btnText: "Настройки",
        path: "settings",
        Element: Settings,
    },
];

const Profile = () => {
    const navigate = useNavigate();
    const params = useParams();

    const changeTabHandler = React.useCallback(
        (value: string) => {
            navigate(value);
        },
        [navigate]
    );

    const defaultTab = React.useMemo(() => {
        const route = routes.find((route) => route.path === params["*"]);

        return (route && route.path) || routes[0].path;
    }, [params]);

    return (
        <div className={styles.profile}>
            <h1 className={styles.profile__title}>
                Мой аккаунт
                <div className={styles.profile__tabs}>
                    <RadioSelect.Group
                        onChange={changeTabHandler}
                        defaultValue={defaultTab}
                    >
                        {routes.map((route) => (
                            <RadioSelect.Button
                                value={route.path}
                                key={route.btnText}
                            >
                                {route.btnText}
                            </RadioSelect.Button>
                        ))}
                    </RadioSelect.Group>
                </div>
            </h1>
            <Routes>
                <Route index element={<History />}></Route>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.Element />}
                    ></Route>
                ))}
            </Routes>
        </div>
    );
};

export default Profile;
