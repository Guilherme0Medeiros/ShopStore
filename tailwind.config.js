/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    //...todas anteriores
    "bg-gradient-to-br",
    "bg-gradient-to-r",
    "from-blue-50",
    "to-indigo-50",
    "from-blue-500",
    "to-indigo-600",
    "from-blue-600",
    "bg-white",
    "bg-white/90",
    "bg-indigo-600",
    "text-white",
    "text-blue-600",
    "text-blue-700",
    "text-indigo-600",
    "text-gray-600",
    "text-gray-500",
    "text-gray-400",
    "text-gray-700",
    "text-transparent",
    "bg-clip-text", // ESSENCIAL para gradiente no texto!
    "border-gray-300",
    "border-blue-400",
    "hover:border-blue-400",
    "focus-within:!border-blue-500",
    "border-blue-500",
    "border-none",
    "placeholder-gray-400",
    "text-danger",
    "bg-danger",
    "text-red-400",
    "hover:text-red-500",
    "hover:text-blue-700",
    "hover:text-blue-600",
    "hover:text-orange-400",
    "hover:text-gray-600",
    "bg-background",
    "backdrop-blur-md",
    "border-white",
    "border-white/30",
    "border-t-white",
    "bg-black",
    "text-orange-400",
    "text-orange-500",
    "bg-yellow-200",
    "bg-success",
    "text-success",
    "bg-gray-800",
    "border-gray-700",
    "bg-gray-900",
    "border-gray-800",
    "bg-orange-500",
    "bg-red-500",
    "text-gray-300",
    "bg-gray-50",
    "bg-primary",
    "text-primary",
    "bg-yellow-400",
    "text-yellow-400",
    "text-green-700",
    "bg-green-500",
    "bg-green-600",
    "text-primary-foreground",
    "bg-success",
    "text-success-foreground",
    "bg-warning",
    "text-warning",
    "bg-error",
    "text-error",
    "hover:bg-orange-600",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
