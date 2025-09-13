import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

export default function PlanModal({ isOpen, onClose, onSave, initialData }) {
	const [form, setForm] = useState({
		code: "",
		name: "",
		price: "",
		quota: "",
		description: "",
	});

	useEffect(() => {
		if (initialData) setForm(initialData);
	}, [initialData]);

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
			<div className="space-y-3 text-black dark:text-white">
				<input
					name="code"
					value={form.code}
					onChange={handleChange}
					placeholder="Plan Code (unique)"
					className="w-full border rounded-lg px-3 py-2 text-black dark:text-white"
				/>
				<input
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder="Plan Name"
					className="w-full border rounded-lg px-3 py-2 text-black dark:text-white"
				/>
				<input
					name="price"
					value={form.price}
					onChange={handleChange}
					placeholder="Price"
					type="number"
					className="w-full border rounded-lg px-3 py-2 text-black dark:text-white"
				/>
				<input
					name="quota"
					value={form.quota}
					onChange={handleChange}
					placeholder="Data Quota (e.g. 100GB / Unlimited)"
					className="w-full border rounded-lg px-3 py-2 text-black dark:text-white"
				/>
				<textarea
					name="description"
					value={form.description}
					onChange={handleChange}
					placeholder="Description"
					className="w-full border rounded-lg px-3 py-2 text-black dark:text-white"
				/>
			</div>
			<div className="flex justify-end gap-2 mt-4">
				<Button onClick={handleSubmit}>
					{initialData ? "Save Changes" : "Add Plan"}
				</Button>
			</div>
		</Modal>
	);
}
