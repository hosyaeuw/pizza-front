import * as React from "react";
import { Field, Form } from "react-final-form";
import { Button, IncrementCounter, SVG } from "../../components";
import InputField from "../../components/fields/InputField";
import { TProduct } from "../../redux/types/catalog";
import useCart from "./hooks/useCart";
import RadioSelect from "../../components/fields/RadioSelect";
import { RadioSelectField, TextareaField } from "../../components/fields";
import { AdditionalList } from "./components";
import useProfile from "../Profile/hooks/useProfile";
import { Images } from "../../assets/images";

import styles from "./styles.module.scss";

const CartProduct: React.FC<{ product: TProduct; quantity: number }> = ({
    product,
    quantity,
}) => {
    const { changeQuantityItem, onDeleteFromCart } = useCart();
    const characteristics = React.useMemo(
        () =>
            product.characteristics
                .map((characteristic) => characteristic.name)
                .join(", "),
        [product.characteristics]
    );

    const changeQuantityHandler = React.useCallback(
        (quantity: number) => {
            changeQuantityItem(quantity, product.id);
        },
        [changeQuantityItem, product.id]
    );

    const onMinHandler = React.useCallback(() => {
        onDeleteFromCart(product.id);
    }, [onDeleteFromCart, product.id]);
    return (
        <div className={styles["cart-product"]}>
            <img
                className={styles["cart-product__img"]}
                src={product.photo}
                alt={product.name}
            />
            <div className={styles["cart-product__info"]}>
                <h3 className={styles["cart-product__name"]}>{product.name}</h3>
                {characteristics.length > 0 && (
                    <p className={styles["cart-product__characteristics"]}>
                        {characteristics}
                    </p>
                )}
            </div>
            <div className={styles["cart-product__content"]}>
                <IncrementCounter
                    value={quantity}
                    onChange={changeQuantityHandler}
                    onMinHandler={onMinHandler}
                />
                <span className={styles["cart-product__price"]}>
                    {product.price * quantity} &#8381;
                </span>
            </div>
        </div>
    );
};

const CartProductList = () => {
    const { cartItems } = useCart();
    return (
        <div className={styles["cart-product-list"]}>
            {cartItems.map((item) => (
                <div
                    key={item.product.id}
                    className={styles["cart-product-list__item"]}
                >
                    <CartProduct
                        product={item.product}
                        quantity={item.quantity}
                    />
                </div>
            ))}
        </div>
    );
};

const Promocode = () => {
    return (
        <Form
            onSubmit={() => {
                console.log("123");
            }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.promocode}>
                    <Field
                        name="promocode"
                        render={(fieldProps) => (
                            <InputField
                                placeholder="Промокод"
                                fieldProps={fieldProps}
                            />
                        )}
                    />

                    <Button>
                        <SVG
                            className={styles.promocode__ico}
                            source={Images.icons.promocode}
                        />
                    </Button>
                </form>
            )}
        />
    );
};

const Total = () => {
    const { resultSum } = useCart();
    return (
        <div className={styles.total}>
            <Promocode />
            <span className={styles.total__price}>
                Итого: {resultSum} &#8381;
            </span>
        </div>
    );
};

