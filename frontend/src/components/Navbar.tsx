
// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
// import Logo from './Logo';
// import { cn } from '@/lib/utils';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const routes = [
//     { path: '/', label: 'Home' },
//     { path: '/teams', label: 'Teams' },
//     { path: '/judge-panel', label: 'Judge Panel' },
//     { path: '/attendee-feedback', label: 'Feedback' },
//     { path: '/admin-dashboard', label: 'Admin' },
//   ];

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="w-full fixed top-0 z-50 glass-card">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0">
//               <Logo />
//             </Link>
//           </div>
          
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-center space-x-4">
//               {routes.map((route) => (
//                 <Link
//                   key={route.path}
//                   to={route.path}
//                   className={cn(
//                     "px-3 py-2 rounded-md text-sm font-medium transition-all",
//                     location.pathname === route.path
//                       ? "text-primary font-semibold"
//                       : "text-muted-foreground hover:text-primary hover:bg-secondary"
//                   )}
//                 >
//                   {route.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
          
//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary focus:outline-none"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isMenuOpen ? (
//                 <X className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden glass-card animate-fade-in">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             {routes.map((route) => (
//               <Link
//                 key={route.path}
//                 to={route.path}
//                 className={cn(
//                   "block px-3 py-2 rounded-md text-base font-medium",
//                   location.pathname === route.path
//                     ? "text-primary bg-secondary/50 font-semibold"
//                     : "text-muted-foreground hover:text-primary hover:bg-secondary"
//                 )}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {route.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/teams', label: 'Teams' },
    { path: '/judge-panel', label: 'Judge Panel' },
    { path: '/attendee-feedback', label: 'Feedback' },
    { path: '/admin-dashboard', label: 'Admin' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    location.pathname === route.path
                      ? "text-black font-semibold bg-gray-200"
                      : "text-black hover:text-white hover:bg-slate-800 "
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-blue-700 focus:outline-none transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6 text-white" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6 text-white" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy-900 text-white absolute inset-0 flex flex-col items-center justify-center animate-fade-in">
          <div className="space-y-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "block text-lg font-semibold px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-300",
                  location.pathname === route.path
                    ? "text-white bg-blue-600"
                    : "text-gray-300 hover:text-white"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
  
export default Navbar;
