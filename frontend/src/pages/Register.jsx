import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed'
      );
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">
        Create an account
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
          type="text"
          placeholder="Name"
          required
          className="border rounded px-3 py-2"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

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
          Register
        </button>
      </form>
    </div>
  );
}