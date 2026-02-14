import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

interface NavbarProps {
  isLoggedIn?: boolean;
  userRole?: 'student' | 'college';
  userName?: string;
}

const Navbar = ({ isLoggedIn = false, userRole, userName }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-primary rounded-lg p-2">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold gradient-text">CampusConnect</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5 text-muted-foreground" /> : <Sun className="h-5 w-5 text-muted-foreground" />}
          </button>
          {!isLoggedIn ? (
            <>
              <Link to="/login/student" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Student Login
              </Link>
              <Link to="/login/college">
                <Button size="sm">College Admin</Button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="font-semibold text-foreground">{userName}</span>
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-border"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <button onClick={toggleTheme} className="flex items-center gap-2 text-sm py-2">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            {!isLoggedIn ? (
              <>
                <Link to="/login/student" className="text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>
                  Student Login
                </Link>
                <Link to="/login/college" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">College Admin</Button>
                </Link>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
