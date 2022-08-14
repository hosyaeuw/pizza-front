import * as React from "react";
import { Images } from "../../assets/images";

import Logo from "../Logo";
import SVG from "../SVG";

import styles from "./styles.module.scss";

const List: React.FC<{ title?: string; items: string[] }> = ({
    title,
    items,
}) => {
    return (
        <ul className={styles.list}>
            {!!title && <h2 className={styles.list__title}>{title}</h2>}
            {items.map((item) => (
                <li key={`${title}_${item}`} className={styles.list__item}>
                    {item}
                </li>
            ))}
        </ul>
    );
};

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__logo}>
                <Logo />
                <p>© Copyright 2021 — Куда Пицца</p>
            </div>
            <List
                title="Куда пицца"
                items={[
                    "О кампании",
                    "Пользовательское соглашение",
                    "Условия гарантии",
                ]}
            />
            <List
                title="Помощь"
                items={["Ресторан", "Контакты", "Поддержка", "Отследить заказ"]}
            />
            <ul className={`${styles.list} ${styles["list_contacts"]}`}>
                <h2 className={styles.list__title}>Контакты</h2>
                <li className={styles.list__item}>
                    <SVG
                        className={styles["list__item-ico"]}
                        source={Images.icons.phone}
                    />
                    +7 (926) 223-10-11
                </li>
                <li className={styles.list__item}>
                    <SVG
                        className={styles["list__item-ico"]}
                        source={Images.icons.location}
                    />
                    Москва, ул. Юных Ленинцев, д.99
                </li>
                <li className={styles.list__item}>
                    <span className={styles["list__item_text"]}>
                        <SVG
                            className={styles["list__item-ico"]}
                            source={Images.icons.socialNetwork.facebook}
                        />
                        Facebook
                    </span>
                    <span className={styles["list__item_text"]}>
                        <SVG
                            className={styles["list__item-ico"]}
                            source={Images.icons.socialNetwork.instagram}
                        />
                        Instagram
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default Footer;
