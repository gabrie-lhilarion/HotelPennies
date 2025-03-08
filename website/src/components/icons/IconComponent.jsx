import { FaHotel, FaUser, FaRegStar, FaCalendarPlus, FaCalendarMinus, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const IconComponent = ({ icon, size = 24 }) => {
    // Icon Mapping
    const icons = {
        hotel: <FaHotel size={size} />,
        user: <FaUser size={size} />,
        star: <FaRegStar size={size} />,
        calendarPlus: <FaCalendarPlus size={size} />,
        calendarMinus: <FaCalendarMinus size={size} />,
        search: <FaSearch size={size} />,
        location: <FaMapMarkerAlt size={size} />,
    };

    // Select the icon based on the `icon` prop, default to `FaHotel` if not found
    const selectedIcon = icons[icon] || <FaHotel size={size} />;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {selectedIcon}
        </motion.div>
    );
};

export default IconComponent;