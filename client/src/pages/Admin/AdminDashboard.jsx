import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import adminService from "../../api/adminService";
import Navbar from "../../components/Navbar/Navbar";
import { FaUsers, FaChartLine, FaSuitcase, FaHome, FaCheckCircle, FaTimesCircle, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "overview") {
          const data = await adminService.getDashboardStats();
          setStats(data.data);
        } else if (activeTab === "users") {
          const data = await adminService.getAllUsers();
          setUsers(data.users);
        }
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, user, navigate]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
    } catch (err) {
      alert("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminService.deleteUser(userId);
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
              <FaChartLine /> Dashboard
            </li>
            <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
              <FaUsers /> Manage Users
            </li>
          </ul>
        </div>

        <div className="admin-content">
          {loading ? (
            <div className="admin-loading">Loading data...</div>
          ) : (
            <>
              {activeTab === "overview" && stats && (
                <div className="admin-overview">
                  <h3>Platform Overview</h3>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon users"><FaUsers /></div>
                      <div className="stat-info">
                        <h4>Total Users</h4>
                        <p>{stats.totalUsers}</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon properties"><FaHome /></div>
                      <div className="stat-info">
                        <h4>Total Properties</h4>
                        <p>{stats.totalProperties}</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon bookings"><FaSuitcase /></div>
                      <div className="stat-info">
                        <h4>Total Bookings</h4>
                        <p>{stats.totalBookings}</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon revenue"><FaChartLine /></div>
                      <div className="stat-info">
                        <h4>Total Revenue</h4>
                        <p>₹{stats.totalRevenue?.toLocaleString() || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "users" && (
                <div className="admin-users">
                  <h3>User Management</h3>
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Joined</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u._id}>
                            <td>
                              <div className="user-cell">
                                <div className="user-avatar-small">{u.name?.[0] || "U"}</div>
                                {u.name}
                              </div>
                            </td>
                            <td>{u.email}</td>
                            <td>
                              <select 
                                value={u.role} 
                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                disabled={u._id === user._id}
                                className={`role-select ${u.role}`}
                              >
                                <option value="user">User</option>
                                <option value="host">Host</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                            <td>
                              <button 
                                className="delete-btn" 
                                onClick={() => handleDeleteUser(u._id)}
                                disabled={u._id === user._id}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
