import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= FETCH DATA ================= */

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const fetchProfile = async () => {
    const res = await axios.get("http://localhost:5000/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProfile();
  }, []);

  /* ================= TASK ACTIONS ================= */

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTasks();
  };

  const updateTask = async (id) => {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { title: editTitle },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditId(null);
    setEditTitle("");
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Dashboard</h1>

        {/* User Profile */}
        {user && (
          <div className="flex justify-between items-center bg-gray-50 border rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                {user.name?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="border border-red-400 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search task..."
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Add Task */}
        <div className="flex gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Enter task title"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Task Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Task</th>
                <th className="p-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">
                    {editId === task.id ? (
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                      />
                    ) : (
                      task.title
                    )}
                  </td>

                  <td className="p-3 border-b text-center space-x-2">
                    {editId === task.id ? (
                      <button
                        onClick={() => updateTask(task.id)}
                        className="border border-green-400 text-green-600 px-3 py-1 rounded hover:bg-green-50"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditId(task.id);
                          setEditTitle(task.title);
                        }}
                        className="border border-blue-400 text-blue-600 px-3 py-1 rounded hover:bg-blue-50"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="border border-red-400 text-red-500 px-3 py-1 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTasks.length === 0 && (
            <p className="text-center text-gray-400 p-4">No tasks found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
