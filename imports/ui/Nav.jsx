import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <div className="nav">
    <NavLink to="/list">List</NavLink>
    <NavLink to="/upload">Upload</NavLink>
  </div>
);

export default Nav;
