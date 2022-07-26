import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { AiOutlineComment, AiOutlinePoweroff } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";
import Chats from "./Chats";
import Contacts from "./Contacts";
import UserAccountInfo from "../Modals/UserAccountInfo";

const icons = {
  color: "#fff",
  fontSize: "1.4rem",
  margin: "0 0.5rem",
  cursor: "pointer",
};

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("chats");
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => setModalOpen(false);

  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "");
    localStorage.setItem("userId", "");
    navigate("../login", { replace: true });
  };

  return (
    <div className="sidebar" style={{ height: "95vh", width: "100%" }}>
      <Nav className="sidebar-nav d-flex align-items-center position-relative">
        <Nav.Item
          className="position-absolute start-0"
          onClick={() => setModalOpen(true)}
        >
          <RiAccountCircleFill className="me-5" style={icons} />
        </Nav.Item>

        <div className="d-flex position-absolute end-0">
          <Nav.Item onClick={() => setActiveTab("chats")}>
            <AiOutlineComment style={icons} />
          </Nav.Item>

          <Nav.Item onClick={() => setActiveTab("contacts")}>
            <IoIosContacts style={icons} />
          </Nav.Item>

          <Nav.Item onClick={logout}>
            <AiOutlinePoweroff style={icons} />
          </Nav.Item>
        </div>
      </Nav>

      {activeTab === "chats" ? <Chats /> : <Contacts />}
      <UserAccountInfo closeModal={closeModal} modalOpen={modalOpen} />
    </div>
  );
};

export default Sidebar;
