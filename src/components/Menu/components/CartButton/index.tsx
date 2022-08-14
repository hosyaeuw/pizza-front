import * as React from "react";
import { Images } from "../../../../assets/images";
import useCart from "../../../../pages/Cart/hooks/useCart";
import Button from "../../../Button";
import SVG from "../../../SVG";
import CartDrawer from "../CartDrawer";

import styles from "./styles.module.scss";

type Props = {};

const CartButton: React.FC<Props> = () => {
    const { haveNewItem, resultSum } = useCart();
    const [showDrawer, setShowDrawer] = React.useState(false);

    const toggleShowDrawer = React.useCallback(() => {
        setShowDrawer((prev) => !prev);
    }, []);
    return (
        <div className={styles["cart-btn-container"]}>
            <CartDrawer onCloseClick={toggleShowDrawer} show={showDrawer} />
            <Button className={styles["cart-btn"]} onClick={toggleShowDrawer}>
                <SVG
                    className={styles["cart-btn__ico"]}
                    source={Images.icons.cart}
                />
                <span className={styles["cart-btn__text"]}>
                    {resultSum} &#8381;
                </span>
            </Button>
            {haveNewItem && (
                <div className={styles["cart-btn__new-product"]}>
                    Товар добавлен
                </div>
            )}
        </div>
    );
};

export default CartButton;
