import { faker } from '@faker-js/faker';
import { useState } from 'react';
import { Button } from '@/ui/button';
import { Check, TriangleAlert } from 'lucide-react';

const saveFile = (): Promise<string> =>
  new Promise((res, rej) => {
    const timeToResolve = faker.number.int({ min: 1000, max: 3000 });

    setTimeout(() => {
      Math.random() > 0.5
        ? res(`Success: ${faker.system.commonFileName()} saved`)
        : rej(`Error: ${faker.system.commonFileName()} not saved`);
    }, timeToResolve);
  });

function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      const result = await saveFile();
      console.log(result);
      setMessage(result);
    } catch (err: unknown) {
      console.error(err);
      if (typeof err === 'string') setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen w-screen p-4">
      <h1 className="text-white font-semibold text-4xl text-center mb-4">
        Async Challenge
      </h1>

      <div className="flex flex-col gap-3 justify-center items-center">
        <Button loading={loading} onClick={async () => sendRequest()}>
          Save File
        </Button>
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
