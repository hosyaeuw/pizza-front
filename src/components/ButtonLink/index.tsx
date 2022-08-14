import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

type Props = {
    to: string;
    onClick?: () => void;
};

const ButtonLink: React.FC<Props> = ({ to, children, onClick }) => {
    return (
        <Link onClick={onClick} className={styles["button-link"]} to={to}>
            {children}
        </Link>
    );
};

export default ButtonLink;
