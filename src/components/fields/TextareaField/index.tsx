import * as React from "react";
import { FieldRenderProps } from "react-final-form";

import Textarea from "../Textarea";

type Props = React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> & {
    fieldProps: FieldRenderProps<any, HTMLElement, any>;
    label?: string;
};

const TextareaField: React.FC<Props> = ({ fieldProps, label, ...other }) => {
    const onChangeHandler = React.useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            fieldProps.input.onChange(e.target.value);
        },
        [fieldProps.input]
    );
    return (
        <Textarea
            label={label}
            onChange={onChangeHandler}
            {...other}
            {...fieldProps}
        />
    );
};

export default TextareaField;
