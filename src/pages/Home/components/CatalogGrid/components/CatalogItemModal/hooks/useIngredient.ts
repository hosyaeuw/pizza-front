import * as React from "react";
import { TIngredient } from "../../../../../../../redux/types/catalog";

const useIngredient = () => {
    const [checkedIngredient, setCheckedIngredient] = React.useState<
        TIngredient[]
    >([]);

    const onClickHandler = React.useCallback(
        (ingredient: TIngredient) => {
            if (
                checkedIngredient.map((item) => item.id).includes(ingredient.id)
            ) {
                setCheckedIngredient((prev) => {
                    const idx = prev.findIndex(
                        (item) => item.id === ingredient.id
                    );

                    if (!!~idx) {
                        prev.splice(idx, 1);
                    }
                    return [...prev];
                });
            } else {
                setCheckedIngredient((prev) => [...prev, ingredient]);
            }
        },
        [checkedIngredient]
    );

    const checkedIngredientIds = React.useMemo(
        () => checkedIngredient.map((item) => item.id),
        [checkedIngredient]
    );
    return {
        onClickHandler,
        checkedIngredient,
        setCheckedIngredient,
        checkedIngredientIds,
    };
};

export default useIngredient;
