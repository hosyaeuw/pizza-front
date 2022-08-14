import * as React from "react";
import ReactDOM from "react-dom";
import CloseButton from "../CloseButton";

import styles from "./styles.module.scss";

const el = document.getElementById("root");

type Props = {
    show: boolean;
    onCloseClick: () => void;
};

const DrawerContainer: React.FC<{ onCloseClick: () => void }> = ({
    children,
    onCloseClick,
}) => {
    const stopProp = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
        },
        []
    );

    return (
        <div className={styles["drawer-container"]} onClick={onCloseClick}>
            <div onClick={stopProp} className={styles.drawer}>
                <div className={styles["drawer__close-btn"]}>
                    <CloseButton
                        className={styles["drawer__close-btn__color"]}
                        onClick={onCloseClick}
                    />
                </div>
                {children}
            </div>
        </div>
    );
};

const Drawer: React.FC<Props> = ({ children, show, onCloseClick }) => {
    if (!el || !show) {
        return null;
    }
    return ReactDOM.createPortal(
        <DrawerContainer onCloseClick={onCloseClick}>
            {children}
        </DrawerContainer>,
        el
    );
};

export default Drawer;
