import { useState } from "react";
import AdminPlans from "./AdminPlans";
import AdminDiscounts from "./AdminDiscounts";
import { ClipboardList, Percent } from "lucide-react";

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState("plans");

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<aside className="w-64 bg-black text-white backdrop-blur-sm shadow-md p-6">
				<h1 className="text-2xl font-bold mb-8 text-blue-600">
					Admin Panel
				</h1>

				<nav className="space-y-3">
					<button
						onClick={() => setActiveTab("plans")}
						className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition ${
							activeTab === "plans"
								? "bg-black/80 text-blue-700 font-semibold"
								: "text-gray-600 hover:bg-gray-50"
						}`}
					>
						<ClipboardList size={18} />
						Manage Plans
					</button>

					<button
						onClick={() => setActiveTab("discounts")}
						className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition ${
							activeTab === "discounts"
								? "bg-blue-100 text-blue-700 font-semibold"
								: "text-gray-600 hover:bg-gray-50"
						}`}
					>
						<Percent size={18} />
						Manage Discounts
					</button>
				</nav>
			</aside>

			{/* Main content */}
			<main className="flex-1 bg-black text-white p-6 overflow-y-auto">
				{activeTab === "plans" && <AdminPlans />}
				{activeTab === "discounts" && <AdminDiscounts />}
			</main>
		</div>
	);
}
