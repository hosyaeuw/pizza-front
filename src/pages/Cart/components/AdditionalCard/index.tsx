import * as React from "react";
import { Button } from "../../../../components";
import { TProduct } from "../../../../redux/types/catalog";

import styles from "./styles.module.scss";

type Props = {
    product: TProduct;
    onClick: (product: TProduct) => void;
};

const AdditionalCard: React.FC<Props> = ({ product, onClick }) => {
    const onClickHandler = React.useCallback(() => {
        onClick(product);
    }, [onClick, product]);

    return (
        <div className={styles["additional-card"]}>
            <img
                className={styles["additional-card__photo"]}
                src={product.photo}
                alt={`photo_${product.name}`}
            />
            <div className={styles["additional-card__content"]}>
                <p className={styles["additional-card__title"]}>
                    {product.name}
                </p>
                <Button
                    onClick={onClickHandler}
                    className={styles["additional-card__btn"]}
                >
                    {product.price} &#8381;
                </Button>
            </div>
        </div>
    );
};

export default AdditionalCard;
