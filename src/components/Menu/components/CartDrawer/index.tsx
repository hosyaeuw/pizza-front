import * as React from "react";
import useCart from "../../../../pages/Cart/hooks/useCart";
import ButtonLink from "../../../ButtonLink";
import Drawer from "../../../Drawer";
import Cartitem from "../CartItem";

import styles from "./styles.module.scss";

type Props = {
    onCloseClick: () => void;
    show: boolean;
};

const CartDrawer: React.FC<Props> = ({ onCloseClick, show }) => {
    const { cartItems, resultSum } = useCart();

    return (
        <Drawer onCloseClick={onCloseClick} show={show}>
            {cartItems.length === 0 ? (
                <div className={styles["cart-drawer-empty"]}>
                    <span>Вы не добавили товары</span>
                </div>
            ) : (
                <>
                    <div className={styles["cart-drawer"]}>
                        <h2 className={styles["cart-drawer__title"]}>
                            Ваш заказ
                        </h2>
                        <div className={styles["cart-drawer__items"]}>
                            {cartItems.map((item) => (
                                <div
                                    key={item.product.id}
                                    className={styles["cart-drawer__item"]}
                                >
                                    <Cartitem item={item} />
                                </div>
                            ))}
                        </div>
                        <div className={styles["cart-drawer__total"]}>
                            <span
                                className={styles["cart-drawer__total-price"]}
                            >
                                Итого: {resultSum} &#8381;
                            </span>
                            <ButtonLink to="/cart" onClick={onCloseClick}>
                                Оформить
                            </ButtonLink>
                        </div>
                    </div>
                </>
            )}
        </Drawer>
    );
};

export default CartDrawer;
