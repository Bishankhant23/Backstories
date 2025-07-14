import { useState } from 'react';
import axiosClient from '../utils/axiosInstance';
import showToast from '../utils/toast';
import Quill from '../components/Quill';

const AddSeason = () => {
  const [form, setForm] = useState({
    name: '',
    year: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.year) {
      showToast('error', 'Name and Year are required');
      return;
    }

    try {
      setLoading(true);
      const res = await axiosClient.post('/season', form);
      showToast('success', 'Season created successfully!');
      setForm({ name: '', year: '', description: '' });
    } catch (err) {
      showToast('error', err.message || 'Failed to create season');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md p-6 rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create New Season</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Season Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Eg: Season of Change"
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Year</label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Eg: 2025"
            className="w-full border px-4 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write something about this season..."
            rows={4}
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          {loading ? 'Creating...' : 'Create Season'}
        </button>
      </form>
    </div>
  );
};

export default AddSeason;
