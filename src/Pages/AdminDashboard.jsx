import { useState } from "react";
import AdminPlans from "./AdminPlans";
import AdminDiscounts from "./AdminDiscounts";
import { ClipboardList, Percent } from "lucide-react";

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState("plans");

	return (
		<div className="flex h-screen bg-white dark:bg-black text-black dark:text-white duration-300">
			{/* Sidebar */}
			<aside className="w-64 bg-gray-100 dark:bg-gray-900 backdrop-blur-sm shadow-md p-6 duration-300">
				<h1 className="text-2xl font-bold mb-8 text-blue-600">
					Admin Panel
				</h1>

				<nav className="space-y-3">
					<button
						onClick={() => setActiveTab("plans")}
						className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition duration-200 ${
							activeTab === "plans"
								? "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white font-semibold"
								: "hover:bg-gray-200 dark:hover:bg-gray-800"
						}`}
					>
						<ClipboardList size={18} />
						Manage Plans
					</button>

					<button
						onClick={() => setActiveTab("discounts")}
						className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition duration-200 ${
							activeTab === "discounts"
								? "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white font-semibold"
								: "hover:bg-gray-200 dark:hover:bg-gray-800"
						}`}
					>
						<Percent size={18} />
						Manage Discounts
					</button>
				</nav>
			</aside>

			{/* Main content */}
			<main className="flex-1 p-6 overflow-y-auto duration-300">
				{activeTab === "plans" && <AdminPlans />}
				{activeTab === "discounts" && <AdminDiscounts />}
			</main>
		</div>
	);
}
