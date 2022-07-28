import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { AiOutlineComment, AiOutlinePoweroff } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";
import Chats from "./Chats";
import Contacts from "./Contacts";
import UserAccountInfo from "../Modals/UserAccountInfo";

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
    <div className="sidebar">
      <Nav className="sidebar-nav d-flex align-items-center position-relative">
        <Nav.Item onClick={() => setModalOpen(true)}>
          <RiAccountCircleFill className="me-5 sidebar-icon" />
        </Nav.Item>

        <div className="d-flex position-absolute end-0">
          <Nav.Item onClick={() => setActiveTab("chats")}>
            <AiOutlineComment className="sidebar-icon" />
          </Nav.Item>

          <Nav.Item onClick={() => setActiveTab("contacts")}>
            <IoIosContacts className="sidebar-icon" />
          </Nav.Item>

          <Nav.Item onClick={logout}>
            <AiOutlinePoweroff className="sidebar-icon" />
          </Nav.Item>
        </div>
      </Nav>

      {activeTab === "chats" ? <Chats /> : <Contacts />}
      <UserAccountInfo closeModal={closeModal} modalOpen={modalOpen} />
    </div>
  );
};

export default Sidebar;
