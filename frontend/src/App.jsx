import { useEffect, useState } from "react";
import { getHealth } from "./api/api";

function App() {
  const [status, setStatus] = useState("Checking server...");

  useEffect(() => {
    async function checkHealth() {
      try {
        const data = await getHealth();
        setStatus(data.message);
      } catch (error) {
        setStatus("Backend not reachable");
      }
    }

    checkHealth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">
          High Performance URL Shortener
        </h1>

        <p className="text-lg">{status}</p>
      </div>
    </div>
  );
}

export default App;