import { LoaderCircle, Check, TriangleAlert } from "lucide-react";
import { type Request } from "@/hooks/useRequests";
import { cn } from "@/lib/cn";

export function RequestCard({
  request: { id, loading, data, error },
  onRetry,
}: {
  request: Request;
  onRetry: (id: Request["id"]) => void;
}) {
  return (
    <div
      className={cn(
        "w-full max-w-96 bg-white rounded-lg shadow-lg border-l-4 p-4 flex flex-col gap-1",
        {
          "border-red-600": error,
          "border-green-500": data,
          "border-slate-800": loading,
        },
        {
          "animate-pulse": loading,
        }
      )}
    >
      {loading && <LoaderCircle className="animate-spin mb-4" />}
      {data && (
        <>
          <span className="animate-appear flex items-center gap-1 mb-2 text-green-600 text-xl font-semibold">
            <Check /> Success
          </span>
          <p className="text-sm text-gray-600">{data}</p>
        </>
      )}
      {error && (
        <>
          <span className="animate-appear flex items-center gap-1 mb-2 text-red-600  text-xl font-semibold">
            <TriangleAlert /> Error
          </span>
          <p className="text-sm text-gray-600">{error}</p>
          <button
            className="px-2 py-1 bg-white border border-zinc-200 hover:bg-zinc-100 transition-colors rounded-md self-start"
            onClick={() => onRetry(id)}
          >
            Retry
          </button>
        </>
      )}
      <p className="text-sm text-gray-600">Request ID: {id}</p>
    </div>
  );
}
