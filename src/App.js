import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import { initialState, reducer } from "./store/reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import DashboardInfo from './components/DashboardInfo';


export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboardInfo/:dId" element={<DashboardInfo />} />
      </Routes>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;