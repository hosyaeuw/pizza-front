import * as React from "react";
import ReactDOM from "react-dom";
import CloseButton from "../CloseButton";

import styles from "./styles.module.scss";

const el = document.getElementById("root");

type Props = {
    show: boolean;
    onCloseClick: () => void;
};

const ModalContainer: React.FC<{ onCloseClick: () => void }> = ({
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
        <div className={styles["modal-container"]} onClick={onCloseClick}>
            <div onClick={stopProp} className={styles.modal}>
                <div className={styles["modal__close-btn"]}>
                    <CloseButton onClick={onCloseClick} />
                </div>
                {children}
            </div>
        </div>
    );
};

const Modal: React.FC<Props> = ({ children, show, onCloseClick }) => {
    if (!el || !show) {
        return null;
    }
    return ReactDOM.createPortal(
        <ModalContainer onCloseClick={onCloseClick}>{children}</ModalContainer>,
        el
    );
};

export default Modal;
