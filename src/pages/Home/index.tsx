import * as React from "react";

import { CatalogGrid, CheckAddressForm, Promotions } from "./components";

import styles from "./styles.module.scss";

const Home = () => {
    return (
        <div>
            <div className={styles.promotions}>
                <Promotions />
            </div>
            <div className={`bg-white ${styles["check-address"]}`}>
                <CheckAddressForm />
            </div>
            <CatalogGrid />
        </div>
    );
};

export default Home;
