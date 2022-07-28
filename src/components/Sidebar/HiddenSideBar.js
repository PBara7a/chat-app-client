import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chats from "./Chats";
import Contacts from "./Contacts";
import { RiAccountCircleFill } from "react-icons/ri";
import { AiOutlineComment, AiOutlinePoweroff } from "react-icons/ai";
import { IoIosContacts } from "react-icons/io";
import UserAccountInfo from "../Modals/UserAccountInfo";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Offcanvas,
} from "react-bootstrap";

const HiddenSideBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chats");

  const navigate = useNavigate();

  const closeModal = () => setModalOpen(false);

  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem(process.env.REACT_APP_USER_TOKEN, "");
    localStorage.setItem("userId", "");
    navigate("../login", { replace: true });
  };

  return (
    <div className="sidebar-toggle">
      <Navbar expand="false">
        <Navbar.Toggle />
        <Container fluid>
          <Navbar.Offcanvas
            placement="start"
            style={{ backgroundColor: "#111b21" }}
          >
            <Offcanvas.Header closeButton>
              <NavDropdown title="Menu" bg="dark" className="ms-3">
                <NavDropdown.Item
                  onClick={() => setModalOpen(true)}
                  className="mb-3"
                >
                  <RiAccountCircleFill className="sidebar-hidden-icon" />
                  Account details
                </NavDropdown.Item>

                <NavDropdown.Item onClick={logout} className="mb-3">
                  <AiOutlinePoweroff className="sidebar-hidden-icon" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav>
                <Nav.Item
                  onClick={() => setActiveTab("chats")}
                  className="mb-3 menu-li"
                >
                  <AiOutlineComment className="sidebar-hidden-icon" />
                  Chats
                </Nav.Item>

                <Nav.Item
                  onClick={() => setActiveTab("contacts")}
                  className="mb-3 menu-li"
                >
                  <IoIosContacts className="sidebar-hidden-icon" />
                  Contacts
                </Nav.Item>
              </Nav>

              {activeTab === "chats" ? <Chats /> : <Contacts />}
              <UserAccountInfo closeModal={closeModal} modalOpen={modalOpen} />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default HiddenSideBar;
