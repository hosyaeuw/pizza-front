import * as React from "react";
import useCart from "../../../../pages/Cart/hooks/useCart";
import { TCartItem } from "../../../../redux/actions/cart";
import IncrementCounter from "../../../IncrementCounter";

import styles from "./styles.module.scss";

type Props = {
    item: TCartItem;
};

const CartItem: React.FC<Props> = ({ item }) => {
    const { changeQuantityItem, onDeleteFromCart } = useCart();

    const characteristics = React.useMemo(() => {
        return item.product.characteristics
            .map((characteristic) => characteristic.name)
            .join(", ");
    }, [item]);

    const onChangeQuantityHandler = React.useCallback(
        (value: number) => {
            changeQuantityItem(value, item.product.id);
        },
        [changeQuantityItem, item.product.id]
    );

    const onMinHandler = React.useCallback(() => {
        onDeleteFromCart(item.product.id);
    }, [item.product.id, onDeleteFromCart]);
    return (
        <div className={styles["cart-item"]}>
            <img
                className={styles["cart-item__img"]}
                src={item.product.photo}
                alt={item.product.name}
            />
            <div className={styles["cart-item__content"]}>
                <h3 className={styles["cart-item__title"]}>
                    {item.product.name}
                </h3>
                <p className={styles["cart-item__characteristics"]}>
                    {characteristics}
                </p>
                <div className={styles["cart-item__bottom"]}>
                    <IncrementCounter
                        value={item.quantity}
                        onChange={onChangeQuantityHandler}
                        onMinHandler={onMinHandler}
                    />
                    <span className={styles["cart-item__price"]}>
                        {item.product.price * item.quantity} &#8381;
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
