import * as React from "react";
import { Images } from "../../../../../../assets/images";
import { Button, SVG } from "../../../../../../components";
import {
    THistory,
    THistoryProduct,
} from "../../../../../../redux/actions/histories";

import styles from "./styles.module.scss";

const HistoryItemContent: React.FC<{ products: THistoryProduct[] }> = ({
    products,
}) => {
    return (
        <div>
            <div className={styles["history-item__content"]}>
                {products.map((product) => (
                    <div
                        className={styles["history-item__content-item"]}
                        key={product.id}
                    >
                        <img
                            className={styles["history-item__content-img"]}
                            src={product.img}
                            alt="pizza"
                        />
                        <span className={styles["history-item__content-name"]}>
                            {product.name}
                        </span>
                        <span
                            className={
                                styles["history-item__content-characteristics"]
                            }
                        >
                            {product.characteristics.join(", ")}
                        </span>
                        <span
                            className={styles["history-item__content-quantity"]}
                        >
                            {product.quantity} товар
                        </span>
                        <span className={styles["history-item__content-price"]}>
                            {product.price} Р
                        </span>
                    </div>
                ))}
            </div>
            <div className={styles["history-item__repeat"]}>
                <Button.Text className={styles["history-item__repeat-btn"]}>
                    Повторить заказ
                </Button.Text>
            </div>
        </div>
    );
};

type Props = {
    history: THistory;
};

const HistoryItem: React.FC<Props> = ({ history }) => {
    const [showContent, setShowContent] = React.useState(false);

    const toggleShowContent = React.useCallback(() => {
        setShowContent((prev) => !prev);
    }, []);

    return (
        <div className={styles["history-item"]}>
            <div className={styles["history-item__header"]}>
                <div className={styles["history-item__header-field"]}>
                    <span className={styles["history-item__header-title"]}>
                        Заказ
                    </span>
                    <span className={styles["history-item__header-value"]}>
                        №{history.id}
                        <span className={styles["history-item__header-date"]}>
                            {history.date}
                        </span>
                    </span>
                </div>
                <div className={styles["history-item__header-field"]}>
                    <span className={styles["history-item__header-title"]}>
                        Сумма заказа
                    </span>
                    <span className={styles["history-item__header-value"]}>
                        {history.total} Р
                    </span>
                </div>
                <div className={styles["history-item__header-field"]}>
                    <span className={styles["history-item__header-title"]}>
                        Статус
                    </span>
                    <span className={styles["history-item__header-value"]}>
                        {history.status}
                    </span>
                </div>
                <div className={styles["history-item__header-field"]}>
                    <span className={styles["history-item__header-title"]}>
                        Оплачено
                    </span>
                    <span className={styles["history-item__header-value"]}>
                        {history.payment}
                    </span>
                </div>
                <div onClick={toggleShowContent}>
                    <SVG
                        className={styles["history-item__arrow"]}
                        source={Images.icons.arrowDown}
                        rotate={showContent ? 180 : 0}
                    />
                </div>
            </div>
            <div className={styles["history-item__bottom"]}>
                <div className={styles["history-item__address"]}>
                    {history.address}
                </div>
                <div className={styles["history-item__products"]}>
                    {history.products.map((product: any) => (
                        <img
                            className={styles["history-item__products-img"]}
                            key={product.id}
                            src={product.img}
                            alt="pizza"
                        />
                    ))}
                </div>
            </div>
            {showContent && <HistoryItemContent products={history.products} />}
        </div>
    );
};

export default HistoryItem;
