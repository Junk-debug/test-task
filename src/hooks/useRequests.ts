import { saveFile } from "@/lib/server";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export type Request = {
  id: string;
  loading: boolean;
  error: string | null;
  data: string | null;
};

const getInitialRequest = (): Request => ({
  id: uuid(),
  loading: true,
  error: null,
  data: null,
});

export const MAX_REQUESTS = 3;

export default function useRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const activeRequests = requests.filter((req) => req.loading).length;

  const updateRequest = (id: Request["id"], updates: Partial<Request>) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, ...updates } : req))
    );
  };

  const handleRequest = async (requestId: string) => {
    try {
      const result = await saveFile();
      console.log(result);
      updateRequest(requestId, { data: result });
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === "string") updateRequest(requestId, { error: err });
    } finally {
      updateRequest(requestId, { loading: false });
    }
  };

  const sendRequest = async () => {
    if (activeRequests >= MAX_REQUESTS) return;

    const newRequest = getInitialRequest();

    const firstCompleted = requests.find((req) => !req.loading);
    if (firstCompleted && requests.length >= MAX_REQUESTS) {
      setRequests((prev) =>
        prev.map((req) => (req.id === firstCompleted.id ? newRequest : req))
      );
    } else {
      setRequests((prev) => [...prev, newRequest]);
    }

    await handleRequest(newRequest.id);
  };

  const retry = async (id: Request["id"]) => {
    updateRequest(id, { data: null, error: null, loading: true });
    handleRequest(id);
  };

  return { requests, activeRequests, sendRequest, retry };
}
