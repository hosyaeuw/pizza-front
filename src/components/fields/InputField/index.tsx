import * as React from "react";
import { FieldRenderProps } from "react-final-form";

import Input from "../Input";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    fieldProps: FieldRenderProps<any, HTMLElement, any>;
    label?: string;
};

const InputField: React.FC<Props> = ({ fieldProps, label, ...other }) => {
    const onChangeHandler = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            fieldProps.input.onChange(e.target.value);
        },
        [fieldProps.input]
    );
    return (
        <Input
            value={fieldProps.input.value}
            label={label}
            onChange={onChangeHandler}
            {...other}
            {...fieldProps}
        />
    );
};

export default InputField;
