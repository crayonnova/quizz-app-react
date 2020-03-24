import React from 'react';

import {  Link } from 'react-router-dom'
import {Navbar,Nav} from 'react-bootstrap';
import {auth} from './../../firebase/util';
import logo from  '../../images/logo.svg';
import { NotificationManager } from 'react-notifications'

import './header.style.css';

const Header = ({currentUser}) => {
    console.log("user in Header componet--> ",currentUser);
  
    return (
        <div className='qz-box'>
            <Navbar collapseOnSelect expand="lg">
                <Navbar.Brand href="#home"> <img src={logo} width="130px" alt=""/> </Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                    <Nav className="mr-auto">
                    <Link className='nav-link' to='/welcome'>home</Link>
                    <Link className='nav-link' to='/learn'>learn</Link>
                    
                    </Nav>
                    <Nav className='ml-md-auto'>
                    {
                        
                        currentUser ? (<Link className='nav-link' onClick={ () => { auth.signOut(); NotificationManager.success('Sign out successfuly!','Sign Out',2000) }} to='home' >Log out</Link>) : 
                        (<Link className='nav-link' to='/login'>login</Link>)
                    }
                    

                    <Nav.Link href="#link">[ i ]</Nav.Link>
                    </Nav>
                {/* </Navbar.Collapse> */}
                </Navbar>
                
        </div>
    );
}

export default Header;
