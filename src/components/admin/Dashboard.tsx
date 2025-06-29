
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { Activity } from "@/lib/types";
import blockchainService from "@/services/blockchainService";
import { wasteTypes } from "@/services/dataService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Dashboard = () => {
  // Datos simulados para el dashboard
  const stats = [
    { title: "Usuarios Activos", value: "1,254", change: "+12%", changeType: "positive" },
    { title: "Kg Reciclados Hoy", value: "342", change: "+5%", changeType: "positive" },
    { title: "Tokens en Circulación", value: "45,621", change: "-2%", changeType: "negative" },
    { title: "Canjes Realizados", value: "87", change: "+23%", changeType: "positive" },
  ];

  // Datos simulados de actividad reciente
  const recentActivities: Activity[] = [
    {
      id: "act1",
      type: "delivery",
      description: "Entrega de residuos orgánicos",
      points: 100,
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 min ago
      icon: "🌱",
    },
    {
      id: "act2",
      type: "redeem",
      description: "Canje por Compost Premium",
      points: -200,
      timestamp: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
      icon: "🎁",
    },
    {
      id: "act3",
      type: "donation",
      description: "Donación a Proyecto Amazónico",
      points: -50,
      timestamp: new Date(Date.now() - 240 * 60000).toISOString(), // 4 hours ago
      icon: "🌍",
    },
    {
      id: "act4",
      type: "delivery",
      description: "Entrega de cáscaras de huevo",
      points: 75,
      timestamp: new Date(Date.now() - 300 * 60000).toISOString(), // 5 hours ago
      icon: "🥚",
    },
  ];

  // Datos simulados para el gráfico
  const chartData = useMemo(() => [
    { name: "Lun", organico: 120, jardin: 80, cafe: 40, cascara: 20 },
    { name: "Mar", organico: 150, jardin: 70, cafe: 55, cascara: 25 },
    { name: "Mie", organico: 180, jardin: 90, cafe: 60, cascara: 30 },
    { name: "Jue", organico: 140, jardin: 85, cafe: 50, cascara: 35 },
    { name: "Vie", organico: 200, jardin: 100, cafe: 70, cascara: 40 },
    { name: "Sab", organico: 230, jardin: 120, cafe: 80, cascara: 45 },
    { name: "Dom", organico: 100, jardin: 60, cafe: 30, cascara: 15 },
  ], []);
  
  // Configuración para el gráfico
  const chartConfig = {
    organico: {
      label: "Restos de comida",
      color: "#8FD275"
    },
    jardin: {
      label: "Residuos de jardín",
      color: "#5EB247"
    },
    cafe: {
      label: "Café y filtros",
      color: "#A67C52"
    },
    cascara: {
      label: "Cáscaras de huevo",
      color: "#D4AA80"
    },
  };

  const formatActivityTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} esta semana
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Residuos Recibidos (Kg)</CardTitle>
          <CardDescription>Distribución de residuos orgánicos por día</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="organico" name="Restos de comida" fill="#8FD275" />
                <Bar dataKey="jardin" name="Residuos de jardín" fill="#5EB247" />
                <Bar dataKey="cafe" name="Café y filtros" fill="#A67C52" />
                <Bar dataKey="cascara" name="Cáscaras de huevo" fill="#D4AA80" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas transacciones en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Puntos</TableHead>
                <TableHead>Hora</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <span className="text-2xl mr-2">{activity.icon}</span>
                    {activity.type === 'delivery' ? 'Entrega' : 
                     activity.type === 'redeem' ? 'Canje' : 'Donación'}
                  </TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell className={activity.points > 0 ? 'text-green-600' : 'text-red-600'}>
                    {activity.points > 0 ? `+${activity.points}` : activity.points}
                  </TableCell>
                  <TableCell>{formatActivityTime(activity.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <a href="#" className="text-sm text-primary hover:underline">Ver todas las transacciones</a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
