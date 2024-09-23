"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useSession } from "../../SessionProvider";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

const AdminNavbar: React.FC = () => {
  const session = useSession() as Session;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navItems: NavItem[] = [
    { name: "PENDING APPROVAL", href: "/admin/permit/update" },
    {
      name: "USERS",
      href: "#",
      dropdown: [
        { name: "SKIPPERS", href: "/admin/skipper-table" },
        { name: "DRIVERS", href: "/admin/driver-table" },
        { name: "MONITORS", href: "/admin/monitor-table" },
        { name: "ADMINS", href: "/admin/admin-table" },
      ],
    },
    { name: "PROFILE", href: "/admin/profile" },
  ];

  const isActive = (href: string): boolean => pathname === href;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  if (!session.user || session.user.role !== "ADMIN") return null;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/skipper" className="flex items-center space-x-2">
              <User className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">
                {session.user.username}
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 hover:text-white"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`block px-4 py-2 text-sm ${
                                  isActive(subItem.href)
                                    ? "bg-blue-100 text-blue-900"
                                    : "text-gray-700 hover:bg-blue-50"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        isActive(item.href)
                          ? "bg-blue-900 text-white"
                          : "text-blue-100 hover:bg-blue-700 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-blue-100 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-white hover:bg-blue-700 hover:text-white"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-4 space-y-1"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${
                                  isActive(subItem.href)
                                    ? "bg-blue-900 text-white"
                                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block rounded-md px-3 py-2 text-base font-medium ${
                        isActive(item.href)
                          ? "bg-blue-900 text-white"
                          : "text-blue-100 hover:bg-blue-700 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AdminNavbar;
