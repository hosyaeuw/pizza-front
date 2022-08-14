import * as React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import usePromotions from "../../../../hooks/usePromotions";

import styles from "./styles.module.scss";

const Promotions = () => {
    const { promotions } = usePromotions();

    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className={styles["promotion-container"]}
        >
            {promotions.map((_, index) => (
                <SwiperSlide key={index}>
                    <div className={styles.promotion}></div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Promotions;
