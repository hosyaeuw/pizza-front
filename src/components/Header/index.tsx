import * as React from "react";
import SVG from "../SVG";

import styles from "./styles.module.scss";
import { Profile } from "./components";
import useCompany from "../../hooks/useCompany";
import { Images } from "../../assets/images";

const Header = () => {
    const { info } = useCompany();

    return (
        <div className={styles.header}>
            <div className={styles["header-left"]}>
                <div className={styles["city-selector"]}>
                    <SVG
                        source={Images.icons.location}
                        className={styles["city-selector-location-ico"]}
                    />
                    <span className={styles["city-selector-text"]}>Москва</span>
                    <SVG
                        source={Images.icons.arrowDown}
                        className={styles["city-selector-arrow-ico"]}
                    />
                </div>
                <div>
                    <span>Среднее время доставки*: </span>
                    <span>
                        <b>{info?.averageDeliveryTime || "00:00:00"}</b>
                    </span>
                </div>
            </div>
            <div className={styles["header-right"]}>
                <span>
                    Время работы: с {info?.timeStart || "00:00"} до{" "}
                    {info?.timeFinish || "00:00"}
                </span>
                <Profile />
            </div>
        </div>
    );
};

export default Header;
