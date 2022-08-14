import * as React from "react";

import classNames from "classnames";

import styles from "./styles.module.scss";

type ButtonTextProps = React.FC<
    React.PropsWithChildren<
        React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        > & {}
    >
> & {
    className?: string;
};

const ButtonText: ButtonTextProps = ({ children, className, ...other }) => {
    return (
        <button
            className={classNames(styles["button-text"], className)}
            {...other}
        >
            {children}
        </button>
    );
};

type Props = React.FC<
    React.PropsWithChildren<
        React.DetailedHTMLProps<
            React.ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        > & {}
    >
> & {
    Text: ButtonTextProps;
    className?: string;
};

const Button: Props = ({ children, className, ...other }) => {
    return (
        <button className={classNames(styles.button, className)} {...other}>
            {children}
        </button>
    );
};

Button.Text = ButtonText;

export default Button;
