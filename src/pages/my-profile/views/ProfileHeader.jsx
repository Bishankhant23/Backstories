const ProfileHeader = ({ username, email, createdAt, followers = [], following = [] }) => {
  return (
    <div className="flex md:flex-row flex-col md:justify-start justify-center items-center space-x-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-3xl font-bold">
        {username?.charAt(0).toUpperCase()}
      </div>
      <div className="flex justify-center flex-col items-center md:items-baseline">
        <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
        <p className="text-gray-500">{email}</p>
        <p className="text-sm text-gray-400 mt-1">
          Joined: {new Date(createdAt || Date.now()).toLocaleDateString()}
        </p>
        <div className="mt-2 flex space-x-4">
          <p className="text-sm text-gray-600">Followers: {followers?.length || 0}</p>
          <p className="text-sm text-gray-600">Following: {following?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
