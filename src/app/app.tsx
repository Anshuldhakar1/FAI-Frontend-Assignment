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
		const selectedFieldType = event.target.value;
		dispatch(setFieldType(selectedFieldType));
		setShowOptions(selectedFieldType !== "none"); // Update the showOptions state based on the selected fieldType
	};

	const [showOptions, setShowOptions] = useState(false);
	const handleAddField = () => {
		console.log("Add Field");
		setShowOptions(true);
	};

	const displayOptions = () => {
		switch (fieldType) {
			case "text":
				return <div>
					<div>
						<label htmlFor="FieldDisplayName">Field Display Name</label>
						<InputField
							name="FieldDisplayName"
							label=""
							type="text"
						/>
					</div>
					<div>
						<label htmlFor="FieldDisplayName">Field Data Type</label>
						<InputField
							name="FieldDataType"
							label=""
							type="dropdown"
							options={["number", "text"]}
						/>
					</div>
					<div>
						<label htmlFor='FieldMaxLength'>Field Max length allowed</label>
						<InputField
							name="FieldMaxLength"
							label=""
							type="number"
						/>
					</div>
					<div>
						<label htmlFor="FieldMandatory">Mandatory</label>
						<InputField
							name="FieldMandatory"
							label=""
							type="dropdown"
							options={["Yes", "No"]}
						/>
					</div>
					<div>
						<label htmlFor="FieldData">Field Data</label>
						<input type='text' name="FieldData" />
					</div>
					<button type="button">Confirm</button>
				</div>;
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
					options={["none", "text", "dropdown", "date-picker"]} // Add "none" option to the dropdown options
					value={fieldType}
					onChange={handleFieldTypeChange}
				/>
			</div>

			<button type="button" onClick={handleAddField}>
				Add Field
			</button>

			{showOptions && displayOptions()}

		</div>
	);
}

export default App;
