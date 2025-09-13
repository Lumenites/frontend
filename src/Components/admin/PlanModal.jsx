import { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

export default function PlanModal({ isOpen, onClose, onSave, initialData }) {
	const [form, setForm] = useState(
		initialData || {
			PlanName: "",
			Type: "Fibernet",
			MonthlyFee: "",
			DataQuota: "",
			Speed: "",
			Status: "Active",
			CreatedBy: "U001",
		}
	);
	  

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		onSave(form);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h2 className="text-lg font-semibold mb-4">
				{initialData ? "Edit Plan" : "Add New Plan"}
			</h2>
			<div className="space-y-3">
				<input
					name="PlanName"
					value={form.PlanName}
					onChange={handleChange}
					placeholder="Plan Name"
					className="w-full border rounded-lg px-3 py-2"
				/>
				<input
					name="MonthlyFee"
					value={form.MonthlyFee}
					onChange={handleChange}
					placeholder="Monthly Fee"
					type="number"
					className="w-full border rounded-lg px-3 py-2"
				/>
				<input
					name="DataQuota"
					type="number"
					placeholder="Data Quota (GB)"
					value={form.DataQuota}
					className="w-full border rounded-lg px-3 py-2"
				/>
				<input
					name="Speed"
					type="number"
					placeholder="Speed (Mbps)"
					value={form.Speed}
					className="w-full border rounded-lg px-3 py-2"
				/>
				<select
					name="Type"
					value={form.Type}
					onChange={handleChange}
					className="w-full border rounded-lg px-3 py-2"
				>
					<option>Fibernet</option>
					<option>Copper</option>
				</select>
				<select
					name="status"
					value={form.status}
					onChange={handleChange}
					className="w-full border rounded-lg px-3 py-2"
				>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
				</select>
			</div>
			<div className="flex justify-end gap-2 mt-4">
				<Button onClick={handleSubmit}>
					{initialData ? "Save Changes" : "Add Plan"}
				</Button>
			</div>
		</Modal>
	);
}
