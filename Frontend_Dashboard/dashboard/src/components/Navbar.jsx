import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Intern Dashboard</h1>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="hover:underline"
        >
          Dashboard
        </button>

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
