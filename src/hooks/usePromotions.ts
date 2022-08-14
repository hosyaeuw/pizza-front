import { useTypedSelector } from "./useTypedSelectors";

const usePromotions = () => {
    const [promotions] = useTypedSelector(({ promotions }) => [
        promotions.promotions,
    ]);

    return {
        promotions,
    };
};

export default usePromotions;
