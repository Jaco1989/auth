"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSession } from "../../SessionProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  name: string;
  href: string;
  dropdown?: NavItem[];
}

interface User {
  role: string;
  username: string;
}

interface Session {
  user: User | null;
}

const SkipperNavbar: React.FC = () => {
  const session = useSession() as Session;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const navItems: NavItem[] = [
    { name: "PERMIT", href: "/skipper/permit/new" },
    { name: "AWAIT APPROVAL", href: "/skipper/permit" },
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

  const isActive = (href: string): boolean => pathname === href;

  if (!session.user) return null;
  if (session.user.role !== "SKIPPER") return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/skipper" className="flex items-center px-2 py-4">
                <span className="text-lg font-semibold text-gray-500 underline">
                  SKIPPER - {session.user.username}
                </span>
              </Link>
            </div>
            <div className="hidden items-center space-x-1 md:flex">
              {navItems.map((item) => (
                <div key={item.name} className="group relative">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={toggleDropdown}
                        className={`flex items-center px-2 py-4 font-semibold transition duration-300 ${
                          isActive(item.href)
                            ? "text-green-500"
                            : "text-gray-500 hover:text-green-500"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm ${
                                isActive(subItem.href)
                                  ? "bg-gray-100 text-green-500"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-2 py-4 font-semibold transition duration-300 ${
                        isActive(item.href)
                          ? "text-green-500"
                          : "text-gray-500 hover:text-green-500"
                      }`}
                    >
                      {item.name}
                    </Link>
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
                      className={`block w-full rounded-md px-3 py-2 text-left text-base font-medium ${
                        isActive(item.href)
                          ? "bg-gray-50 text-green-500"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {item.name}
                    </button>
                    {isDropdownOpen &&
                      item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`ml-4 block rounded-md px-3 py-2 text-base font-medium ${
                            isActive(subItem.href)
                              ? "bg-gray-50 text-green-500"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium ${
                      isActive(item.href)
                        ? "bg-gray-50 text-green-500"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
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
