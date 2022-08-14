import classNames from "classnames";
import * as React from "react";

import styles from "./styles.module.scss";

type Props = {
    onClick: () => void;
    className?: string;
};

const CloseButton: React.FC<Props> = ({ onClick, className }) => (
    <button
        className={classNames(styles["close-btn"], className)}
        onClick={onClick}
    >
        &times;
    </button>
);

export default CloseButton;
