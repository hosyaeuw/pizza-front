import classNames from "classnames";
import * as React from "react";

import styles from "./style.module.scss";

const RadioButton: React.FC<{
    width?: string;
    checked?: boolean;
    onClick?: (value: any) => void;
    value: any;
}> = ({ width, checked, onClick, children, value }) => {
    const onClickHandler = React.useCallback(() => {
        onClick && onClick(value);
    }, [onClick, value]);

    return (
        <div
            className={classNames(styles["radio-button"], {
                [styles.checked]: checked,
            })}
            onClick={onClickHandler}
            style={{ width: width }}
        >
            {children}
        </div>
    );
};

const Radio: React.FC<{
    width?: string;
    checked?: boolean;
    onClick?: (value: any) => void;
    value: any;
}> = ({ width, checked, onClick, children, value }) => {
    const onClickHandler = React.useCallback(() => {
        onClick && onClick(value);
    }, [onClick, value]);

    return (
        <div
            className={classNames(styles["radio-item"], {
                [styles.checked]: checked,
            })}
            onClick={onClickHandler}
            style={{ width: width }}
        >
            {children}
        </div>
    );
};

const RadioGroup: React.FC<{
    onChange?: (value: any) => void;
    defaultValue?: any;
}> = ({ children, onChange, defaultValue }) => {
    const [checkedValue, setCheckedValue] = React.useState(
        defaultValue || (Array.isArray(children) && children[0].props.value)
    );

    const width = React.useMemo(() => {
        let count = 0;
        React.Children.map(children, (child: any) => {
            if (
                React.isValidElement(child) &&
                (child.type === RadioButton || child.type === Radio)
            ) {
                count += 1;
            }
        });
        if (count > 0) {
            return `${(100 / count).toFixed(2)}%`;
        }
        return `${100}%`;
    }, [children]);

    const onClickHandler = React.useCallback(
        (value: any) => {
            setCheckedValue(value);
            onChange && onChange(value);
        },
        [onChange]
    );

    const renderChildren = () => {
        return React.Children.map(children, (child: any, index: number) => {
            if (React.isValidElement(child)) {
                if (child.type === RadioButton) {
                    return (
                        <RadioSelect.Button
                            width={width}
                            // @ts-ignore
                            checked={child.props.value === checkedValue}
                            onClick={onClickHandler}
                            // @ts-ignore
                            value={child.props.value}
                            // @ts-ignore
                            {...child.props}
                        />
                    );
                } else {
                    return (
                        <RadioSelect.Radio
                            width={width}
                            // @ts-ignore
                            checked={child.props.value === checkedValue}
                            onClick={onClickHandler}
                            // @ts-ignore
                            value={child.props.value}
                            // @ts-ignore
                            {...child.props}
                        />
                    );
                }
            }
            return null;
        });
    };

    React.useEffect(() => {
        if (defaultValue) {
            setCheckedValue(defaultValue);
        }
    }, [defaultValue]);

    return (
        <div
            className={classNames(styles.radio, {
                [styles.buttons]:
                    Array.isArray(children) && children[0].type === RadioButton,
            })}
        >
            {renderChildren()}
        </div>
    );
};

const RadioSelect = () => {};

RadioSelect.Group = RadioGroup;
RadioSelect.Button = RadioButton;
RadioSelect.Radio = Radio;

export default RadioSelect;
