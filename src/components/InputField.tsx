import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOccupation, setFieldType, selectOccupation, selectFieldType } from "../formSlice";
import TextInput from "./TextInput";
// import { RootState } from "../store";

interface InputFieldTypes {
    name: string;
    type: "text" | "dropdown" | "date-picker" | "number";
}

export interface InputFieldProps {
    name: string;
    type: InputFieldTypes["type"];
    label: string;
    options?: string[];
    value?: string; // Allow the InputField component to accept a value prop
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Define the onChange event handler
}

const InputField: React.FC<InputFieldProps> = ({ name, type, label, options, value, onChange }) => {
    const dispatch = useDispatch();
    const occupation = useSelector(selectOccupation);
    const fieldType = useSelector(selectFieldType);

    const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (name === "select type") {
            dispatch(setOccupation(event.target.value));
        } else if (name === "FieldSelect") {
            dispatch(setFieldType(event.target.value));
        }
        if (onChange) {
            onChange(event); // Call the onChange event handler if provided
        }
    };

    switch (type) {
        case "number": return <input type="number" name={name} placeholder={label} value={value} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleFieldChange(event)} />;
        case "text":
            return <TextInput label={label} />;
        case "dropdown":
            return (
                <div>
                    <div>
                        <label htmlFor={name}>{label}</label>
                    </div>
                    <select name={name} defaultValue={value || (name === "select type" ? occupation : fieldType)} onChange={handleFieldChange}>
                        {options &&
                            options.map((option, index) => {
                                return (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            );
        case "date-picker":
            return <input type="date" name={name} placeholder={label} value={value} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleFieldChange(event)} />;
        default:
            return null;
    }
};

InputField.defaultProps = {
    type: "text",
    options: [],
};

export default InputField;
