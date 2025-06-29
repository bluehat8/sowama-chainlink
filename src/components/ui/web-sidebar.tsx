
import { Home, Recycle, ShoppingBag, Leaf, Gift, Settings, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./button";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Recycle, label: "Entrega de Residuos", path: "/waste-delivery" },
    { icon: ShoppingBag, label: "Marketplace", path: "/marketplace" },
    { icon: Gift, label: "Recompensas NFT", path: "/nft-rewards" },
    { icon: Leaf, label: "Impacto Ambiental", path: "/impact" },
    { icon: Settings, label: "Configuración", path: "/settings" },
  ];

  const adminItems = [
    { icon: User, label: "Panel Admin", path: "/admin" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-green-600">Sowama</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  isActive(item.path) 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </div>

        {/* <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Administración
          </div>
          <div className="space-y-1">
            {adminItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    isActive(item.path) 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div> */}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          © 2024 Sowama - Reciclaje Verde
        </div>
      </div>
    </div>
  );
}
