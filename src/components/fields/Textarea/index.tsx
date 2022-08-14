import * as React from "react";

import classNames from "classnames";

import styles from "./styles.module.scss";

type Props = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & {
    label?: string;
    error?: string[];
    className?: string;
};

const Textarea: React.FC<Props> = ({ label, error, className, ...other }) => {
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
            <textarea
                className={classNames(styles.input, className, {
                    [styles.error]: error,
                })}
                {...other}
            />
        </div>
    );
};

export default Textarea;
