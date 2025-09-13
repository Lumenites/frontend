import { Tag } from "lucide-react";

export default function DiscountCard({ discount }) {
	return (
		<div className="bg-black/80 text-white backdrop-blur-sm p-5 rounded-2xl shadow-md hover:shadow-lg transition">
			<div className="flex items-center gap-2 mb-2">
				<Tag className="text-cyan-500" size={18} />
				<h3 className="font-semibold">{discount.name}</h3>
			</div>
			<p className="text-lg font-semibold">{discount.Name}</p>
			<p className="text-2xl font-bold text-blue-600 mb-2">
				{discount.Value} {discount.Type === "Percentage" ? "" : "OFF"}
			</p>
			<p className="text-sm text-gray-500 mb-1">
				Condition: {discount.Condition}
			</p>
			<p className="text-sm text-gray-500 mb-1">
				Valid: {discount.StartDate} → {discount.EndDate}
			</p>
		</div>
	);
}
