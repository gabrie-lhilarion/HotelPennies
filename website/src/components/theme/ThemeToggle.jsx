import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
    const [theme, setTheme] = useState("light");

    // Detect system theme on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }, []);

    // Function to toggle theme
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <button onClick={toggleTheme} className="p-1 border rounded-md">
            <AnimatePresence mode="wait">
                {theme === "dark" ? (
                    <motion.div
                        key="darkMode"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MdOutlineDarkMode size={20} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="lightMode"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MdLightMode size={20} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
