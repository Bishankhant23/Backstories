import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { useUserProfileStore } from '../../store/profile.store';
import ProfileHeader from './views/ProfileHeader';
import ProfileSeasonList from './views/ProfileSeasonList';
import ProfileMenus from './views/ProfileMenus';
import { deleteSeasonById } from '../../services/season.service';
import showToast from '../../utils/toast';


const MyProfile = () => {
  const { userId } = useParams();
  const { user } = useAuthStore();
  const isOwnProfile = !userId;

  const { profile, fetchUserProfileById, loading } = useUserProfileStore();
  const [activeTab, setActiveTab] = useState('seasons'); // 👈 Tab state

  useEffect(() => {
    if (userId) {
      fetchUserProfileById(userId);
    }
  }, [userId]);

  const profileData = userId ? profile : user;
  const wasPrivate = !isOwnProfile && profileData?.wasPrivate;
  const seasons = profileData?.seasons || [];

  const handleDelete = async (seasonId) => {
    try {
      const confirmation = confirm("Are you sure you want to delete this season with all the episodes in it?")
      if(confirmation){
        const res = await deleteSeasonById(seasonId);
        if(res.status == "success"){
          useUserProfileStore.getState().deleteSingleSeason(seasonId);
          window.location.reload()
          showToast('success', res.message || 'Season deleted successfully');
        }
      }
    } catch (error) {
    
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  if (!profileData) return <p className="text-center mt-10 text-red-500">User not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 min-h-screen bg-white p-8 rounded-xl shadow-md">
      <ProfileHeader
        username={profileData.username}
        email={profileData.email}
        createdAt={profileData.createdAt}
        followers={profileData.followers}
        following={profileData.following}
      />

      <ProfileMenus activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render Tabs */}
      {activeTab === 'seasons' && (
        <ProfileSeasonList onDeleteSeason={handleDelete} seasons={seasons} wasPrivate={wasPrivate} />
      )}

      {activeTab === 'about' && (
        <div className="text-gray-600 mt-6">
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Followers:</strong> {profileData.followers?.length}</p>
          <p><strong>Following:</strong> {profileData.following?.length}</p>
        </div>
      )}

      {activeTab === 'favourites' && (
        <div className="text-center mt-6 text-gray-500">
          💫 Favourite content will be displayed here later.
        </div>
      )}
    </div>
  );
};

export default MyProfile;
