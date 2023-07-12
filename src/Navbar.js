import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from './cswglogo.png';
import './index.css'


const NavBar = () => {
    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Container className={'nav'}>
                        <Navbar.Brand href="/"><img src={image} style={{ height: 100, width: 100 }} alt="Logo" /></Navbar.Brand>
                        <Navbar.Brand href="/" style={{ fontSize: 50 }}><b>Order Entry </b></Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/" style={{ color: 'white', border: 'double', margin: 10 }}> Home   </Nav.Link>
                            <Nav.Link href="/product" style={{ color: 'white', border: 'double', margin: 10 }}>  Inventory</Nav.Link>
                            <Nav.Link href="/promotion" style={{ color: 'white', border: 'double', margin: 10 }}>  Promotion </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default NavBar;
