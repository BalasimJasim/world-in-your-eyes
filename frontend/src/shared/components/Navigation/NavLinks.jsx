import React, { useContext } from 'react';

import "./NavLinks.css";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User, MapPin, PlusSquare } from 'lucide-react';
import { AuthContext } from "../../context/AuthContext";


const NavLinks = () => {
  const auth = useContext(AuthContext);

  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="main-navigation">
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="nav-link">
            All Users
          </NavLink>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <NavLink to={`/${auth.userId}/places`} className="nav-link">
                <MapPin className="icon" />
                My Places
              </NavLink>
            </li>
            <li>
              <NavLink to="/places/new" className="nav-link">
                <PlusSquare className="icon" />
                Add Place
              </NavLink>
            </li>
            <li>
              <button onClick={logout} className="nav-button">
                <LogOut className="icon" />
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/auth" className="nav-link">
              <User className="icon" />
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavLinks;