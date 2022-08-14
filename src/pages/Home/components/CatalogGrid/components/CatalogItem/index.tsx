import * as React from "react";
import { Button } from "../../../../../../components";
import Modal from "../../../../../../components/Modal";
import { TProductModel } from "../../../../../../redux/types/catalog";
import useCart from "../../../../../Cart/hooks/useCart";
import CatalogItemModal from "../CatalogItemModal";

import styles from "./styles.module.scss";

type Props = {
    productModel: TProductModel;
};

const CatalogItem: React.FC<Props> = ({ productModel }) => {
    const [showModal, setShowModal] = React.useState(false);
    const { addToCart } = useCart();

    const ingredients = React.useMemo(
        () =>
            productModel.ingredients
                .map((ingredient) => ingredient.name)
                .join(", "),
        [productModel.ingredients]
    );

    const price = React.useMemo(
        () =>
            Math.min(
                ...productModel.products.map((products) => products.price)
            ),
        [productModel.products]
    );

    const onCloseHandler = React.useCallback(() => {
        setShowModal(false);
    }, []);

    const onClickHandler = React.useCallback(() => {
        if (productModel.products.length > 1) {
            setShowModal(true);
        } else {
            const product = productModel.products[0];
            addToCart(product, product.price);
        }
    }, [productModel.products, addToCart]);

    return (
        <div className={styles["catalog-item"]}>
            <Modal show={showModal} onCloseClick={onCloseHandler}>
                <CatalogItemModal
                    productModel={productModel}
                    onCloseClick={onCloseHandler}
                />
            </Modal>
            <img src={productModel.photo} alt={productModel.name} />
            <div className={styles["catalog-item__content"]}>
                <h3 className={styles["catalog-item__title"]}>
                    {productModel.name}
                </h3>
                <p className={styles["catalog-item__ingredients"]}>
                    {ingredients}
                </p>
                <div className={styles["catalog-item__bottom"]}>
                    <Button
                        onClick={onClickHandler}
                        className={styles["catalog-item__btn"]}
                    >
                        Выбрать
                    </Button>
                    <span className={styles["catalog-item__price"]}>
                        от {price} &#8381;
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CatalogItem;
