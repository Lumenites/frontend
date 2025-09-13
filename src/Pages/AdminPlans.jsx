import { useState, useEffect } from "react";
import PlanTable from "../Components/admin/PlanTable";
import PlanModal from "../Components/admin/PlanModal";
import plansData from "../data/Plans.json";

export default function AdminPlans() {
	const [plans, setPlans] = useState([]);
	const [isModalOpen, setModalOpen] = useState(false);
	const [editingPlan, setEditingPlan] = useState(null);

	useEffect(() => {
		setPlans(plansData);
	}, []);

	const handleAdd = () => {
		setEditingPlan(null);
		setModalOpen(true);
	};

	const handleSave = (plan) => {
		if (editingPlan) {
			setPlans((prev) =>
				prev.map((p) =>
					p.id === editingPlan.id ? { ...plan, id: p.id } : p
				)
			);
		} else {
			setPlans((prev) => [...prev, { ...plan, id: Date.now() }]);
		}
	};

	const handleEdit = (plan) => {
		setEditingPlan(plan);
		setModalOpen(true);
	};

	const handleDelete = (id) => {
		setPlans((prev) => prev.filter((p) => p.id !== id));
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
