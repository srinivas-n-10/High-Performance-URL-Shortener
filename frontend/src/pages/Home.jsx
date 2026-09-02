import { useState } from 'react';
import api from '../api/axios';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setResult(null);

    try {
      const res = await api.post('/api/url/shorten', {
        longUrl,
        customAlias: customAlias || undefined,
      });

      setResult(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong'
      );
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        Shorten a URL
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="url"
          placeholder="Paste your long URL"
          required
          className="border rounded px-3 py-2"
          value={longUrl}
          onChange={(e) =>
            setLongUrl(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Custom alias (optional)"
          className="border rounded px-3 py-2"
          value={customAlias}
          onChange={(e) =>
            setCustomAlias(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          Shorten
        </button>
      </form>

      {error && (
        <p className="text-red-600 mt-4">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded border">
          <p className="text-sm text-gray-500">
            Your short URL:
          </p>

          <a
            href={result.shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 font-medium break-all"
          >
            {result.shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}