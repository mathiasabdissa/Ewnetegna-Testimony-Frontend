import axios from 'axios';
import React, { useContext, useState } from 'react'
import SideBar from '../../components/sidebar/sideBar'
import api from '../../config/api';
import { Context } from '../../context/Context';
import { errorNotification, successNotification } from '../../utils/notifications';
import './setting.css'
export default function Setting() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            data.append("upload_preset", "upload");
            try {
                const profileUpload = await axios.post("https://api.cloudinary.com/v1_1/ramjet-it-solution/image/upload", data);
                const { url } = profileUpload.data;
                updatedUser.profilePic = url;
                console.log(updatedUser.profilePic)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            const res = await api.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            successNotification("Successfully Updated")
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
            errorNotification("Unable to update")
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="flex p-2 mx-auto mt-4 text-white bg-blue-400 border-none rounded-3xl hover:bg-blue-300" type="submit">
                        Update
                    </button>
                    {success && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated...
                        </span>
                    )}
                </form>
            </div>
            <SideBar />
        </div>
    );
}