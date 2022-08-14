import * as React from "react";
import { Field, Form } from "react-final-form";
import { ChangeBtn } from "../";
import { Button } from "../../../../../../components";
import { InputField } from "../../../../../../components/fields";

import styles from "./styles.module.scss";

const FormComponent: React.FC<{
    onSubmit: () => void;
    onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
    const onSubmitHandler = React.useCallback(() => {
        onSubmit();
    }, [onSubmit]);

    const changeForm = React.useCallback(
        (touched: Record<string, boolean> | undefined) => {
            if (touched) {
                return Object.values(touched).every((item) => item === false);
            }
            return true;
        },
        []
    );
    return (
        <Form
            onSubmit={onSubmitHandler}
            render={({ handleSubmit, touched }) => (
                <form>
                    <h2 className={styles.form__title}>Изменить пароль</h2>
                    <div className={styles["form-wrapper"]}>
                        <div className={styles["field-container"]}>
                            <Field
                                name="old_password"
                                render={(fieldProps) => (
                                    <InputField
                                        label="Старый пароль"
                                        required
                                        type="password"
                                        fieldProps={fieldProps}
                                    />
                                )}
                            />
                        </div>
                        <div className={styles["field-container"]}>
                            <Field
                                name="new_password"
                                render={(fieldProps) => (
                                    <InputField
                                        label="Новый пароль"
                                        required
                                        type="password"
                                        fieldProps={fieldProps}
                                    />
                                )}
                            />
                        </div>
                        <div className={styles["field-container"]}>
                            <Field
                                name="again_new_password"
                                render={(fieldProps) => (
                                    <InputField
                                        label="Подтвердите пароль"
                                        required
                                        type="password"
                                        fieldProps={fieldProps}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <Button
                        type="button"
                        onClick={changeForm(touched) ? handleSubmit : onCancel}
                    >
                        Сохранить изменения
                    </Button>
                </form>
            )}
        />
    );
};

type Props = {};

const PasswordForm: React.FC<Props> = () => {
    const [isChangePassword, setIsChangePassword] = React.useState(false);

    const toggleIsChangePassword = React.useCallback(() => {
        setIsChangePassword((prev) => !prev);
    }, []);
    return (
        <div className={styles.form}>
            {isChangePassword ? (
                <FormComponent
                    onCancel={toggleIsChangePassword}
                    onSubmit={toggleIsChangePassword}
                />
            ) : (
                <div className={styles.form__password}>
                    <h2>Пароль</h2>
                    <ChangeBtn onClick={toggleIsChangePassword} />
                </div>
            )}
        </div>
    );
};

export default PasswordForm;
