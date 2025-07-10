import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../utils/axiosInstance';



import {
  FaUsers,
  FaLightbulb,
  FaBook,
  FaFileAlt,
  FaUserCircle,
  FaHeart,
  FaCamera,
} from 'react-icons/fa';

const mainTabs = [
  { key: 'Content', label: 'Content', icon: <FaFileAlt /> },
  { key: 'Expectations', label: 'Expectations', icon: <FaLightbulb /> },
  { key: 'Learning', label: 'Learning', icon: <FaBook /> },
  {key : "Photos",label : "Photos",icon : <FaCamera/>}
];

const castTabs = [
  { key: 'all', label: 'All Cast', icon: <FaUsers /> },
  { key: 'favorite', label: 'Favorite Cast', icon: <FaHeart /> },
];

const EpisodeDetails = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState(null);
  const [activeTab, setActiveTab] = useState('Content');
  const [activeCastTab, setActiveCastTab] = useState('all');

  useEffect(() => {
    setEpisode(null);
    const fetchEpisode = async () => {
      try {
        const res = await axiosClient.get(`/episode/${episodeId}`);
        setEpisode(res.data.data);
      } catch (err) {
        console.error('Error fetching episode:', err);
      }
    };
    fetchEpisode();
  }, [episodeId]);

  if (!episode) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        Loading episode...
      </div>
    );
  }


  const photosSection = () => {
    return  episode.photos?.length > 0 && (
          <div className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {episode.photos.map((url, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-lg shadow hover:shadow-md transition"
                >
                  <img
                    src={url}
                    alt={`Episode Photo ${idx + 1}`}
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
  )}

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Expectations':
        return episode.expectations || 'No expectations provided.';
      case 'Learning':
        return episode.learning || 'No learning notes.';
      case 'Content':
        return episode.content || 'No content.';
      case "Photos" : 
        return photosSection()
      default:
        return null;
    }
  };

  const renderCastList = (castList) => {
    if (!castList.length) {
      return (
        <div className="text-gray-500 italic text-sm">
          No cast to show here.
        </div>
      );
    }

    return (
      <div className="w-full">
        {castList.map((member) => (
          <div
            key={member._id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
          >
            {member.profilePicture ? (
              <img
                src={member.profilePicture}
                alt={member.username}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-3xl text-gray-400" />
            )}
            <div>
              <p className="font-medium">{member.username}</p>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const allCast = episode.cast || [];
  const favCast = episode.favoriteCharacters || [];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold  mb-6">{episode.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Cast Section */}
        <div className="md:col-span-1">
          <div className="mb-4 flex gap-2 flex-wrap">
            {castTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCastTab(tab.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full font-medium ${
                  activeCastTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {renderCastList(activeCastTab === 'all' ? allCast : favCast)}
        </div>

        {/* Right - Content Tabs */}
        <div className="md:col-span-2">
          <div className="flex gap-3 mb-4 flex-wrap">
            {mainTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-md min-h-[150px]">
            <p className="text-gray-700 whitespace-pre-line">
              {renderTabContent()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
