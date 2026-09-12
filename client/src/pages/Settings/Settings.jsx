import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import userService from "../../api/userService";
import authService from "../../api/authService";
import Navbar from "../../components/Navbar/Navbar";
import { FaUser, FaLock, FaImage, FaCheckCircle, FaSpinner } from "react-icons/fa";
import "./Settings.css";

function Settings() {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile State
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Avatar State
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [avatarMessage, setAvatarMessage] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMessage("");
    try {
      const data = await userService.updateProfile({ name, email, phone });
      setUser(data.user);
      setProfileMessage("Profile updated successfully!");
    } catch (err) {
      setProfileMessage(err.response?.data?.message || "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMessage("");
    try {
      await authService.updatePassword({ currentPassword, newPassword });
      setPasswordMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordMessage(err.response?.data?.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    if (!avatarFile) return;
    setAvatarLoading(true);
    setAvatarMessage("");
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    try {
      const data = await userService.updateAvatar(formData);
      setUser(data.user);
      setAvatarMessage("Avatar updated successfully!");
    } catch (err) {
      setAvatarMessage(err.response?.data?.message || "Failed to upload avatar. Check Cloudinary settings.");
    } finally {
      setAvatarLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <Navbar />
      <div className="settings-container">
        <div className="settings-sidebar">
          <h2>Settings</h2>
          <ul>
            <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
              <FaUser /> Profile Details
            </li>
            <li className={activeTab === "avatar" ? "active" : ""} onClick={() => setActiveTab("avatar")}>
              <FaImage /> Profile Picture
            </li>
            <li className={activeTab === "password" ? "active" : ""} onClick={() => setActiveTab("password")}>
              <FaLock /> Security
            </li>
          </ul>
        </div>

        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="settings-panel">
              <h3>Profile Details</h3>
              <p>Update your personal information.</p>
              
              {profileMessage && (
                <div className={`settings-alert ${profileMessage.includes("success") ? "success" : "error"}`}>
                  {profileMessage}
                </div>
              )}

              <form onSubmit={handleProfileUpdate}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Phone Number (Optional)</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <button type="submit" disabled={profileLoading} className="save-btn">
                  {profileLoading ? <FaSpinner className="spin" /> : "Save Changes"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "avatar" && (
            <div className="settings-panel">
              <h3>Profile Picture</h3>
              <p>Upload a new profile picture. Note: Requires Cloudinary keys in backend.</p>

              {avatarMessage && (
                <div className={`settings-alert ${avatarMessage.includes("success") ? "success" : "error"}`}>
                  {avatarMessage}
                </div>
              )}

              <form onSubmit={handleAvatarUpload} className="avatar-form">
                <div className="avatar-preview-box">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" />
                  ) : (
                    <div className="avatar-placeholder">{user?.name?.[0] || "U"}</div>
                  )}
                </div>
                <div className="avatar-upload-controls">
                  <input type="file" accept="image/*" onChange={handleAvatarChange} id="avatar-upload" hidden />
                  <label htmlFor="avatar-upload" className="upload-label">Choose Image</label>
                  <button type="submit" disabled={!avatarFile || avatarLoading} className="save-btn">
                    {avatarLoading ? <FaSpinner className="spin" /> : "Upload"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "password" && (
            <div className="settings-panel">
              <h3>Security & Password</h3>
              <p>Ensure your account is using a long, random password to stay secure.</p>

              {passwordMessage && (
                <div className={`settings-alert ${passwordMessage.includes("success") ? "success" : "error"}`}>
                  {passwordMessage}
                </div>
              )}

              <form onSubmit={handlePasswordUpdate}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} />
                </div>
                <button type="submit" disabled={passwordLoading} className="save-btn">
                  {passwordLoading ? <FaSpinner className="spin" /> : "Update Password"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
