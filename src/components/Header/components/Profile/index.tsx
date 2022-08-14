import * as React from "react";

import { Link } from "react-router-dom";
import { Field, Form } from "react-final-form";

import SVG from "../../../SVG";
import Button from "../../../Button";
import Modal from "../../../Modal";
import useProfile, {
    AuthFormValues,
} from "../../../../pages/Profile/hooks/useProfile";
import { InputCodeField, InputField } from "../../../fields";
import { Images } from "../../../../assets/images";

import styles from "./styles.module.scss";

const ProfileMenu: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const { user } = useProfile();
    const menuRef = React.useRef(null);

    const handleOutsideClick = React.useCallback(
        (event) => {
            const path =
                event.path || (event.composedPath && event.composedPath());
            if (!path.includes(menuRef.current)) {
                onClose && onClose();
            }
        },
        [onClose]
    );

    React.useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);

        return () =>
            document.body.removeEventListener("click", handleOutsideClick);
    }, [handleOutsideClick]);

    return (
        <ul className={styles["profile-menu"]} ref={menuRef}>
            <li onClick={onClose} className={styles["profile-menu__item"]}>
                {user?.bonuses ?? 0} бонусов
            </li>
            <li onClick={onClose} className={styles["profile-menu__item"]}>
                <Link to="profile/history">История заказов</Link>
            </li>
            <li onClick={onClose} className={styles["profile-menu__item"]}>
                <Link to="profile/settings">Настройки</Link>
            </li>
            <li onClick={onClose} className={styles["profile-menu__item"]}>
                Выйти из аккаунта
            </li>
        </ul>
    );
};

enum AuthSteps {
    phone,
    code,
}

const AuthForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const { fetchUser } = useProfile();
    const [step, setStep] = React.useState(AuthSteps.phone);

    const stepsObj = {
        [AuthSteps.phone]: {
            component: (
                <Field
                    name="phone"
                    render={(fieldProps) => (
                        <InputField
                            placeholder="+7"
                            fieldProps={fieldProps}
                            label="Номер телефона"
                        />
                    )}
                />
            ),
            beforeInputText:
                "Сможете быстро оформлять заказы, использовать бонусы",
            afterInputText:
                "Продолжая, вы соглашаетесь со сбором и обработкой персональных данных и пользовательским соглашением",
        },
        [AuthSteps.code]: {
            component: (
                <Field
                    name="code"
                    render={(fieldProps) => (
                        <InputCodeField fieldProps={fieldProps} />
                    )}
                />
            ),
            beforeInputText: "На ваш номер",
            afterInputText: "Отправить код ещё раз через:",
        },
    };

    const onSubmitHandler = React.useCallback(
        (values: AuthFormValues) => {
            switch (step) {
                case AuthSteps.phone:
                    setStep(AuthSteps.code);
                    break;
                case AuthSteps.code:
                    fetchUser(values);
                    onClose && onClose();
                    break;
                default:
                    break;
            }
        },
        [step, fetchUser, onClose]
    );

    return (
        <div className={styles["auth-container"]}>
            <div className={styles.auth}>
                <h2 className={styles.auth__title}>Вход в аккаунт</h2>
                <p className={styles["auth__before-input-text"]}>
                    {stepsObj[step].beforeInputText}
                </p>
                <Form
                    onSubmit={onSubmitHandler}
                    render={({ handleSubmit }) => (
                        <form
                            className={styles.auth__form}
                            onSubmit={handleSubmit}
                        >
                            {stepsObj[step].component}
                            <Button className={styles.auth__btn}>Войти</Button>
                        </form>
                    )}
                />
                <p className={styles["auth__after-input-text"]}>
                    {stepsObj[step].afterInputText}
                </p>
            </div>
        </div>
    );
};

const AuthModal: React.FC<{ show: boolean; onClose: () => void }> = ({
    show,
    onClose,
}) => {
    return (
        <Modal show={show} onCloseClick={onClose}>
            <AuthForm onClose={onClose} />
        </Modal>
    );
};

const Profile = () => {
    const { isAuth, user } = useProfile();
    const [showMenu, setShowMenu] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);

    const toggleShowMenu = React.useCallback(() => {
        setShowMenu((prev) => !prev);
    }, []);

    const toggleShowModal = React.useCallback(() => {
        setShowModal((prev) => !prev);
    }, []);

    return (
        <div className={styles["account-container"]}>
            <AuthModal show={showModal} onClose={toggleShowModal} />
            <Button.Text
                onClick={isAuth ? toggleShowMenu : toggleShowModal}
                className={styles.account}
            >
                <SVG
                    className={styles["account-ico"]}
                    source={Images.icons.account}
                />
                <span>
                    {isAuth && user ? user.username : "Войти в аккаунт"}
                </span>
            </Button.Text>
            {showMenu && <ProfileMenu onClose={toggleShowMenu} />}
        </div>
    );
};

export default Profile;
