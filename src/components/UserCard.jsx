import { FaUserCircle } from 'react-icons/fa';
import classNames from 'classnames';


function UserCard({ user, buttons = [],btnClasses }) {
  return (
    <div
      key={user._id}
      className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg shadow hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-3xl text-gray-400" />
        )}
        <div>
          <p className="font-medium">{user.username}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div>
        {buttons.map(({ icon: Icon, onClick, title }, i) => (
          <button
            key={i}
            onClick={() => onClick(user)}
            title={title}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Icon className={classNames("text-xl text-gray-600 cursor-pointer",btnClasses)} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserCard;
