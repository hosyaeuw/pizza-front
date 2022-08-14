import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import InputCode from "../../InputCode";

type Props = {
    fieldProps: FieldRenderProps<any, HTMLElement, any>;
    count?: number;
};

const InputCodeField: React.FC<Props> = ({ fieldProps, ...other }) => {
    const onFinishHandler = React.useCallback(
        (value: string) => {
            fieldProps.input.onChange(value);
        },
        [fieldProps]
    );

    return <InputCode onFinish={onFinishHandler} {...other} />;
};

export default InputCodeField;
