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
      document.body.classList.add("dark-mode"); // Add dark-mode class
    } else {
      document.body.classList.remove("dark-mode"); // Remove dark-mode class
    }
  }, [isDarkMode]);

  return (
    <Layout title={"IM SORRY UWU Page not found OWO かわいい <333"}>
      <h1>404</h1>
      <img
        src={isDarkMode ? "emoVictor.png" : "victorLiMaid.png"}
        style={{ width: '300px', height: 'auto' }}
        alt="VictorUWU"
        className="spin"
      />
      <h3>Toggle Dark/Light Mode:</h3>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </Layout>
  );
}

export default NotFound;
