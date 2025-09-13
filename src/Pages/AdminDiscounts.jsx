import { useState, useEffect } from "react";
import DiscountCard from "../Components/admin/DiscountCard";
import DiscountModal from "../Components/admin/DiscountModal";
import Button from "../Components/UI/Button";
import discountsData from "../data/Discount.json";

export default function AdminDiscounts() {
	const [discounts, setDiscounts] = useState([]);
	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		setDiscounts(discountsData);
	}, []);

	const handleSave = (discount) => {
		setDiscounts((prev) => [...prev, { ...discount, id: Date.now() }]);
	};

	return (
		<div className="p-6 bg-white dark:bg-black text-black dark:text-white duration-300 rounded-xl shadow-sm">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Discounts</h2>
				<Button onClick={() => setModalOpen(true)}>Add Discount</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{discounts.map((d) => (
					<DiscountCard key={d.id} discount={d} />
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
