import { FaHotel, FaUser, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const IconComponent = ({ icon, size = 24 }) => {
    // State to track theme and update colors
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Effect to listen for theme changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setTheme(localStorage.getItem("theme") || "light");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Set color dynamically based on theme
    const color = theme === "dark" ? "#A7F3D0" : "#022C22";

    // Icon Mapping
    const icons = {
        hotel: <FaHotel size={size} color={color} />,
        user: <FaUser size={size} color={color} />,
        star: <FaRegStar size={size} color={color} />,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {icons[icon] || <FaHotel size={size} color={color} />}
        </motion.div>
    );
};

export default IconComponent;
