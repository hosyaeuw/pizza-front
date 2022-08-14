import * as React from "react";
import { Input } from "../fields";

import styles from "./styles.module.scss";

type Props = {
    count?: number;
    onFinish?: (value: string) => void;
};

const InputCode: React.FC<Props> = ({ count = 4, onFinish }) => {
    const inputRefs = React.useRef<HTMLInputElement[]>([]);

    const onChangeHandler = React.useCallback(
        (index: number) => {
            if (index !== count - 1) {
                inputRefs.current[index + 1].focus();
            } else {
                const value = inputRefs.current
                    .map((input) => input.value)
                    .join("");
                onFinish && onFinish(value);
            }
        },
        [onFinish, count]
    );

    React.useEffect(() => {
        return () => {
            inputRefs.current = [];
        };
    }, []);

    return (
        <div className={styles["input-code-container"]}>
            {Array(count)
                .fill(0)
                .map((_, index) => (
                    <Input
                        key={index}
                        getRef={(c) => {
                            inputRefs.current[index] = c;
                        }}
                        className={styles["input-code"]}
                        placeholder="X"
                        onChange={() => onChangeHandler(index)}
                    />
                ))}
        </div>
    );
};

export default InputCode;
