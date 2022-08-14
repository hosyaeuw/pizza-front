import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import classNames from "classnames";

import {
    TIngredient,
    TProductModel,
} from "../../../../../../redux/types/catalog";
import { Button, SVG } from "../../../../../../components";
import useIngredient from "./hooks/useIngredient";
import RadioSelect from "../../../../../../components/fields/RadioSelect";
import cheese_ico from "../../../../../../assets/cheeze.svg";
import useCart from "../../../../../Cart/hooks/useCart";

import styles from "./styles.module.scss";

// TODO: сделать формой?

type Props = {
    onCloseClick: () => void;
    productModel: TProductModel;
};

const Ingredient: React.FC<{
    ingredient: TIngredient;
    active?: boolean;
    disable?: boolean;
    showPrice?: boolean;
    onClick?: () => void;
}> = ({ ingredient, active, disable, onClick, showPrice = true }) => {
    return (
        <div
            className={classNames(styles.ingredient, {
                [styles.active]: active,
                [styles.disable]: disable,
            })}
            onClick={onClick}
        >
            <div className={styles["ingredient__img-container"]}>
                <SVG className={styles.ingredient__img} source={cheese_ico} />
            </div>
            <div className={styles.ingredient__text}>
                <span className={styles.ingredient__name}>
                    {ingredient.name}
                </span>
                {showPrice && (
                    <span className={styles.ingredient__price}>
                        <b>{ingredient.price} Р</b>
                    </span>
                )}
            </div>
        </div>
    );
};

const HaveIngredients: React.FC<{
    onChange: (ingredients: TIngredient[]) => void;
    ingredients: TIngredient[];
}> = ({ ingredients, onChange }) => {
    const {
        onClickHandler,
        checkedIngredient,
        checkedIngredientIds,
    } = useIngredient();

    React.useEffect(() => {
        onChange(checkedIngredient);
    }, [checkedIngredient, onChange]);
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={20}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            style={{ width: "100%", paddingBottom: 30 }}
        >
            {ingredients.map((ingredient) => (
                <SwiperSlide key={ingredient.id}>
                    <Ingredient
                        showPrice={false}
                        onClick={() => onClickHandler(ingredient)}
                        ingredient={ingredient}
                        disable={checkedIngredientIds.includes(ingredient.id)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const AddIngredients: React.FC<{
    onChange: (ingredients: TIngredient[]) => void;
    ingredients: TIngredient[];
}> = ({ ingredients, onChange }) => {
    const {
        onClickHandler,
        checkedIngredient,
        checkedIngredientIds,
    } = useIngredient();

    React.useEffect(() => {
        onChange(checkedIngredient);
    }, [checkedIngredient, onChange]);
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={20}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            style={{ width: "100%", paddingBottom: 30 }}
        >
            {ingredients.map((ingredient) => (
                <SwiperSlide key={ingredient.id}>
                    <Ingredient
                        onClick={() => onClickHandler(ingredient)}
                        ingredient={{ ...ingredient, price: 59 }}
                        active={checkedIngredientIds.includes(ingredient.id)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
// TODO: пересмотреть выбор предмета
const CatalogItemModal: React.FC<Props> = ({ productModel }) => {
    const { addToCart } = useCart();
    const [selectedItem, setSelectedItem] = React.useState(
        productModel.products[0]
    );
    const [addIngredients, setAddIngredients] = React.useState<TIngredient[]>(
        []
    );
    const [deleteIngredients, setDeleteIngredients] = React.useState<
        TIngredient[]
    >([]);

    const onChangeAddHandler = React.useCallback(
        (ingredients: TIngredient[]) => {
            setAddIngredients(ingredients);
        },
        []
    );

    const onChangeDeleteHandler = React.useCallback(
        (ingredients: TIngredient[]) => {
            setDeleteIngredients(ingredients);
        },
        []
    );

    const onChangeCharacteristicsHandler = React.useCallback(
        (selectId: number) => {
            const characteristics = selectedItem.characteristics;
            const allCharacteristics = productModel.products
                .map((product) => product.characteristics)
                .flat();
            const needCharacteristic = allCharacteristics.find(
                (item) => item.id === selectId
            );
            if (needCharacteristic) {
                const remainderCharacteristics = characteristics.filter(
                    (item) => item.type.id !== needCharacteristic.type.id
                );
                const ids = [
                    ...remainderCharacteristics.map((item) => item.id),
                    needCharacteristic.id,
                ];
                const resultProduct = productModel.products.find((product) =>
                    product.characteristics.every((characteristic) =>
                        ids.includes(characteristic.id)
                    )
                );
                if (resultProduct) {
                    setSelectedItem(resultProduct);
                }
            }
        },
        [selectedItem, productModel.products]
    );

    const resultPrice = React.useMemo(() => {
        return (
            selectedItem.price +
            addIngredients.reduce((acc, curr) => acc + curr.price, 0)
        );
    }, [selectedItem, addIngredients]);

    const onResultClickHandler = React.useCallback(() => {
        addToCart(selectedItem, resultPrice, deleteIngredients, addIngredients);
    }, [
        selectedItem,
        addToCart,
        resultPrice,
        deleteIngredients,
        addIngredients,
    ]);

    return (
        <div className={styles["catalog-modal-item"]}>
            <div className={styles["catalog-modal-item__photo-container"]}>
                <img
                    className={styles["catalog-modal-item__photo"]}
                    src={productModel.photo}
                    alt={productModel.name}
                />
            </div>
            <div className={styles["catalog-modal-item__content"]}>
                <h2 className={styles["catalog-modal-item__title"]}>
                    {productModel.name}
                </h2>
                <HaveIngredients
                    onChange={onChangeDeleteHandler}
                    ingredients={productModel.ingredients}
                />
                {productModel.selects.map((select) => (
                    <RadioSelect.Group
                        key={select.name}
                        onChange={onChangeCharacteristicsHandler}
                    >
                        {select.items.map((item) => (
                            <RadioSelect.Button key={item.id} value={item.id}>
                                {item.name}
                            </RadioSelect.Button>
                        ))}
                    </RadioSelect.Group>
                ))}
                <AddIngredients
                    onChange={onChangeAddHandler}
                    ingredients={productModel.ingredients}
                />
                <div className={styles["catalog-modal-item__bottom"]}>
                    <div>
                        <span className={styles["catalog-modal-item__price"]}>
                            <b>Итого: {resultPrice} Р</b>
                        </span>
                        <span className={styles["catalog-modal-item__weight"]}>
                            {selectedItem.weight.count} г
                        </span>
                    </div>
                    <Button
                        onClick={onResultClickHandler}
                        className={styles["catalog-modal-item__btn"]}
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CatalogItemModal;
