import { useState } from "react";

interface TextInputProps {
    label: string;
}

export default function TextInput({ label }: TextInputProps) {

    const [fieldValue, setFieldValue] = useState(label);

    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(event.target.value);
    };

    return <input type="text" value={fieldValue} onChange={handleFieldChange} />;

};