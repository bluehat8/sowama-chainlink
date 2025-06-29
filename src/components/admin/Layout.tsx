
import { useState, ReactNode } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BarChart2, 
  Settings, 
  Home,
  LogOut
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <Users size={20} />, label: "Usuarios", path: "/admin?tab=users" },
    { icon: <BarChart2 size={20} />, label: "Estadísticas", path: "/admin?tab=stats" },
    { icon: <Settings size={20} />, label: "Configuración", path: "/admin?tab=config" },
    { icon: <Home size={20} />, label: "Volver a App", path: "/" },
  ];

  const handleLogout = () => {
    // En una app real, aquí iría la lógica de logout
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-600">Sowama Admin</h2>
        </div>
        <nav className="flex flex-col flex-1 overflow-y-auto">
          <div className="p-4">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    <span className="mr-3 text-gray-600">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 mt-6 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  <span className="mr-3 text-gray-600"><LogOut size={20} /></span>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Header */}
      <div className="flex flex-col flex-1">
        <header className="bg-white shadow-sm md:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <h2 className="text-lg font-bold text-green-600">Sowama Admin</h2>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 rounded-md hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="px-4 py-2 bg-white border-b border-gray-200">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3 text-gray-600">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 mt-2 text-gray-700 rounded-md hover:bg-gray-100"
                  >
                    <span className="mr-3 text-gray-600"><LogOut size={20} /></span>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};
