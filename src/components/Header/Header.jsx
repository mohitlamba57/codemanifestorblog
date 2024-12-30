import React, { useEffect, useState } from "react";
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "Home - Mega Blog";
        break;
      case "/login":
        document.title = "Login - Mega Blog";
        break;
      case "/signup":
        document.title = "Signup - Mega Blog";
        break;
      case "/add-post":
        document.title = "Add Post - Mega Blog";
        break;
      default:
        document.title = "Mega Blog";
        break;
    }
  }, [location]);
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !isAuthenticated,
    },
    {
      name: "SignUp",
      path: "/signup",
      active: !isAuthenticated,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: isAuthenticated,
    },
    {
      name: "My Posts",
      path: "/my-posts",
      active: isAuthenticated,
    },
  ];
  return (
    <header className="py-4 my-auto mt-0 shadow bg-[#1A2130]">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/" className="flex">
              <Logo width="200" />
              <div className="text-left mx-5">
                <h1 className=" text-[#FDFFE2] text-xl font-bold">Code Manifestor</h1>
                <p className="text-gray-200">
                  A Production level blog website built using React
                </p>
              </div>
            </Link>
          </div>
          <ul className="flex ml-auto my-auto text-[#FDFFE2]">
            {navItems.map(
              (navItem) =>
                navItem.active && (
                  <li
                    key={navItem.name}
                    onClick={() => navigate(navItem.path)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-gray-600 rounded-xl"
                  >
                    {navItem.name}
                  </li>
                )
            )}
            {isAuthenticated && (
              <li>
                <LogoutBtn />
              </li>
            )}
            
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
