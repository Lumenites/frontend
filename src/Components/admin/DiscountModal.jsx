import { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

export default function DiscountModal({ isOpen, onClose, onSave }) {
	const [form, setForm] = useState({
		Name: "",
		Type: "Fixed",
		Value: "",
		Condition: "",
		StartDate: "",
		EndDate: "",
		CreatedBy: "U001",
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		onSave({ ...form, DiscountID: `D${Date.now()}` }); // generate unique ID
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h2 className="text-lg font-semibold mb-4">Add Discount</h2>
			<div className="space-y-3">
				{/* Name */}
				<input
					name="Name"
					value={form.Name}
					onChange={handleChange}
					placeholder="Discount Name"
					className="w-full border rounded-lg px-3 py-2"
				/>

				{/* Type */}
				<select
					name="Type"
					value={form.Type}
					onChange={handleChange}
					className="w-full border rounded-lg px-3 py-2"
				>
					<option value="Fixed">Fixed</option>
					<option value="Percentage">Percentage</option>
				</select>

				{/* Value */}
				<input
					name="Value"
					value={form.Value}
					onChange={handleChange}
					placeholder="Value (₹ or %)"
					className="w-full border rounded-lg px-3 py-2"
				/>

				{/* Condition */}
				<select
					name="Condition"
					value={form.Condition}
					onChange={handleChange}
					className="w-full border rounded-lg px-3 py-2"
				>
					<option value="">Select Condition</option>
					<option value="For Students">For Students</option>
					<option value="All Plans">All Plans</option>
					<option value="Seasonal">Seasonal</option>
					<option value="Upgrade Only">Upgrade Only</option>
				</select>

				{/* Dates */}
				<div className="flex gap-2">
					<input
						type="date"
						name="StartDate"
						value={form.StartDate}
						onChange={handleChange}
						className="w-1/2 border rounded-lg px-3 py-2"
					/>
					<input
						type="date"
						name="EndDate"
						value={form.EndDate}
						onChange={handleChange}
						className="w-1/2 border rounded-lg px-3 py-2"
					/>
				</div>
			</div>

			<div className="flex justify-end gap-2 mt-4">
				<Button onClick={handleSubmit}>Save Discount</Button>
			</div>
		</Modal>
	);
}
