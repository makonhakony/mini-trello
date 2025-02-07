import React, { useContext } from 'react';
import { Nav, Navbar, Container, Image } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import Button from 'react-bootstrap/Button';

import styled from 'styled-components';

const TopNavBar = () => {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  const { avatar_url, name } = state.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Mini Trello</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Image src={avatar_url} roundedCircle style={{'maxHeight':'40px', 'width':'auto', 'margin':'0 10px 0 0'}} />
          <ProfileName>{name}</ProfileName>
          <Button variant='primary' onClick={()=> handleLogout()}>Logout</Button>
        </Container>
      </Navbar>
    );
};
const ProfileName = styled.div`
  margin-right: 10px;
`;

export default TopNavBar;
