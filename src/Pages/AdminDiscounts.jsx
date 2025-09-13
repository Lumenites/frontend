import { useState, useEffect } from "react";
import DiscountCard from "../Components/admin/DiscountCard";
import DiscountModal from "../Components/admin/DiscountModal";
import Button from "../Components/UI/Button";

export default function AdminDiscounts() {
	const [discounts, setDiscounts] = useState([]);
	const [isModalOpen, setModalOpen] = useState(false);

	const token = localStorage.getItem("token");

	useEffect(() => {
		fetch("http://localhost:4000/api/discounts", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((data) => setDiscounts(data))
			.catch((err) => console.error(err));
	}, [token]);

	const handleSave = async (discount) => {
		const res = await fetch("http://localhost:4000/api/discounts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(discount),
		});
		const newDiscount = await res.json();
		setDiscounts((prev) => [...prev, newDiscount]);
	};

	return (
		<div className="p-6 bg-white dark:bg-black text-black dark:text-white duration-300 rounded-xl shadow-sm">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Discounts</h2>
				<Button onClick={() => setModalOpen(true)}>Add Discount</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{discounts.map((d) => (
					<DiscountCard key={d._id} discount={d} />
				))}
			</div>

			<DiscountModal
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
				onSave={handleSave}
			/>
		</div>
	);
}
