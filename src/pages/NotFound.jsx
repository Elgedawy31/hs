import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div 
      className="min-h-screen flex items-center justify-center transition-colors duration-300"
      style={{ backgroundColor: theme.body }}
    >
      <div className="text-center">
        <div className="transition-all duration-500 hover:scale-105">
          <h1 
            className="text-9xl font-bold animate-pulse transition-colors duration-300"
            style={{ color: theme.primary }}
          >
            404
          </h1>
        </div>
        <div className="transition-all duration-300 ease-in-out transform hover:-translate-y-1">
          <h2 
            className="text-2xl font-semibold mt-4 transition-colors duration-300"
            style={{ color: theme.text }}
          >
            Page Not Found
          </h2>
          <p 
            className="mt-2 mb-6 transition-colors duration-300"
            style={{ color: theme.placeholderText }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: theme.primary }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = theme.altPrimary}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = theme.primary}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
