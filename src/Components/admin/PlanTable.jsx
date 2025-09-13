import { Pencil, Trash2, Plus } from "lucide-react";
import Button from "../UI/Button";

export default function PlanTable({ plans, onEdit, onDelete, onAdd }) {
	return (
		<div className="bg-white dark:bg-black/80 text-black dark:text-white backdrop-blur-sm shadow-md rounded-2xl p-6 duration-300">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Subscription Plans</h2>
				<Button onClick={onAdd} className="flex items-center gap-2">
					<Plus size={18} /> Add Plan
				</Button>
			</div>

			<table className="w-full text-left">
				<thead>
					<tr className="text-gray-600 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700">
						<th className="py-2">Name</th>
						<th>Price</th>
						<th>Type</th>
						<th>Quota</th>
						<th>Speed</th>
						<th>Status</th>
						<th className="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{plans.map((plan) => (
						<tr
							key={plan.PlanID}
							className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
						>
							<td className="py-3">{plan.PlanName}</td>
							<td>₹{plan.MonthlyFee}</td>
							<td>{plan.Type}</td>
							<td>{plan.DataQuota} GB</td>
							<td>{plan.Speed} Mbps</td>
							<td>
								<span
									className={`px-2 py-1 rounded-lg text-xs ${
										plan.Status === "Active"
											? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
											: "bg-red-100 text-red-700 dark:bg-red-700 dark:text-white"
									}`}
								>
									{plan.Status}
								</span>
							</td>
							<td className="flex justify-end gap-2">
								<button
									onClick={() => onEdit(plan)}
									className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
								>
									<Pencil size={16} />
								</button>
								<button
									onClick={() => onDelete(plan.id)}
									className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
								>
									<Trash2 size={16} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
