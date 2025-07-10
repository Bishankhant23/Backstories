import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'
import MyProfile from '../pages/my-profile/myProfile';
import EpisodeDetails from '../pages/Episode-details';
import EpisodesList from '../pages/episodes-list';
import AddEpisode from '../pages/AddEpisode';
import AddSeason from '../pages/AddSeason';

export const privateRoutesArray = [
  {path : "/profile/:userId?" , Component : MyProfile},
  {path : "/episode/:episodeId" , Component : EpisodeDetails },
  {path : "/episodes/list/:seasonId" , Component : EpisodesList},
  {path : "/episode/add/:seasonId" , Component : AddEpisode},


  {path : "/season/add" , Component : AddSeason},


]


function PrivateRoutes() {
  const { user, loading } = useAuthStore();
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }else{
    return user  ? <Outlet /> : <Navigate to="/login" state={{from : location.pathname}} replace />;

  }

}

export default PrivateRoutes
