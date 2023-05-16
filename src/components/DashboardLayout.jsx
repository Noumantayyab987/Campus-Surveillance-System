import React, { useState } from 'react';
import { FaBars, FaTh, FaUserAlt, FaRegChartBar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styled, {  } from 'styled-components';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(true); // Add a new function to close the menu

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FaTh /> },
    { path: '/UploadVideoFootage', name: 'Upload Video Footage', icon: <FaUserAlt /> },
    { path: '/addlivecameras', name: 'Add Live Cameras', icon: <FaRegChartBar /> },
    { path: '/logout', name: 'Logout', icon: <FaRegChartBar /> }
  ];

  const handleLogout = () => {
    // Clear cookies or perform any other logout logic
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect to the login page or any other desired page
    window.location.href = '/';
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <LogoWrapper>
        <LogoImage isOpen={isOpen} src="/logo.png" alt="Logo" />
        <ToggleIcon onClick={toggle} />
      </LogoWrapper>
      <MenuList>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            activeClassName="active"
            onClick={closeMenu} // Call the closeMenu function when a menu item is clicked
          >
            <MenuItem>
              <IconWrapper>{item.icon}</IconWrapper>
              <MenuItemText isOpen={isOpen}>{item.name}</MenuItemText>
            </MenuItem>
          </NavLink>
        ))}
        <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Add the logout button */}
      </MenuList>
    </SidebarContainer>
  );
};



const DashboardLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
`;

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background-color: #0d0830;
  color: #fff;
  position: relative;
  z-index: 1;
  overflow-y: auto;
  transition: width 0.3s ease-in-out;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: ${props => (props.isOpen ? '160px' : '60px')};
  height: 40px;
  transition: width 0.3s ease-in-out;
`;

const ToggleIcon = styled(FaBars)`
  font-size: 24px;
  cursor: pointer;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  color:#fff;

  &:hover {
    background-color: #2c2177;
  }

  &.active {
    background-color: #2c2177;
  }
`;

const IconWrapper = styled.div`
  margin-right: 16px;
  font-size: 18px;
`;

const MenuItemText = styled.span`
 font-size: ${props => (props.isOpen ? '16px' : '0px')};
 opacity: ${props => (props.isOpen ? '1' : '0')}; transition: opacity 0.3s ease-in-out, font-size 0.3s ease-in-out;
 `;

const MainContent = styled.div `
flex: 1; height: 100vh;
background: linear-gradient(rgb(255, 255, 255), rgb(0 181 255));



`;

export default DashboardLayout;
