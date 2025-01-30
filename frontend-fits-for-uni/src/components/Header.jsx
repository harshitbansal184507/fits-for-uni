import React, { useEffect, useState } from "react";
import logoAndNameImage from "../assets/logo-and-name.png";

import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayCartItem from "./DisplayCartItem";
import ThemeToggle from "./ThemeToggle";


const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();
  const [openCartSection, setOpenCartSection] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shadow-lg before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.8),transparent)] before:z-0 ">
      <div className="h-28 lg:h-32 flex flex-col justify-center relative dark:bg-gray-700">
        {!(isSearchPage && isMobile) && (
          <div className="container mx-auto flex items-center px-6 justify-between relative z-10">
            {/* Logo and name */}
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <img
                  src={logoAndNameImage}
                  alt="Logo and Name"
                  className="h-20 lg:h-24 w-auto transition-transform hover:scale-105 drop-shadow-lg"
                />
              </Link>
            </div>

            {/* Search */}
            <div className="hidden lg:block flex-grow max-w-2xl mx-8">
              <Search />
            </div>

            {/* Login and Cart */}
            <div className="flex items-center gap-4">
              {/* Mobile User Icon */}
              <button
                className="text-red-800 hover:text-red-600 transition-colors lg:hidden"
                onClick={handleMobileUser}
              >
                <FaRegCircleUser size={28} />
              </button>
              <ThemeToggle />

              

              {/* Desktop */}
              <div className="hidden lg:flex items-center gap-6 ">
                {user?._id ? (
                  <div className="relative ">
                    <div
                      onClick={() => setOpenUserMenu((prev) => !prev)}
                      className="flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-lg hover:bg-white/50 transition-all duration-300 dark:bg-red-900"
                    >
                      <p className="text-gray-800 font-medium dark:text-white ">Account</p>
                      {openUserMenu ? (
                        <GoTriangleUp size={20} className="text-gray-600 dark:bg-white" />
                      ) : (
                        <GoTriangleDown size={20} className="text-gray-600 dark:bg-white" />
                      )}
                    </div>
                    {openUserMenu && (
                      <div className="absolute right-0 top-12">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 min-w-56 border border-gray-100  dark:bg-gray-700 dark:text-white">
                          <UserMenu close={handleCloseUserMenu} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={redirectToLoginPage}
                    className="text-base px-6 py-3 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Login
                  </button>
                )}
                <button
                  onClick={() => setOpenCartSection(true)}
                  className="flex items-center gap-3 bg-gray-800/90 backdrop-blur-sm hover:bg-gray-700 px-5 py-3 rounded-lg text-white transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  <div className="relative">
                    <BsCart4 size={24} className="transform hover:scale-110 transition-transform" />
                    {totalQty > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {totalQty}
                      </span>
                    )}
                  </div>
                  <div className="font-medium">
                    {cartItem[0] ? (
                      <div>
                        <p className="text-sm">{totalQty} Items</p>
                      </div>
                    ) : (
                      <p>My Cart</p>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-6 lg:hidden mt-2 relative z-10">
          <Search />
        </div>
      </div>

      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
};

export default Header;