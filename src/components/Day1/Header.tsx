import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { ProductContext } from '../Day9/ProductWrapper';
import { Badge } from 'antd';

type Props = {
  openTab: number
}

const Header = (props: Props) => {
  const productContext = useContext(ProductContext);
  const [productCountOfCart, setProductCountOfCart] = useState<number>();
  useEffect(() => {
    setProductCountOfCart(productContext?.AllCartProducts.length);
  }, [productContext?.AllCartProducts])

  const { pathname } = useLocation();

  useEffect(()=>{
    switch(pathname){
      case '/day9':
        setActive('default');
        break;
      case '/day9/productListing':
        setActive('listing');
        break;
      case '/day9/addToCart':
        setActive('cart');
        break;
      default:
        setActive('default');
        break;
    }
  })

  const [active, setActive] = useState<string>('default');

  const clearToken = () => {
    localStorage.removeItem("accessToken")
  }
  return (
    <Navbar collapseOnSelect expand="lg" id="nav" fixed="top" >
      <Container>
        <Navbar.Brand href="#home">
          <Image src="/satva-logo1.png" alt="company logo" id="satvaLogo" fluid />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
          {props.openTab == 1 &&
            <Nav activeKey={active} variant="pills" onSelect={(selectedKey) => setActive(selectedKey ? selectedKey : '')}>
              <Nav.Item>
                <Nav.Link as={Link} to="/day1" eventKey="default">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/day2/aboutUs" eventKey="aboutUs">About Us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/day2/contactUs" eventKey="contactUs">Contact Us</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/" eventKey="logout" onClick={clearToken}>Logout</Nav.Link>
              </Nav.Item>
              {/* <Link to="/day1" className="navbarButtons links-decor">Home</Link>
              <Link to="/day2/aboutUs" className="navbarButtons links-decor">About Us</Link>
              <Link to="/day2/contactUs" className="navbarButtons links-decor">Contact Us</Link>
              <Link to="/" className="navbarButtons links-decor">Logout</Link> */}
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>
                <Nav.Link as={Link} to="/day1" eventKey="day1">Day 1</Nav.Link>
                  {/* <Link to="/day1">Day 1</Link> */}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/day2" eventKey="day2">Day 2</Nav.Link>
                  {/* <Link to="/day2" >Day 2</Link> */}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/day3" eventKey="day3">Day 3</Nav.Link>
                  {/* <Link to="/day3" >Day 3</Link> */}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/day4_7_8" eventKey="day4_7_8">Day 4_7_8</Nav.Link>
                  {/* <Link to="/day4_7_8" >Day 4_7_8</Link> */}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/day5_6" eventKey="day5_6">Day 5_6</Nav.Link>
                  {/* <Link to="/day5_6" >Day 5_6</Link> */}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/day9" eventKey="day9">Day 9</Nav.Link>
                  {/* <Link to="/day9" >Day 9</Link> */}
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Nav.Link as={Link} to="/day10" eventKey="day10">Day 10</Nav.Link>
                  {/* <Link to="/day9" >Day 9</Link> */}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          } 
          {props.openTab == 9 &&
            <Nav activeKey={active} variant="pills" onSelect={(selectedKey) => setActive(selectedKey ? selectedKey : '')}>
              <Nav.Item>
                <Nav.Link as={Link} to="/" eventKey="home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/day9" eventKey="default">Add Product</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/day9/productListing" eventKey="listing">Listing</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/day9/addToCart" eventKey="cart">
                  <Badge count={productCountOfCart}>
                    <ShoppingCartOutlined style= {active == 'cart' ? { fontSize: '20px', color:'white' } : { fontSize: '20px' }}  />
                  </Badge>
                </Nav.Link>
              </Nav.Item>
              {/* <Link to="/" eventKey="default" className="navbarButtons links-decor">Home</Link> */}
              {/* <Link to="/day9" className="navbarButtons links-decor">Add Product</Link>
              <Link to="/day9/productListing" className="navbarButtons links-decor">Listing</Link>
              <Link to="/day9/addToCart" className="navbarButtons links-decor">
                <Badge count={productCountOfCart}>
                  <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                </Badge>
              </Link> */}
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header