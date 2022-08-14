import * as React from "react";
import classNames from "classnames";
import { Button, SVG } from "../../../../components";
import { HistoryItem } from "./components";
import useHistory from "./hooks/useHistory";
import { Images } from "../../../../assets/images";

import styles from "./styles.module.scss";

type Props = {};

const Pagination: React.FC<{
    current: number;
    maxCount: number;
    size: number;
    countButton?: number;
    isNeedLastPage?: boolean;
    onChange?: (page: number) => void;
}> = ({
    current,
    maxCount,
    size,
    countButton = 3,
    isNeedLastPage = true,
    onChange,
}) => {
    const lastPage = React.useMemo(
        () => Math.ceil(maxCount / (size === 0 ? 1 : size)),
        [maxCount, size]
    );

    const onClickHandler = React.useCallback(
        (page: number) => {
            onChange && onChange(page);
        },
        [onChange]
    );

    const getPages = React.useCallback(
        (index: number) => {
            if (current >= lastPage - countButton + 1) {
                return lastPage - countButton + index;
            }
            if (current <= 2) {
                return index + 1;
            }
            return current - 1 + index;
        },
        [countButton, current, lastPage]
    );

    return (
        <div className={styles.pagination}>
            <Button
                className={classNames(
                    styles.pagination__prev,
                    styles.pagination__btn
                )}
                disabled={current <= 1}
                onClick={() => onClickHandler(current <= 1 ? 1 : current - 1)}
            >
                <SVG source={Images.icons.arrowDown} rotate={90} />
            </Button>
            {Array(countButton)
                .fill(0)
                .map((_, index) => getPages(index))
                .map((page) => (
                    <Button
                        key={page}
                        className={classNames(
                            styles.pagination__btn,
                            styles["pagination__page-btn"],
                            {
                                [styles.current]: current === page,
                            }
                        )}
                        onClick={() => onClickHandler(page)}
                    >
                        {page}
                    </Button>
                ))}
            {isNeedLastPage && lastPage > countButton && (
                <Button
                    className={classNames(
                        styles.pagination__btn,
                        styles["pagination__page-btn"],
                        {
                            [styles.current]: current === lastPage,
                        }
                    )}
                    onClick={() => onClickHandler(lastPage)}
                >
                    {lastPage}
                </Button>
            )}
            <Button
                className={classNames(
                    styles.pagination__next,
                    styles.pagination__btn
                )}
                disabled={current >= lastPage}
                onClick={() =>
                    onClickHandler(current >= lastPage ? lastPage : current + 1)
                }
            >
                <SVG source={Images.icons.arrowDown} rotate={-90} />
            </Button>
        </div>
    );
};

const History: React.FC<Props> = () => {
    const { fetchHistories, histories, maxCount, pageSize } = useHistory();

    const [currentPage, setCurrentPage] = React.useState(1);

    const onChangePageHandler = React.useCallback(
        (page: number) => {
            fetchHistories(page).then(() => {
                setCurrentPage(page);
            });
        },
        [fetchHistories]
    );

    React.useEffect(() => {
        fetchHistories();
    }, [fetchHistories]);

    if (!histories) {
        return <div>Вы не сделали ещё ни одного заказа</div>;
    }

    return (
        <div className={styles.history}>
            <div className={styles.history__items}>
                {histories[currentPage].map((history, index) => (
                    <div className={styles.history__item} key={index}>
                        <HistoryItem history={history} />
                    </div>
                ))}
            </div>
            {maxCount > pageSize && (
                <div className={styles.history__pagination}>
                    <Pagination
                        onChange={onChangePageHandler}
                        size={pageSize}
                        maxCount={maxCount}
                        current={currentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default History;
