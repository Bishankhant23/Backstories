import { useNavigate } from 'react-router-dom';
import SeasonCard from './SeasonCard';

function ProfileSeasonList({ seasons = [], wasPrivate = false,onEditSeason=()=>{},onDeleteSeason=()=>{} }) {
  const navigate = useNavigate()
  
  if (wasPrivate) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        🔒 This is a private profile. Follow the user to view their seasons.
      </div>
    );
  }

  const AddBtn = () => {
    return <div className='text-end'>
        <button onClick={() => navigate("/season/add")} className='bg-blue-600 px-2 ms-auto py-1 rounded-md text-white hover:opacity-90 cursor-pointer'>Add</button>
      </div> 
  }

  if (!seasons.length) {
    return (
      <div className="text-center mt-10 text-gray-500 text-lg">
        <AddBtn/>
        No seasons to show yet.
      </div>
    );
  }

  return (
    <div>
      <AddBtn />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seasons.map((season) => (
          <SeasonCard
            key={season._id}
            season={season}
            onEdit={onEditSeason}
            onDelete={onDeleteSeason}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfileSeasonList;
