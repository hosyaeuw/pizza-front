import * as React from "react";

import classNames from "classnames";

import styles from "./styles.module.scss";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label?: string;
    error?: string[];
    className?: string;
    getRef?: (component: HTMLInputElement) => void;
};

const Input: React.FC<Props> = ({
    label,
    error,
    className,
    getRef,
    ...other
}) => {
    return (
        <div>
            {!!label && (
                <label
                    className={classNames(styles.input__label, {
                        [styles.required]: other.required,
                    })}
                    htmlFor={other.id}
                >
                    {label}
                </label>
            )}
            <input
                ref={(c) => {
                    if (c && getRef) {
                        getRef(c);
                    }
                }}
                className={classNames(styles.input, className, {
                    [styles.error]: error,
                })}
                type="text"
                {...other}
            />
        </div>
    );
};

export default Input;
