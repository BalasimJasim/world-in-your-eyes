import React, { useState, useEffect } from 'react';
import './MainNav.css';
import MainHeader from './MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import { AnimatePresence } from 'framer-motion';

const MainNav = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && drawerIsOpen) {
        closeDrawer();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [drawerIsOpen]);

  return (
    <>
      <AnimatePresence>
        {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
        {drawerIsOpen && (
          <SideDrawer onClose={closeDrawer}>
            <nav className="main-navigation__drawer-nav">
              <NavLinks />
            </nav>
          </SideDrawer>
        )}
      </AnimatePresence>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer} aria-label="Open Drawer">
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNav;
