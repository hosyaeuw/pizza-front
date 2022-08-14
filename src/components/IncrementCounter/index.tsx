import * as React from "react";

import styles from "./styles.module.scss";

type Props = {
    value: number;
    minQuantity?: number;
    maxQuantity?: number;
    onChange?: (value: number) => void;
    onMinHandler?: () => void;
    onMaxHandler?: () => void;
};

const IncrementCounter: React.FC<Props> = ({
    value,
    onChange,
    minQuantity = 0,
    maxQuantity,
    onMinHandler,
    onMaxHandler,
}) => {
    const onChangeHandler = React.useCallback(
        (value: number) => {
            onChange && onChange(value);
        },
        [onChange]
    );

    const onDecrementHandler = React.useCallback(() => {
        const newValue = value - 1;
        if (newValue <= minQuantity) {
            onMinHandler && onMinHandler();
        } else {
            onChangeHandler(newValue);
        }
    }, [onMinHandler, value, onChangeHandler, minQuantity]);

    const onIncrementHandler = React.useCallback(() => {
        const newValue = value + 1;
        if (maxQuantity && newValue >= maxQuantity) {
            onMaxHandler && onMaxHandler();
        } else {
            onChangeHandler(newValue);
        }
    }, [onMaxHandler, value, onChangeHandler, maxQuantity]);

    const onChangeInputValue = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = +e.target.value;
            if ((maxQuantity && value < maxQuantity) || value > minQuantity) {
                onChangeHandler(value);
            }
        },
        [onChangeHandler, minQuantity, maxQuantity]
    );
    return (
        <div className={styles["increment-counter"]}>
            <button
                onClick={onDecrementHandler}
                className={styles["increment-counter__btn"]}
            >
                -
            </button>
            <div className={styles["increment-counter__input-container"]}>
                <input
                    type="number"
                    className={styles["increment-counter__input"]}
                    value={value}
                    onChange={onChangeInputValue}
                />
            </div>
            <button
                onClick={onIncrementHandler}
                className={styles["increment-counter__btn"]}
            >
                +
            </button>
        </div>
    );
};

export default IncrementCounter;
