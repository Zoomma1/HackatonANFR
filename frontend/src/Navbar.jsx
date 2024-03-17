import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from './Logo-ANFR.svg'; // Import your image here
function NavScrollExample() {
    const navigate = useNavigate();
    const location = useLocation();
    const onclick = () => {
        navigate("/CheckValidity");
    };
    const navigateToNewPage = () => {
        navigate("/ValidationPage"); // replace "/ValidationPage" with the route of your Validation Page
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Frequency Board</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Button className="Go_Innit" onClick={() => navigate("/init")}>
                            Home
                        </Button>
                        <Button className="Go_Innit" onClick={() => navigate("/Validation")}>
                            Validation
                        </Button>
                        {location.pathname !== "/init" && (
                            <Button className="check-frequency-button" onClick={onclick}>
                                Check if frequency is available
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand href="#">
                    <img src={logo} alt="Logo" style={{width: '100px'}} /> {}
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;