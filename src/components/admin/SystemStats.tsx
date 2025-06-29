
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, BarChart, Bar, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import { TokenConfig } from "@/lib/types";
import { wasteTypes } from "@/services/dataService";

const SystemStats = () => {
  // Datos simulados del token
  const tokenConfig: TokenConfig = {
    name: "SowamaToken",
    symbol: "SWT",
    initialValueUSD: 0.01,
    currentValueUSD: 0.015,
    totalSupply: 1000000,
    circulatingSupply: 276540,
    lastUpdated: new Date().toISOString(),
  };

  // Datos simulados para gráficos
  const monthlyData = [
    { month: "Ene", usuarios: 120, residuos: 450, tokens: 9800 },
    { month: "Feb", usuarios: 145, residuos: 520, tokens: 12400 },
    { month: "Mar", usuarios: 168, residuos: 610, tokens: 15700 },
    { month: "Abr", usuarios: 190, residuos: 680, tokens: 18200 },
    { month: "May", usuarios: 240, residuos: 790, tokens: 22600 },
    { month: "Jun", usuarios: 280, residuos: 920, tokens: 28000 },
    { month: "Jul", usuarios: 320, residuos: 1100, tokens: 35000 },
    { month: "Ago", usuarios: 352, residuos: 1250, tokens: 42000 },
    { month: "Sep", usuarios: 400, residuos: 1400, tokens: 52000 },
    { month: "Oct", usuarios: 450, residuos: 1580, tokens: 61000 },
    { month: "Nov", usuarios: 500, residuos: 1750, tokens: 72000 },
    { month: "Dic", usuarios: 580, residuos: 2100, tokens: 86000 },
  ];

  const tokenValueHistory = [
    { date: "2024-01", value: 0.010 },
    { date: "2024-02", value: 0.010 },
    { date: "2024-03", value: 0.011 },
    { date: "2024-04", value: 0.012 },
    { date: "2024-05", value: 0.012 },
    { date: "2024-06", value: 0.013 },
    { date: "2024-07", value: 0.014 },
    { date: "2024-08", value: 0.014 },
    { date: "2024-09", value: 0.013 },
    { date: "2024-10", value: 0.015 },
    { date: "2024-11", value: 0.014 },
    { date: "2024-12", value: 0.015 },
  ];

  // Datos de distribución de residuos
  const wasteDistribution = [
    { name: "Restos de comida", value: 45 },
    { name: "Residuos de jardín", value: 25 },
    { name: "Café y filtros", value: 18 },
    { name: "Cáscaras de huevo", value: 12 },
  ];

  // Colores para el gráfico de pie
  const COLORS = wasteTypes.map(type => type.color);

  // Configuración para los gráficos
  const chartConfig = {
    usuarios: {
      label: "Usuarios",
      color: "#8B5CF6"
    },
    residuos: {
      label: "Residuos (kg)",
      color: "#8FD275"
    },
    tokens: {
      label: "Tokens",
      color: "#4C95D1"
    },
    value: {
      label: "Valor USD",
      color: "#10B981"
    }
  };

  // Formato para números grandes
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Valor del Token</CardTitle>
            <CardDescription>SWT - SowamaToken</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${tokenConfig.currentValueUSD.toFixed(4)} USD</div>
            <div className="text-sm text-muted-foreground">Valor inicial: ${tokenConfig.initialValueUSD.toFixed(4)} USD</div>
            <div className="text-sm text-muted-foreground">
              Cambio: {((tokenConfig.currentValueUSD / tokenConfig.initialValueUSD - 1) * 100).toFixed(2)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Supply de Tokens</CardTitle>
            <CardDescription>Total y circulante</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <div className="text-3xl font-bold">{formatNumber(tokenConfig.circulatingSupply)}</div>
              <div className="text-sm text-muted-foreground mb-1">circulantes</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${(tokenConfig.circulatingSupply / tokenConfig.totalSupply * 100)}%` }}
              ></div>
            </div>
            <div className="text-sm text-right text-muted-foreground">
              {((tokenConfig.circulatingSupply / tokenConfig.totalSupply) * 100).toFixed(1)}% del total de {formatNumber(tokenConfig.totalSupply)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Actividad del Sistema</CardTitle>
            <CardDescription>Último mes vs. anterior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Nuevos usuarios</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">+143</div>
                  <div className="text-sm text-green-600">+24%</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Kg de residuos</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">1,780kg</div>
                  <div className="text-sm text-green-600">+18%</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Canjes realizados</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">278</div>
                  <div className="text-sm text-green-600">+31%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Evolución Anual</CardTitle>
            <CardDescription>Crecimiento de usuarios, residuos y tokens en circulación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <LineChart
                  data={monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="usuarios"
                    name="Usuarios"
                    stroke="#8B5CF6"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="residuos"
                    name="Residuos (kg)"
                    stroke="#8FD275"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="tokens"
                    name="Tokens"
                    stroke="#4C95D1"
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Valor Histórico del Token</CardTitle>
            <CardDescription>Evolución del valor en USD</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={chartConfig}>
                <AreaChart
                  data={tokenValueHistory}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0.009, 0.016]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    fill="#10B98133"
                    name="Valor USD"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Residuos</CardTitle>
            <CardDescription>Por tipo de material orgánico</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wasteDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemStats;
