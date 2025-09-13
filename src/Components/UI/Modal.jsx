import { motion } from "framer-motion";

export default function Modal({ isOpen, onClose, children }) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 40 }}
				className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6"
			>
				<button
					className="absolute top-4 right-6 text-gray-400 hover:text-gray-600"
					onClick={onClose}
				>
					✕
				</button>
				{children}
			</motion.div>
		</div>
	);
}
