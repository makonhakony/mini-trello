import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import Button from 'react-bootstrap/Button';

import styled from 'styled-components';

const TopNavBar = () => {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  const { avatar_url, name, public_repos, followers, following } = state.user

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
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
