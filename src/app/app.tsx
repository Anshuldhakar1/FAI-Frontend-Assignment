import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOccupation, setFieldType, selectOccupation, selectFieldType } from '../formSlice';
import InputField from '../components/InputField';
import { RootState } from '../store';

export function App() {
	const dispatch = useDispatch();
	const occupation = useSelector(selectOccupation);
	const fieldType = useSelector(selectFieldType);

	const handleOccupationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setOccupation(event.target.value));
	};

	const handleFieldTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setFieldType(event.target.value));
	};

	const [addedFields, setAddedFields] = useState<string[]>([]);
	const handleAddField = () => {
		setAddedFields([...addedFields, fieldType]);
		console.log(addedFields);
	};

	const displayOptions = () => {
		switch (fieldType) {
			case "text":
				return (
					<InputField
						name="FieldDisplayName"
						label="Field Display Name"
						type="text"
					/>
				);
			case "dropdown":
				return (
					<InputField
						name="FieldOptions"
						label="Field Options"
						type="dropdown"
						options={["Option 1", "Option 2", "Option 3"]}
					/>
				);
			case "date-picker":
				return (
					<InputField
						name="FieldDatePicker"
						label="Field Date Picker"
						type="date-picker"
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<h1>Dynamic Form</h1>
			<InputField
				name="select type"
				label="Select Occupation:"
				type="dropdown"
				options={["Student", "Self-Employee", "Business"]}
				value={occupation}
				onChange={handleOccupationChange}
			/>

			<div>
				<InputField
					name="FieldSelect"
					label="Select a Field Type"
					type="dropdown"
					options={["text", "dropdown", "date-picker"]}
					value={fieldType}
					onChange={handleFieldTypeChange}
				/>
			</div>

			<button type="button" onClick={handleAddField}>
				Add Field
			</button>

			{addedFields.map((field, index) => (
				<div key={index}>
					{displayOptions()}
				</div>
			))}
		</div>
	);
}

export default App;
