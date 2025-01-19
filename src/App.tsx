import { useState } from "react";
import { Button } from "@/ui/button";
import { Check, LoaderCircle, TriangleAlert } from "lucide-react";
import { saveFile } from "@/lib/server";

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeRequests, setActiveRequests] = useState(0);
  const loading = activeRequests > 0;

  const sendRequest = async () => {
    setActiveRequests((prev) => prev + 1);
    setMessage(null);
    setError(null);

    try {
      const result = await saveFile();
      console.log(result);
      setMessage(result);
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === "string") setError(err);
    } finally {
      setActiveRequests((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen p-4">
      <h1 className="text-white font-semibold text-4xl text-center mb-4">
        Async Challenge
      </h1>

      <div className="flex flex-col gap-3 justify-center items-center">
        <Button
          disabled={activeRequests >= 3}
          onClick={async () => sendRequest()}
        >
          {error ? "Try again" : "Save File"}
        </Button>
        <span className="text-white">Active requests: {activeRequests}</span>
        {loading && <LoaderCircle className="animate-spin text-white" />}
        {message && (
          <div className="w-full max-w-96 bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4">
            <span className="animate-appear flex items-center gap-1 mb-2 text-green-600 text-xl font-semibold">
              <Check /> Success
            </span>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        )}
        {error && (
          <div className="w-full max-w-96 bg-white rounded-lg shadow-lg border-l-4 border-red-600 p-4">
            <span className="animate-appear flex items-center gap-1 mb-2 text-red-600  text-xl font-semibold">
              <TriangleAlert /> Error
            </span>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
