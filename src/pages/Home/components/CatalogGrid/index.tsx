import * as React from "react";
import { TProductModel } from "../../../../redux/types/catalog";
import NetworkStatus from "../../../../utils/enums/NetworkStatus";

import useCatalog from "../../hooks/useCatalog";
import { CatalogItem } from "./components";

import styles from "./styles.module.scss";

type Props = {
    productModel: TProductModel;
};

const CatalogItemHoc: React.FC<Props> = ({ productModel }) => {
    if (productModel.products.length === 0) {
        return null;
    }

    return (
        <div className={styles["catalog-grid__item"]}>
            <CatalogItem productModel={productModel} />
        </div>
    );
};

const CatalogGrid = () => {
    const { items, networkStatus } = useCatalog();

    if (networkStatus === NetworkStatus.loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            {items.map((item) => (
                <React.Fragment key={item.category.id}>
                    <div className={styles["catalog-grid__category"]}>
                        <h2
                            id={item.category.name}
                            className={styles["catalog-grid__title"]}
                        >
                            {item.category.name}
                        </h2>
                        <div>фильтры</div>
                    </div>
                    <div
                        className={styles["catalog-grid__items"]}
                        key={item.category.id}
                    >
                        {item.product_models.map((productModel) => (
                            <CatalogItemHoc
                                productModel={productModel}
                                key={productModel.id}
                            />
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default CatalogGrid;
