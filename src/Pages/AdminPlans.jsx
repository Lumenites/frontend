import { useState, useEffect } from "react";
import PlanTable from "../Components/admin/PlanTable";
import PlanModal from "../Components/admin/PlanModal";

export default function AdminPlans() {
	const [plans, setPlans] = useState([]);
	const [isModalOpen, setModalOpen] = useState(false);
	const [editingPlan, setEditingPlan] = useState(null);

	const token = localStorage.getItem("token");

	useEffect(() => {
		fetch("http://localhost:4000/api/plans", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((data) => setPlans(data))
			.catch((err) => console.error(err));
	}, [token]);

	const handleAdd = () => {
		setEditingPlan(null);
		setModalOpen(true);
	};

	const handleSave = async (plan) => {
		if (editingPlan) {
			// update
			const res = await fetch(
				`http://localhost:4000/api/plans/${editingPlan._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(plan),
				}
			);
			const updated = await res.json();
			setPlans((prev) =>
				prev.map((p) => (p._id === updated._id ? updated : p))
			);
		} else {
			// create
			const res = await fetch("http://localhost:4000/api/plans", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(plan),
			});
			const newPlan = await res.json();
			setPlans((prev) => [...prev, newPlan]);
		}
	};

	const handleEdit = (plan) => {
		setEditingPlan(plan);
		setModalOpen(true);
	};

	const handleDelete = async (id) => {
		await fetch(`http://localhost:4000/api/plans/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		});
		setPlans((prev) => prev.filter((p) => p._id !== id));
	};

	return (
		<div className="p-6 bg-white dark:bg-black text-black dark:text-white duration-300 rounded-xl shadow-sm">
			<PlanTable
				plans={plans}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onAdd={handleAdd}
			/>

			<PlanModal
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
				onSave={handleSave}
				initialData={editingPlan}
			/>
		</div>
	);
}
