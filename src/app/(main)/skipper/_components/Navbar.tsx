"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSession } from "../../SessionProvider";

const SkipperNavbar = () => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const navItems = [
    { name: "PERMIT", href: "/skipper/permit/new" },
    { name: "APPROVED", href: "/skipper/permit" },
    {
      name: "PROFILE",
      href: "/skipper/profile",
      dropdown: [
        { name: "Web Design", href: "/skipper/web-design" },
        { name: "App Development", href: "/skipper/app-development" },
        { name: "SEO", href: "/skipper/seo" },
      ],
    },
  ];

  if (!session.user) return null;
  if (session.user.role !== "SKIPPER") return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="/skipper" className="flex items-center px-2 py-4">
                <span className="text-lg font-semibold text-gray-500 underline">
                  SKIPPER - {session.user.username}
                </span>
              </a>
            </div>
            <div className="hidden items-center space-x-1 md:flex">
              {navItems.map((item) => (
                <div key={item.name} className="group relative">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={toggleDropdown}
                        className="flex items-center px-2 py-4 font-semibold text-gray-500 transition duration-300 hover:text-green-500"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="px-2 py-4 font-semibold text-gray-500 transition duration-300 hover:text-green-500"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button
              className="mobile-menu-button outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-500" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <React.Fragment key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={toggleDropdown}
                      className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </button>
                    {isDropdownOpen &&
                      item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="ml-4 block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        >
                          {subItem.name}
                        </a>
                      ))}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SkipperNavbar;
