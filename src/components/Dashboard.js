import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./dashboard.css";

const Dashboard = ({ id }) => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Dashboard;
