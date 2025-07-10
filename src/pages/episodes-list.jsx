import { useEffect, useState } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../utils/axiosInstance';
import { useUserProfileStore } from '../store/profile.store';
import { useAuthStore } from '../store/auth.store';

const EpisodesList = () => {
  const { seasonId } = useParams();
  // const { profile, fetchUserProfileById, loading } = useUserProfileStore();
  const { user } = useAuthStore();
  const [season,setSeason] = useState();

  useEffect(() => {
      const name = user ? (user?.seasons?.find(e => e._id == seasonId)) : null
      if(name){
        setSeason(name.title)
      }
  },[user])

  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await axiosClient.get(`/episode/list/${seasonId}`);
        setEpisodes(res.data.data || []);
        setFiltered(res.data.data || []);
      } catch (err) {
        console.error('Error fetching episodes:', err);
      }
    };
    fetchEpisodes();
  }, [seasonId]);

  useEffect(() => {
    let result = [...episodes];

    if (search) {
      result = result.filter((ep) =>
        ep.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (date) {
      result = result.filter(
        (ep) =>
          new Date(ep.date).toDateString() === new Date(date).toDateString()
      );
    }

    setFiltered(result);
  }, [search, date, episodes]);

  const goToAddEpisodePage = () => {
    navigate(`/episode/add/${seasonId}`)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">{season}</h1>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center w-full sm:w-1/2 bg-white shadow px-3 py-2 rounded-md border border-gray-300">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center w-full sm:w-1/2 bg-white shadow px-3 py-2 rounded-md border border-gray-300">
          <FaCalendarAlt className="text-gray-400 mr-2" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full outline-none"
          />
        </div>
      </div>

      <div className='text-end'>
          <button onClick={goToAddEpisodePage} className='bg-blue-600 px-3 py-1 text-white mb-4 hover:opacity-80 cursor-pointer rounded-md'>Add</button>
      </div>

      {/* Episode Cards */}
      {filtered.length === 0 ? (
        <div className="text-center text-gray-500">No episodes found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ep) => (
            <div
              key={ep._id}
              onClick={() => navigate(`/episode/${ep._id}`)}
              className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <h2 className="text-lg font-semibold mb-1">{ep.title}</h2>
              <p className="text-sm text-gray-500">
                {ep.date ? new Date(ep.date).toDateString() : 'No date'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EpisodesList;
