import React from "react";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode";
import { useAuth } from "../../context/AuthContext";

const NavLinks = [
  {
    id: 1,
    name: "Home",
    link: "#home",
  },
  {
    id: 2,
    name: "Features",
    link: "#features",
  },
  {
    id: 3,
    name: "Analytics",
    link: "#explore",
  },
  {
    id: 4,
    name: "Contact",
    link: "#contact",
  },
  {
    id: 5,
    name: "Dashboard",
    link: "/dashboard",
    isRoute: true,
  },
];
const Navbar = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [active, setActive] = React.useState('home');
  const toggleMenu = () => setShowMenu(!showMenu);
  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sectionIds = ["home", "features", "explore", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);


  const onNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#','');
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };
  return (
    <div className={`fixed top-0 left-0 right-0 z-[9999] text-black dark:text-white duration-300 bg-white/60 dark:bg-dark/60 backdrop-blur ${isScrolled ? 'border-b border-neutral-200/60 dark:border-white/10 shadow-sm' : ''}`}>
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          {/* logo section */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl brand-gradient grid place-items-center text-white font-bold text-lg shadow-md">
              SM
            </div>
            <p className="text-3xl">
              SUB <span className="font-bold">MANAGER</span>
            </p>
          </div>
          {/* Desktop Menu section */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NavLinks.map(({ id, name, link, isRoute }) => {
                return (
                  <li key={id} className="py-4">
                    {isRoute ? (
                      <Link
                        to={link}
                        className="text-xl font-semibold py-2 transition-colors duration-500 hover:text-primary hover:underline hover:underline-offset-4"
                      >
                        {name}
                      </Link>
                    ) : (
                      <a
                        href={link}
                        onClick={(e) => onNavClick(e, link)}
                        className={`text-xl font-semibold py-2 transition-colors duration-500 ${active === link.replace('#','') ? 'text-primary' : 'hover:text-primary'}`}
                      >
                        {name}
                      </a>
                    )}
                  </li>
                );
              })}
              {/* Darkmode feature */}
              <DarkMode />
              {user ? (
                <>
                  <li className="py-4">
                    <span className="text-sm opacity-80">{user.displayName || user.email}</span>
                  </li>
                  <li>
                    <button onClick={logout} className="px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">Logout</button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="px-4 py-2 rounded-full bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">Sign In</Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Mobile View Sidebar */}
          <div className="md:hidden block">
            <div className="flex items-center gap-4">
              <DarkMode />
              {showMenu ? (
                <HiMenuAlt1
                  onClick={toggleMenu}
                  className="cursor-pointer "
                  size={30}
                />
              ) : (
                <HiMenuAlt3
                  onClick={toggleMenu}
                  className="cursor-pointer "
                  size={30}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="container py-4">
              <ul className="space-y-4">
                {NavLinks.map(({ id, name, link, isRoute }) => {
                  return (
                    <li key={id}>
                      {isRoute ? (
                        <Link
                          to={link}
                          onClick={toggleMenu}
                          className="block text-lg font-semibold py-2 transition-colors duration-500 hover:text-primary hover:underline hover:underline-offset-4"
                        >
                          {name}
                        </Link>
                      ) : (
                        <a
                          href={link}
                          onClick={(e) => {
                            onNavClick(e, link);
                            toggleMenu();
                          }}
                          className={`block text-lg font-semibold py-2 transition-colors duration-500 ${active === link.replace('#','') ? 'text-primary' : 'hover:text-primary'}`}
                        >
                          {name}
                        </a>
                      )}
                    </li>
                  );
                })}
                {user ? (
                  <>
                    <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm opacity-80">{user.displayName || user.email}</span>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          logout();
                          toggleMenu();
                        }} 
                        className="w-full text-left px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link 
                      to="/login" 
                      onClick={toggleMenu}
                      className="block px-4 py-2 rounded-full bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 text-center"
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
