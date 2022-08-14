import * as React from "react";
import useCart from "../../hooks/useCart";
import AdditionalCard from "../AdditionalCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import styles from "./styles.module.scss";
import { SVG } from "../../../../components";
import { TProduct } from "../../../../redux/types/catalog";
import { Images } from "../../../../assets/images";

type Props = {
    additionalItems: TProduct[];
    title?: string;
};

const AdditionalList: React.FC<Props> = ({ title, additionalItems }) => {
    const { addToCart } = useCart();

    const onClickHandler = React.useCallback(
        (product: TProduct) => {
            addToCart(product, product.price);
        },
        [addToCart]
    );

    if (additionalItems.length === 0) {
        return null;
    }

    const a = [
        ...additionalItems,
        ...additionalItems,
        ...additionalItems,
        ...additionalItems,
        ...additionalItems,
        ...additionalItems,
    ];

    const productsIds = additionalItems
        .map((additionalItem) => additionalItem.id)
        .join("");

    return (
        <div className={styles["additional-list-container"]}>
            {title && (
                <h2 className={styles["additional-list__title"]}>{title}</h2>
            )}

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                navigation={{
                    nextEl: `.next_${productsIds}`,
                    prevEl: `.prev_${productsIds}`,
                }}
                modules={[Navigation]}
                className={styles["additional-list"]}
            >
                <div>
                    {a.map((item) => (
                        <SwiperSlide key={item.id}>
                            <AdditionalCard
                                onClick={onClickHandler}
                                product={item}
                            />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
            <div className={`${styles.next} next_${productsIds}`}>
                <SVG source={Images.icons.arrowDown} rotate={270} />
            </div>
            <div className={`${styles.prev} prev_${productsIds}`}>
                <SVG source={Images.icons.arrowDown} rotate={90} />
            </div>
        </div>
    );
};

export default AdditionalList;
