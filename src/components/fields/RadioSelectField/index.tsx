import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import RadioSelect from "../RadioSelect";

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    fieldProps: FieldRenderProps<any, HTMLElement, any>;
    // component?:
    label?: string;
};

const RadioSelectField: React.FC<Props> = ({ children, label, fieldProps }) => {
    const onChange = React.useCallback(
        (value: any) => {
            fieldProps.input.onChange(value);
        },
        [fieldProps]
    );

    React.useEffect(() => {
        onChange(0);
    }, [onChange]);

    return (
        <>
            {!!label && <span>{label}</span>}
            <RadioSelect.Group onChange={onChange}>
                {children}
            </RadioSelect.Group>
        </>
    );
};

export default RadioSelectField;
