import * as React from "react";
import { Field, Form } from "react-final-form";
import { Button } from "../../../../../../components";
import { InputField } from "../../../../../../components/fields";
import ChangeBtn from "../ChangeBtn";

import styles from "./styles.module.scss";

type Props = {};

const ProfileForm: React.FC<Props> = () => {
    const [isEdit, setIsEdit] = React.useState(false);

    const toggleIsEdit = React.useCallback(() => {
        setIsEdit((prev) => !prev);
    }, []);

    return (
        <Form
            onSubmit={toggleIsEdit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                    {!isEdit && (
                        <div className={styles["form__change-btn"]}>
                            <ChangeBtn onClick={toggleIsEdit} />
                        </div>
                    )}
                    <div
                        className={`${styles["form-wrapper"]} ${
                            !isEdit ? styles.readonly : ""
                        }`}
                    >
                        <div
                            className={`${styles["field-container"]} ${
                                !isEdit ? styles.readonly : ""
                            }`}
                        >
                            <Field
                                name="name"
                                render={(fieldProps) => (
                                    <InputField
                                        label="Имя"
                                        value="Вадим"
                                        required
                                        fieldProps={fieldProps}
                                        readOnly={!isEdit}
                                    />
                                )}
                            />
                        </div>
                        <div
                            className={`${styles["field-container"]} ${
                                !isEdit ? styles.readonly : ""
                            }`}
                        >
                            <Field
                                name="phone"
                                type="tel"
                                render={(fieldProps) => (
                                    <InputField
                                        label="Телефон"
                                        value="+7 (926) 223-10-11"
                                        required
                                        fieldProps={fieldProps}
                                        readOnly={!isEdit}
                                    />
                                )}
                            />
                        </div>
                        <div
                            className={`${styles["field-container"]} ${
                                !isEdit ? styles.readonly : ""
                            }`}
                        >
                            <Field
                                name="email"
                                render={(fieldProps) => (
                                    <InputField
                                        type="email"
                                        value="mail@gmail.com"
                                        label="Почта"
                                        fieldProps={fieldProps}
                                        readOnly={!isEdit}
                                    />
                                )}
                            />
                        </div>
                        <div
                            className={`${styles["field-container"]} ${
                                !isEdit ? styles.readonly : ""
                            }`}
                        >
                            <Field
                                name="date"
                                render={(fieldProps) => (
                                    <InputField
                                        readOnly={!isEdit}
                                        value="21.01.0252"
                                        label="Дата рождения"
                                        fieldProps={fieldProps}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    {isEdit && (
                        <Button className={styles["form-btn"]}>
                            Сохранить изменения
                        </Button>
                    )}
                </form>
            )}
        />
    );
};

export default ProfileForm;
