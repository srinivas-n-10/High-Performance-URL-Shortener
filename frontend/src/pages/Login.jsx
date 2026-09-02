import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed'
      );
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        Login
      </h1>

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          required
          className="border rounded px-3 py-2"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="border rounded px-3 py-2"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}