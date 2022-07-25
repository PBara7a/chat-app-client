import Chat from "./Main/Chat";
import Sidebar from "./Sidebar/Sidebar";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Dashboard;
