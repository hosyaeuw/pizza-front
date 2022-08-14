import * as React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelectors";
import { CartActions } from "../../../redux/actions/cart";
import { TIngredient, TProduct } from "../../../redux/types/catalog";
import useCatalog from "../../Home/hooks/useCatalog";

const useCart = () => {
    const { items } = useCatalog();

    const [
        haveNewItem,
        resultSum,
        cart,
        additionalCategories,
    ] = useTypedSelector(({ cart }) => [
        cart.haveNewItem,
        cart.resultSum,
        cart.cart,
        cart.additionalCategories,
    ]);

    const dispatch = useDispatch();

    const addToCart = React.useCallback(
        (
            product: TProduct,
            price: number,
            additionalIngredients?: TIngredient[],
            deleteIngredients?: TIngredient[]
        ) => {
            dispatch(
                CartActions.addToCart(
                    product,
                    price,
                    additionalIngredients,
                    deleteIngredients
                )
            );
        },
        [dispatch]
    );

    const onDeleteFromCart = React.useCallback(
        (id: number) => {
            if (window.confirm("Вы действительно хотите удалить этот товар?")) {
                dispatch(CartActions.deleteFromCart(id));
            }
        },
        [dispatch]
    );

    const changeQuantityItem = React.useCallback(
        (quantity: number, id: number) => {
            dispatch(CartActions.changeQuantity(quantity, id));
        },
        [dispatch]
    );

    const cartItems = React.useMemo(() => {
        if (cart) {
            return Object.values(cart);
        }
        return [];
    }, [cart]);

    const additionalProducts = React.useMemo(() => {
        const cartIds = cartItems.map((item) => item.product.id);
        const ids = cartItems
            .map((item) => item.product.additional_product)
            .flat();
        const products = items
            .map((item) =>
                item.product_models.map(
                    (product_model) => product_model.products
                )
            )
            .flat()
            .flat();
        return products.filter(
            (product) =>
                ids.includes(product.id) && !cartIds.includes(product.id)
        );
    }, [cartItems, items]);

    const cartAdditionalCategories = React.useMemo(() => {
        const cartIds = cartItems.map((item) => item.product.id);

        return items
            .filter((item) => additionalCategories.includes(item.category.id))
            .map((item) => ({
                ...item,
                product_models: item.product_models.filter(
                    (product_model) =>
                        !cartIds.includes(product_model.products[0].id)
                ),
            }));
    }, [additionalCategories, items, cartItems]);

    return {
        addToCart,
        haveNewItem,
        resultSum,
        cart,
        cartItems,
        changeQuantityItem,
        onDeleteFromCart,
        additionalProducts,
        cartAdditionalCategories,
    };
};

export default useCart;
