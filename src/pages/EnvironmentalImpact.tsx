
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WebLayout } from "@/components/ui/web-layout";
import blockchainService from "@/services/blockchainService";
import { Environmental } from "@/lib/types";
import { currentUser } from "@/services/dataService";

export default function EnvironmentalImpact() {
  const [impact, setImpact] = useState<Environmental | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const impact = await blockchainService.getEnvironmentalImpact(currentUser.id);
        setImpact(impact);
      } catch (error) {
        console.error("Error loading environmental impact", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const impactMetrics = [
    {
      label: "CO₂ evitado",
      value: impact?.co2Avoided || 0,
      unit: "kg",
      color: "bg-green-500",
      icon: "🌱",
      description: "Emisiones de gases de efecto invernadero evitadas"
    },
    {
      label: "Compost generado",
      value: impact?.compostGenerated || 0,
      unit: "kg",
      color: "bg-amber-500",
      icon: "🍂",
      description: "Fertilizante natural producido a partir de tus residuos"
    },
    {
      label: "Biogás producido",
      value: impact?.biogasProduced || 0,
      unit: "m³",
      color: "bg-blue-500",
      icon: "💧",
      description: "Energía renovable generada del proceso de descomposición"
    },
    {
      label: "Árboles equivalentes",
      value: impact?.treesEquivalent || 0,
      unit: "árboles",
      color: "bg-green-600",
      icon: "🌳",
      description: "Capacidad de absorción de CO₂ equivalente"
    },
  ];

  const totalImpactScore = impactMetrics.reduce((sum, metric) => sum + metric.value, 0);

  return (
    <WebLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tu Impacto Ambiental
          </h1>
          <p className="text-gray-600">
            Descubre cómo tus acciones están contribuyendo a un planeta más saludable.
          </p>
        </div>

        {/* Hero Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">🌍 ¡Felicitaciones!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">
              Has contribuido significativamente al cuidado del medio ambiente
            </p>
            <div className="bg-white/20 p-4 rounded-lg">
              <div className="text-3xl font-bold">
                {totalImpactScore.toFixed(1)} puntos de impacto
              </div>
              <div className="text-sm opacity-90">
                Impacto ambiental total acumulado
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactMetrics.map((metric) => (
            <Card key={metric.label} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{metric.icon}</div>
                  <div className={`w-3 h-3 rounded-full ${metric.color}`}></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.value.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {metric.unit}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-gray-600">
                    {metric.description}
                  </div>
                </div>
                <Progress 
                  value={Math.min(metric.value * 5, 100)} 
                  className="h-2"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Impact Summary */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Resumen de Contribuciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌱</span>
                    <span>Reducción de huella de carbono</span>
                  </div>
                  <span className="font-bold text-green-600">
                    {impact?.co2Avoided.toFixed(1)} kg CO₂
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🍂</span>
                    <span>Compost natural generado</span>
                  </div>
                  <span className="font-bold text-amber-600">
                    {impact?.compostGenerated.toFixed(1)} kg
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <span>Energía renovable producida</span>
                  </div>
                  <span className="font-bold text-blue-600">
                    {impact?.biogasProduced.toFixed(1)} m³
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Equivalencias Ambientales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                <div className="text-4xl mb-3">🌳</div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {impact?.treesEquivalent.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  árboles plantados (equivalente)
                </div>
                <div className="text-xs text-gray-500">
                  Basado en la capacidad de absorción de CO₂
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">¿Sabías que...?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Un árbol absorbe ~22 kg de CO₂ al año</li>
                  <li>• 1 kg de compost mejora 10 m² de suelo</li>
                  <li>• El biogás puede generar electricidad limpia</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </WebLayout>
  );
}
