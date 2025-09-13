import { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

export default function DiscountModal({ isOpen, onClose, onSave }) {
	const [form, setForm] = useState({
		code: "",
		description: "",
		percentage: "",
		validFrom: "",
		validTo: "",
		conditions: "",
		active: true,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm({
			...form,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = () => {
		onSave(form);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h2 className="text-lg font-semibold mb-4">Add Discount</h2>
			<div className="space-y-3">
				<input
					name="code"
					value={form.code}
					onChange={handleChange}
					placeholder="Discount Code"
					className="w-full border rounded-lg px-3 py-2"
				/>

				<input
					name="description"
					value={form.description}
					onChange={handleChange}
					placeholder="Description"
					className="w-full border rounded-lg px-3 py-2"
				/>

				<input
					type="number"
					name="percentage"
					value={form.percentage}
					onChange={handleChange}
					placeholder="Percentage (1-100)"
					min="1"
					max="100"
					className="w-full border rounded-lg px-3 py-2"
				/>

				<select
					name="conditions"
					value={form.conditions}
					onChange={handleChange}
					className="w-full border rounded-lg px-3 py-2"
				>
					<option value="">Select Condition</option>
					<option value="For Students">For Students</option>
					<option value="All Plans">All Plans</option>
					<option value="Seasonal">Seasonal</option>
					<option value="Upgrade Only">Upgrade Only</option>
				</select>

				<div className="flex gap-2">
					<input
						type="date"
						name="validFrom"
						value={form.validFrom}
						onChange={handleChange}
						className="w-1/2 border rounded-lg px-3 py-2"
					/>
					<input
						type="date"
						name="validTo"
						value={form.validTo}
						onChange={handleChange}
						className="w-1/2 border rounded-lg px-3 py-2"
					/>
				</div>

				<label className="flex items-center gap-2">
					<input
						type="checkbox"
						name="active"
						checked={form.active}
						onChange={handleChange}
					/>
					Active
				</label>
			</div>

			<div className="flex justify-end gap-2 mt-4">
				<Button onClick={handleSubmit}>Save Discount</Button>
			</div>
		</Modal>
	);
}
