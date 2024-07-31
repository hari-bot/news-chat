import React, { useState } from "react";
import News from "../components/News";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { faPencilAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { updateBio } from "../redux/features/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const email = useSelector((state) => state.user.email);
  const description = useSelector((state) => state.user.description);

  const [user, setUser] = useState({
    username: userName,
    email,
    bio: description,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/users/update-bio",
        { newBio: bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({ ...user, bio: response.data.description });
      dispatch(updateBio(response.data.description));
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update bio:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ProfileInfo
            user={user}
            isEditing={isEditing}
            bio={bio}
            handleBioChange={handleBioChange}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Saved Articles</h2>
            <News type="saved" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInfo = ({
  user,
  isEditing,
  bio,
  handleBioChange,
  handleEditClick,
  handleSaveClick,
}) => (
  <div className="flex flex-col items-center p-6 border-b">
    <img
      src={`https://via.placeholder.com/170?text=${user.username}`}
      alt={user.username}
      className="w-24 h-24 rounded-full object-cover"
    />
    <div className="text-center mt-4">
      <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
      <p className="text-gray-600">{user.email}</p>
      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={bio}
            onChange={handleBioChange}
            className="w-full p-2 h-24 border rounded-lg"
          />
        </div>
      ) : (
        <p className="text-gray-500 mt-2">{user.bio}</p>
      )}
    </div>
    <button
      onClick={isEditing ? handleSaveClick : handleEditClick}
      className="mt-2 px-4 py-2 text-gray-800 rounded-lg hover:bg-gray-300"
    >
      <FontAwesomeIcon icon={isEditing ? faCheck : faPencilAlt} />
    </button>
  </div>
);

export default ProfilePage;
