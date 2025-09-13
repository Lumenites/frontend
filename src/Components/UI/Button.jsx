export default function Button({ children, onClick, className }) {
	return (
		<button
			onClick={onClick}
			className={`px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition ${className}`}
		>
			{children}
		</button>
	);
}
