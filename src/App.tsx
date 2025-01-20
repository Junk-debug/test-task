import { Button } from "@/ui/button";
import useRequests, { MAX_REQUESTS } from "./hooks/useRequests";
import { RequestCard } from "./ui/request-card";

function App() {
  const { activeRequests, requests, sendRequest, retry } = useRequests();

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen p-8">
      <h1 className="text-white font-bold text-5xl text-center mb-4">
        Async Challenge
      </h1>

      <div className="flex flex-col gap-3 justify-center items-center">
        <span className="text-white">Active requests: {activeRequests}</span>

        <Button
          disabled={activeRequests >= MAX_REQUESTS}
          onClick={async () => sendRequest()}
        >
          Save File
        </Button>

        <div className="flex flex-col gap-4">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} onRetry={retry} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
