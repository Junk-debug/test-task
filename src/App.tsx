import { useState } from "react";
import { Button } from "@/ui/button";
import { Check, LoaderCircle, TriangleAlert } from "lucide-react";
import { saveFile } from "@/lib/server";
import { v4 as uuid } from "uuid";

type Request = {
  id: string;
  loading: boolean;
  error: string | null;
  data: string | null;
};

const initRequest = (): Request => ({
  id: uuid(),
  loading: true,
  error: null,
  data: null,
});

function App() {
  const [requests, setRequests] = useState<Request[]>([]);
  const activeRequests = requests.filter((req) => req.loading).length;

  const sendRequest = async () => {
    if (activeRequests >= 3) return;

    const newRequest = initRequest();

    const firstCompleted = requests.find((req) => !req.loading);
    if (firstCompleted) {
      setRequests((prev) =>
        prev.map((req) => (req.id === firstCompleted.id ? newRequest : req))
      );
    } else {
      setRequests((prev) => [...prev, newRequest]);
    }

    try {
      const result = await saveFile();
      console.log(result);
      setRequests((prev) =>
        prev.map((req) =>
          req.id === newRequest.id ? { ...req, data: result } : req
        )
      );
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === "string")
        setRequests((prev) =>
          prev.map((req) =>
            req.id === newRequest.id ? { ...req, error: err } : req
          )
        );
    } finally {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === newRequest.id ? { ...req, loading: false } : req
        )
      );
    }
  };

  const retry = async (id: Request["id"]) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, data: null, error: null, loading: true } : req
      )
    );

    try {
      const result = await saveFile();
      console.log(result);
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, data: result } : req))
      );
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === "string")
        setRequests((prev) =>
          prev.map((req) => (req.id === id ? { ...req, error: err } : req))
        );
    } finally {
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, loading: false } : req))
      );
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
          Save File
        </Button>
        <span className="text-white">Active requests: {activeRequests}</span>
        <div>
          {requests.map(({ loading, data, error, id }) => (
            <div key={id}>
              {id}
              {loading && <LoaderCircle className="animate-spin text-white" />}
              {data && (
                <div className="w-full max-w-96 bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4">
                  <span className="animate-appear flex items-center gap-1 mb-2 text-green-600 text-xl font-semibold">
                    <Check /> Success
                  </span>
                  <p className="text-sm text-gray-600">{data}</p>
                </div>
              )}
              {error && (
                <div className="w-full max-w-96 bg-white rounded-lg shadow-lg border-l-4 border-red-600 p-4">
                  <span className="animate-appear flex items-center gap-1 mb-2 text-red-600  text-xl font-semibold">
                    <TriangleAlert /> Error
                  </span>
                  <p className="text-sm text-gray-600">{error}</p>
                  <Button onClick={() => retry(id)}>Retry</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