const PersonalField = () => {
    return (
        <div>
            <h2 className={styles["cart-title"]}>О вас</h2>
            <div className={styles["personal-form"]}>
                <div className={styles["personal-form__field"]}>
                    <Field
                        name="name"
                        render={(fieldProps) => (
                            <InputField
                                placeholder="Иван"
                                label="Имя"
                                required
                                fieldProps={fieldProps}
                            />
                        )}
                    />
                </div>
                <div className={styles["personal-form__field"]}>
                    <Field
                        name="phone"
                        render={(fieldProps) => (
                            <InputField
                                placeholder="+7"
                                label="Номер телефона"
                                required
                                fieldProps={fieldProps}
                            />
                        )}
                    />
                </div>
                <div className={styles["personal-form__field"]}>
                    <Field
                        name="email"
                        render={(fieldProps) => (
                            <InputField
                                placeholder="example@gmail.com"
                                label="Почта"
                                fieldProps={fieldProps}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

const AddressField = () => {
    return (
        <>
            <div>
                <Field
                    name="address"
                    render={(fieldProps) => (
                        <InputField
                            label="Улица"
                            placeholder="Пушкин"
                            required
                            fieldProps={fieldProps}
                        />
                    )}
                />
            </div>
            <div className={styles["delivery-form__fields"]}>
                <div className={styles["delivery-form__field"]}>
                    <Field
                        name="house"
                        render={(fieldProps) => (
                            <InputField
                                label="Дом"
                                placeholder="1а"
                                fieldProps={fieldProps}
                            />
                        )}
                    />
                </div>
                <div className={styles["delivery-form__field"]}>
                    <Field
                        name="entrance"
                        render={(fieldProps) => (
                            <InputField
                                label="Подъезд"
                                placeholder="1"
                                fieldProps={fieldProps}
                            />
                        )}
                    />
                </div>
                <div className={styles["delivery-form__field"]}>
                    <Field
                        name="floor"
                        render={(fieldProps) => (
                            <InputField
                                label="Этаж"
                                placeholder="2"
                                fieldProps={fieldProps}
                            />
                        )}
                    />
                </div>
                <div className={styles["delivery-form__field"]}>
                    <Field
                        name="flat"
                        render={(fieldProps) => (
                            <InputField
                                label="Квартира"
                                placeholder="3"
                                fieldProps={fieldProps}
                            />
                        )}
                    />
                </div>
                <div className={styles["delivery-form__field"]}>
                    <Field
                        name="intercom"
                        render={(fieldProps) => (
                            <InputField
                                label="Домофон"
                                placeholder="0000"
                                fieldProps={fieldProps}
                            />
                        )}
                    />
                </div>
            </div>
        </>
    );
};

const OrderFooter = () => {
    const { resultSum } = useCart();

    return (
        <div className={styles["order-footer"]}>
            <span className={styles.total__price}>
                Итого: {resultSum} &#8381;
            </span>
            <Button type="submit" className={styles.total__btn}>
                Оформить заказ
            </Button>
        </div>
    );
};

const Delivery = () => {
    return (
        <>
            <AddressField />
        </>
    );
};

const Pickup = () => {
    return <div>Самовывоз</div>;
};

enum deliverySwitch {
    "pickup" = "Самовывоз",
    "delivery" = "Доставка",
}

const deliverySwitchOptions = [deliverySwitch.delivery, deliverySwitch.pickup];

const DeliveryField = () => {
    const [component, setComponent] = React.useState(deliverySwitchOptions[0]);

    const renderComponent = React.useCallback(() => {
        switch (component) {
            case deliverySwitch.delivery:
                return <Delivery />;
            case deliverySwitch.pickup:
                return <Pickup />;
            default:
                return <Delivery />;
        }
    }, [component]);

    const onChangeHandler = React.useCallback((value: deliverySwitch) => {
        setComponent(value);
    }, []);

    return (
        <div className={styles["delivery-form"]}>
            <div
                className={`${styles["delivery-form__top"]} ${styles["cart-title"]}`}
            >
                <h2>Доставка</h2>
                <div className={styles["delivery-form__switch"]}>
                    <RadioSelect.Group onChange={onChangeHandler}>
                        {deliverySwitchOptions.map((option) => (
                            <RadioSelect.Button key={option} value={option}>
                                {option}
                            </RadioSelect.Button>
                        ))}
                    </RadioSelect.Group>
                </div>
            </div>

            {renderComponent()}
        </div>
    );
};

const CommentField = () => {
    return (
        <>
            <h2 className={styles["cart-title"]}>Комментарий</h2>
            <Field
                name="comment"
                render={(fieldProps) => (
                    <TextareaField
                        className={styles.comment}
                        placeholder="Есть уточнения?"
                        fieldProps={fieldProps}
                    />
                )}
            />
        </>
    );
};

const CartForm = () => {
    const { user } = useProfile();

    return (
        <Form
            initialValues={{
                name: user?.name,
                phone: user?.phone,
                email: user?.email,
                address: user?.address.street,
                house: user?.address.house,
                entrance: user?.address.entrance,
                floor: user?.address.floor,
                flat: user?.address.flat,
                intercom: user?.address.intercom,
            }}
            onSubmit={(data: any) => {
                console.log(data);
            }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <PersonalField />
                    <DeliveryField />
                    <PaymentField />
                    <CommentField />
                    <OrderFooter />
                </form>
            )}
        />
    );
};

const oddMoneyOptions = ["Без сдачи", "Сдача с"];

const OddMoneyField = () => {
    return (
        <div className={styles["odd-money-container"]}>
            <div className={styles["odd-money-radios"]}>
                <Field
                    name="odd_money_select"
                    render={(fieldProps) => (
                        <RadioSelectField fieldProps={fieldProps}>
                            {oddMoneyOptions.map((oddMoneyOption) => (
                                <RadioSelect.Radio value={oddMoneyOption}>
                                    {oddMoneyOption}
                                </RadioSelect.Radio>
                            ))}
                        </RadioSelectField>
                    )}
                />
            </div>
            <div className={styles["odd-money-input"]}>
                <Field
                    name="odd_money_amount"
                    render={(fieldProps) => (
                        <InputField
                            placeholder="0"
                            type="number"
                            fieldProps={fieldProps}
                        />
                    )}
                />
            </div>
        </div>
    );
};

const paymentMethods = [
    "Наличные",
    "Картой",
    "Apple pay",
    "Google pay",
    "Онлайн",
];

const PaymentField = () => {
    return (
        <div>
            <h2 className={styles["cart-title"]}>Оплата</h2>
            <Field
                name="payment"
                render={(fieldProps) => (
                    <RadioSelectField fieldProps={fieldProps}>
                        {paymentMethods.map((paymentMethod) => (
                            <RadioSelect.Radio
                                value={paymentMethod}
                                key={paymentMethod}
                            >
                                {paymentMethod}
                            </RadioSelect.Radio>
                        ))}
                    </RadioSelectField>
                )}
            />
            <h2 className={styles["cart-title"]}>Сдача</h2>
            <OddMoneyField />
        </div>
    );
};

const AdditionalProducts = () => {
    const { additionalProducts } = useCart();

    return (
        <AdditionalList
            title="Добавить к заказу"
            additionalItems={additionalProducts}
        />
    );
};

const AdditionalCategories = () => {
    const { cartAdditionalCategories } = useCart();

    return (
        <>
            {cartAdditionalCategories.map((catalogItem) => (
                <div
                    style={{
                        marginTop: 16,
                    }}
                >
                    <AdditionalList
                        title={catalogItem.category.name}
                        additionalItems={catalogItem.product_models.map(
                            (product_model) => product_model.products[0]
                        )}
                    />
                </div>
            ))}
        </>
    );
};

const Cart = () => {
    return (
        <div className={styles.cart}>
            <h1 className={styles["cart__general-title"]}>Ваш заказ</h1>
            <div className={styles.cart__products}>
                <CartProductList />
            </div>
            <div className={styles.cart__total}>
                <Total />
            </div>
            <div
                style={{
                    marginTop: 28,
                }}
            >
                <AdditionalProducts />
            </div>
            <div
                style={{
                    marginTop: 28,
                }}
            >
                <AdditionalCategories />
            </div>
            <div>
                <CartForm />
            </div>
        </div>
    );
};

export default Cart;
