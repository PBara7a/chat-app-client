import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { AiOutlineComment, AiOutlinePoweroff } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoIosContacts } from "react-icons/io";
import Chats from "./Chats";
import Contacts from "./Contacts";
import AccountInfo from "../AccountInfo";

const icons = {
  color: "#fff",
  fontSize: "1.4rem",
  margin: "0 0.5rem",
  cursor: "pointer",
};

const Sidebar = ({ id }) => {
  const [activeTab, setActiveTab] = useState();

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "");
    navigate("../", { replace: true });
  };

  return (
    <div className="sidebar" style={{ height: "95vh", width: "100%" }}>
      <Nav className="sidebar-nav d-flex align-items-center position-relative">
        <Nav.Item
          className="position-absolute start-0"
          onClick={() => setActiveTab("account")}
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

      {activeTab === "chats" ? (
        <Chats />
      ) : activeTab === "contacts" ? (
        <Contacts />
      ) : (
        <AccountInfo />
      )}
    </div>
  );
};

export default Sidebar;
