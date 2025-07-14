import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaPlus,
  FaHeart,
  FaChevronUp,
  FaChevronDown,
  FaMinus,
} from "react-icons/fa";
import axiosClient from "../utils/axiosInstance";
import showToast from "../utils/toast";
import { searchUsers } from "../services/users.service";
import { useAuthStore } from "../store/auth.store";
import UserCard from "../components/UserCard";
import classNames from "classnames";

const AddEpisode = () => {
  const { seasonId } = useParams();
  const { user } = useAuthStore();

  const [season, setSeason] = useState(null);
  const [showSelectdUserDrawer, setShowSelectedUserDrawer] = useState(false);

  useEffect(() => {
    const name = user ? user?.seasons?.find((e) => e._id == seasonId) : null;
    if (name) {
      setSeason(name.title);
    }
  }, [user]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    expectations: "",
    learning: "",
    cast: [],
    selectedCast: [],
    favoriteCharacters: [],
    type: "personal",
  });

  const [photos, setPhotos] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [userResults, setUserResults] = useState([]);

  //tabs
  const [CastTabs, setCastTabs] = useState("all-cast");
  const [Maintabs, setMainTabs] = useState("casts");

  const handleUserSearch = async (query) => {
    setUserQuery(query);
    if (query.trim()) {
      const results = await searchUsers(query);
      setUserResults(results);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("expectations", form.expectations);
    formData.append("learning", form.learning);
    formData.append("season", seasonId);
    formData.append("type", form.type);

    form.cast.forEach((id) => formData.append("cast[]", id));
    form.favoriteCharacters.forEach((user) =>{
      formData.append("favoriteCharacters[]", user?._id)}
    );
    photos.forEach((photo) => formData.append("photos", photo));

    try {
      await axiosClient.post("/episode/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast("success", "Episode created!");
    } catch (err) {
      showToast("error", err.message || "Failed to add episode");
    }
  };

  const toggleFavourites = (user) => {
    const index = form.favoriteCharacters.findIndex((u) => u._id === user._id);

    if (index === -1) {
      setForm({
        ...form,
        favoriteCharacters: [...form.favoriteCharacters, user],
      });
    } else {
      const updated = [...form.favoriteCharacters];
      updated.splice(index, 1);
      setForm({
        ...form,
        favoriteCharacters: updated,
      });
    }
  };

  const toggleSelectedCast = (user) => {
    setForm((prevForm) => {
      const index = prevForm.selectedCast.findIndex((u) => u._id === user._id);
      if (index === -1) {
        return {
          ...prevForm,
          selectedCast: [...prevForm.selectedCast, user],
        };
      } else {
        const updatedSelectedClass = [...prevForm.selectedCast];
        updatedSelectedClass.splice(index, 1);

        let updatedFavouriteCharacter = [...prevForm.favoriteCharacters];
        updatedFavouriteCharacter = updatedFavouriteCharacter.filter(
          (e) => e._id !== user?._id
        );

        return {
          ...prevForm,
          selectedCast: updatedSelectedClass,
          favoriteCharacters: updatedFavouriteCharacter,
        };
      }
    });
  };

  //buttons for user cards

  const selctedCastCardButtons = [
    {
      icon: FaHeart,
      onClick: (user) => toggleFavourites(user),
      title: "add favourite",
    },
  ];

  const castCardButtons = (selected) => {
    const icon = selected ? FaMinus : FaPlus;
    return [
      {
        icon,
        onClick: (user) => toggleSelectedCast(user),
        title: "Select cast",
      },
    ];
  };

  return (
    <div>
      <div className="text-center text-3xl font-semibold font-sans my-10">
        {season}
      </div>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar */}
        <div className="bg-white p-4 shadow rounded-md">
          <div className="mb-4 flex">
            <button
              className={`px-4 py-1 flex-1 cursor-pointer text-sm ${
                Maintabs === "casts"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setMainTabs("casts")}
            >
              Cast
            </button>
            <button
              className={`px-4 py-1 flex-1 cursor-pointer text-sm ${
                Maintabs === "photos"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setMainTabs("photos")}
            >
              Photos
            </button>
          </div>

          <div className="relative">

            {
              Maintabs == "casts" ? 
                    <div>
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={userQuery}
                        onChange={(e) => handleUserSearch(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md mb-3"
                      />

                      <div className="relative overflow-hidden max-h-[450px] border">
                        <div className="mb-4 h-[410px] overflow-y-scroll hide-scrollbar">
                          {userResults.map((user) => (
                            <div key={user._id}>
                              <UserCard
                                user={user}
                                buttons={castCardButtons(
                                  form.selectedCast.find((e) => e._id == user._id)
                                )}
                              />
                            </div>
                          ))}
                        </div>

                        {/* seected user */}
                        <div
                          className={classNames(
                            "absolute transition-all duration-100 left-0 right-0 bg-gray-600",
                            showSelectdUserDrawer ? "top-0 bottom-0" : "top-[91%]"
                          )}
                        >
                          <div
                            className={classNames(
                              "font-semibold h-[40px] bg-gray  flex justify-between items-center  bg-gray-700 text-white px-2"
                            )}
                          >
                            <div className="">Selected Cast</div>
                            {showSelectdUserDrawer ? (
                              <FaChevronDown
                                className="cursor-pointer"
                                onClick={() => setShowSelectedUserDrawer(false)}
                              />
                            ) : (
                              <FaChevronUp
                                className="cursor-pointer"
                                onClick={() => setShowSelectedUserDrawer(true)}
                              />
                            )}
                          </div>

                          <div className="mb-4 flex">
                            <button
                              className={`px-4 py-1 flex-1 cursor-pointer text-sm ${
                                CastTabs === "all-cast"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200"
                              }`}
                              onClick={() => setCastTabs("all-cast")}
                            >
                              Cast
                            </button>
                            <button
                              className={`px-4 py-1 flex-1 cursor-pointer text-sm ${
                                CastTabs === "favorite"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200"
                              }`}
                              onClick={() => setCastTabs("favorite")}
                            >
                              Favourites
                            </button>
                          </div>
                          {(CastTabs == "all-cast"
                            ? form.selectedCast
                            : form.favoriteCharacters
                          )?.map((user) => (
                            <UserCard
                              user={user}
                              buttons={selctedCastCardButtons}
                              btnClasses={classNames(
                                form["favoriteCharacters"].find(
                                  (fav) => fav._id === user._id
                                ) && "text-red-600"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
              :
            <div className="mt-6  top-0 inset-0 z-10 bg-white">
              <label className="block font-medium mb-1">Add Photos</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full"
              />
              <div className="mt-2 grid grid-cols-3 gap-2">
                {photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(photo)}
                    alt="preview"
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>



            }

            
          </div>
        </div>

        {/* Right Form */}

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 bg-white p-6 shadow rounded-md"
        >
          <div className="text-xl mb-3">Info : </div>

          <div className="grid gap-4 mb-4">
            <input
              type="text"
              placeholder="Episode Title"
              className="w-full border px-3 py-2 rounded-md"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <textarea
              placeholder="Content"
              rows={4}
              className="w-full border px-3 py-2 rounded-md"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />

            <textarea
              placeholder="Expectations"
              rows={3}
              className="w-full border px-3 py-2 rounded-md"
              value={form.expectations}
              onChange={(e) =>
                setForm({ ...form, expectations: e.target.value })
              }
            />

            <textarea
              placeholder="Learning"
              rows={3}
              className="w-full border px-3 py-2 rounded-md"
              value={form.learning}
              onChange={(e) => setForm({ ...form, learning: e.target.value })}
            />

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="personal">Personal</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Create Episode
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEpisode;
