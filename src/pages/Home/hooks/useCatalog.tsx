import * as React from "react";

import { useTypedSelector } from "../../../hooks/useTypedSelectors";

const useCatalog = () => {
    const [catalog, networkStatus] = useTypedSelector(({ catalog }) => [
        catalog.catalog,
        catalog.networkStatus,
    ]);

    const items = React.useMemo(
        () =>
            catalog.filter(
                (catalogItem) =>
                    catalogItem.product_models
                        .flat()
                        .reduce(
                            (acc, product_model) =>
                                acc + product_model.products.length,
                            0
                        ) > 0
            ),
        [catalog]
    );

    const categories = React.useMemo(() => items.map((item) => item.category), [
        items,
    ]);

    return {
        items,
        networkStatus,
        categories,
    };
};

export default useCatalog;
