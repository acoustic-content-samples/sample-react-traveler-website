/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

import { navRoutes, home, destination } from 'router/routes';
import { getLastItemInPath } from 'utils/helpers';
import { useFetchElements } from 'utils/hooks';
import { pagesIds } from 'api/content';
import TravelerLogo from 'assets/images/traveler-logo.svg';
import SearchIcon from 'assets/images/ic-search.svg';
import MenuIcon from 'assets/images/ic-menu.svg';
import styles from './styles.module.scss';
import './active-nav-link.scss';

const useStyles = makeStyles({
  list: {
    width: 250,
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '10%',
  },
  sidebarNavLink: {
    padding: '5% 10%',
    textDecoration: 'none',
    color: '#757575',
  },
  fullList: {
    width: 'auto',
  },
  textButton: {
    textTransform: 'none',
  },
  destinationNavLinkActive: {
    borderRadius: '5px',
    backgroundColor: 'gainsboro',
  },
});

const NavBar = ({ handleSearchOpen }) => {
  const history = useHistory();
  const matchesMobile = useMediaQuery('(max-width:767px)');
  const classes = useStyles();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(null);
  const elements = useFetchElements(pagesIds.destination);
  const categories = elements?.regionList?.categories ?? [];
  const regions = categories.map(getLastItemInPath) ?? [];
  const subMenuAnchorRef = React.useRef(null);

  const handleClose = () => {
    setIsSubmenuOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setIsSubmenuOpen(false);
    }
  }

  const handleLogoClick = () => {
    history.push(home.path);
  };

  const handleEnterKeyDown = method => event => {
    if (event.key === 'Enter') {
      method();
    }
  };

  const renderNav = () =>
    navRoutes.map(({ path, name, exact }) => {
      let className = '';
      if (matchesMobile) {
        className = `${className} ${classes.sidebarNavLink}`;
      }
      if (path === destination.path && isSubmenuOpen) {
        className = `${className} ${classes.destinationNavLinkActive}`;
      }
      return (
        <NavLink
          to={path}
          key={name}
          exact={exact}
          onClick={handleClose}
          activeClassName="active-nav-link"
          className={className}
          {...(path === destination.path && {
            onMouseEnter: () => setIsSubmenuOpen(true),
            onMouseLeave: handleClose,
            ref: subMenuAnchorRef,
          })}
        >
          {name}
        </NavLink>
      );
    });

  const renderSubMenu = () => (
    <Popper
      open={isSubmenuOpen}
      anchorEl={subMenuAnchorRef.current}
      role={undefined}
      transition
      disablePortal
      onMouseLeave={handleClose}
      onMouseEnter={() => setIsSubmenuOpen(true)}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={isSubmenuOpen}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                {regions.map(regionName => (
                  <NavLink
                    key={regionName}
                    className={styles.subMenuNavLink}
                    onClick={handleClose}
                    tabIndex="0"
                    onKeyDown={handleEnterKeyDown(handleClose)}
                    to={`${destination.path}/${regionName}`}
                  >
                    {regionName}
                  </NavLink>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  const renderDefault = () => (
    <>
      <img
        src={TravelerLogo}
        alt="website logo"
        onClick={handleLogoClick}
        tabIndex="0"
        onKeyDown={handleEnterKeyDown(handleLogoClick)}
      />
      <nav>
        {renderNav()}
        <div
          className={styles.searchIcon}
          tabIndex="0"
          onKeyDown={handleEnterKeyDown(handleSearchOpen)}
        >
          <img src={SearchIcon} alt="search icon" onClick={handleSearchOpen} />
        </div>
      </nav>
      {isSubmenuOpen && renderSubMenu()}
    </>
  );

  const toggleSidebar = isOpen => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsSidebarOpen(isOpen);
  };

  const renderSideBar = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleSidebar(false)}
      onKeyDown={toggleSidebar(false)}
    >
      {renderNav()}
    </div>
  );

  const renderMobile = () => (
    <>
      <img src={MenuIcon} alt="menu icon" onClick={toggleSidebar(true)} />
      <img
        src={TravelerLogo}
        alt="website logo"
        onClick={handleLogoClick}
        tabIndex="0"
        onKeyDown={handleEnterKeyDown(handleLogoClick)}
      />
      <img
        src={SearchIcon}
        alt="search icon"
        onClick={handleSearchOpen}
        tabIndex="0"
        onKeyDown={handleEnterKeyDown(handleSearchOpen)}
      />
      <Drawer open={isSidebarOpen} onClose={toggleSidebar(false)}>
        {renderSideBar()}
      </Drawer>
    </>
  );

  return matchesMobile ? renderMobile() : renderDefault();
};

export default NavBar;
