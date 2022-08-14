import { Field, Form } from "react-final-form";

import { Button } from "../../../../components";
import InputField from "../../../../components/fields/InputField";

import styles from "./styles.module.scss";

const index = () => {
    return (
        <div>
            <Form
                onSubmit={(data) => console.log(data)}
                render={({ handleSubmit }) => (
                    <form
                        onSubmit={handleSubmit}
                        className={styles["check-address"]}
                    >
                        <span className={styles["check-address__text"]}>
                            Проверить адрес доставки
                        </span>
                        <div
                            className={styles["check-address__input-container"]}
                        >
                            <Field
                                name="address"
                                render={(fieldProps) => (
                                    <InputField
                                        fieldProps={fieldProps}
                                        placeholder="Адрес"
                                        className={
                                            styles["check-address__input"]
                                        }
                                    />
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className={styles["check-address__btn"]}
                        >
                            Проверить
                        </Button>
                    </form>
                )}
            />
        </div>
    );
};

export default index;
