
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Gift, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { WebLayout } from "@/components/ui/web-layout";
import { currentUser } from "@/services/dataService";
import blockchainService from "@/services/blockchainService";
import { Activity as ActivityType } from "@/lib/types";

export default function Dashboard() {
  const [user, setUser] = useState(currentUser);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Initialize wallet silently
        await blockchainService.initializeWallet(user.id);
        
        // Get points from blockchain
        const points = await blockchainService.getUserPoints(user.id);
        setUser(prev => ({ ...prev, points }));
        
        // Get activity from blockchain transactions
        const activities = await blockchainService.getUserActivity(user.id);
        setActivities(activities);
      } catch (error) {
        console.error("Error loading dashboard data", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Define activity type styles
  const activityStyles = {
    delivery: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
    },
    redeem: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
    },
    donation: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-800",
    },
  };

  return (
    <WebLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Bienvenido de vuelta, {user.name}. Aquí tienes un resumen de tu actividad.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Puntos Totales</CardTitle>
              <Leaf className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{user.points.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Disponibles para canjear
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entregas Este Mes</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-xs text-muted-foreground">
                +2 desde la semana pasada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Evitado</CardTitle>
              <Leaf className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">24.5 kg</div>
              <p className="text-xs text-muted-foreground">
                Este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Canjes Realizados</CardTitle>
              <Gift className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">3</div>
              <p className="text-xs text-muted-foreground">
                Este mes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/waste-delivery">
            <Button className="w-full h-20 bg-green-600 hover:bg-green-700 text-white flex flex-col gap-2">
              <Leaf className="h-6 w-6" />
              <span>Entregar Residuos</span>
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white flex flex-col gap-2">
              <Gift className="h-6 w-6" />
              <span>Marketplace</span>
            </Button>
          </Link>
          <Link to="/nft-rewards">
            <Button className="w-full h-20 bg-purple-600 hover:bg-purple-700 text-white flex flex-col gap-2">
              <Gift className="h-6 w-6" />
              <span>Recompensas NFT</span>
            </Button>
          </Link>
          <Link to="/impact">
            <Button className="w-full h-20 bg-green-600 hover:bg-green-700 text-white flex flex-col gap-2">
              <Activity className="h-6 w-6" />
              <span>Mi Impacto</span>
            </Button>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Actividad Reciente</CardTitle>
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Ver todo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`p-4 rounded-lg border ${activityStyles[activity.type].bg} ${activityStyles[activity.type].border} flex items-center gap-4`}
                >
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${activityStyles[activity.type].text}`}>
                      {activity.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`text-lg font-medium ${activity.points > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {activity.points > 0 ? `+${activity.points}` : activity.points}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </WebLayout>
  );
}
