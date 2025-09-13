import { Tag } from "lucide-react";

export default function DiscountCard({ discount }) {
	return (
		<div className="bg-white dark:bg-black/80 text-black dark:text-white backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
			<div className="flex items-center gap-2 mb-2">
				<Tag className="text-cyan-500" size={18} />
				<h3 className="font-semibold">{discount.Name}</h3>
			</div>

			<p className="text-2xl font-bold text-blue-600 mb-2">
				{discount.Value} {discount.Type === "Percentage" ? "" : "OFF"}
			</p>

			<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
				Condition: {discount.Condition}
			</p>
			<p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
				Valid: {discount.StartDate} → {discount.EndDate}
			</p>
		</div>
	);
}
