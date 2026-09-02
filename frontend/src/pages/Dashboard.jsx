import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  api
    .get('/api/url/my-urls?page=1&limit=20')
    .then((res) => {
      setUrls(res.data.data.urls);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Your URLs
      </h1>

      {urls.length === 0 ? (
        <p className="text-gray-500">
          You haven't created any short URLs yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {urls.map((url) => (
            <div
              key={url._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-blue-600">
                  {url.shortCode}
                </p>

                <p className="text-sm text-gray-500 truncate max-w-md">
                  {url.longUrl}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {url.clickCount} clicks
                </p>
              </div>

              <Link
                to={`/analytics/${url.shortCode}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View analytics
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}