import { useState, useEffect } from "react";
import { Central as Layout } from "@/layouts";
import "./NotFound.style.scss";

function NotFound() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <Layout title={"IM SORRY UWU Page not found OWO かわいい <33"}>
      <h1>404</h1>
      {/* Add the 'spin' class to make the image spin */}
      <img src="victorLiMaid.png" alt="VictorUWU" className="spin" />
      <h3>Toggle Dark/Light Mode:</h3>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </Layout>
  );
}

export default NotFound;
