import React, { Fragment } from 'react'
import { Container, NavItem, NavbarBrand } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
		<NavbarBrand className=''>
			<Link to='account' style={linkStyle}>
				Account
			</Link>
		</NavbarBrand>
		<NavbarBrand>
			<Link className='ms-3' to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</NavbarBrand>
	</>
)

const unauthenticatedOptions = (
	<>
		
        <Nav.Item className=''>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='ms-3'>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='dark' variant='dark' expand='md' className="d-flex justify-content-between">
		<Navbar.Brand className='ms-4'>
            <Link to='/create-character' style={linkStyle}>
                Create Character
            </Link>
		</Navbar.Brand>
		<Navbar.Brand>
			<Link className='ms-4' to='/character-list' style={linkStyle}>
                My Characters
            </Link>
        </Navbar.Brand>
		<NavbarBrand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					{user ? authenticatedOptions : unauthenticatedOptions}
				</Nav>
			</Navbar.Collapse>
		</NavbarBrand>
	</Navbar>
)

export default Header
