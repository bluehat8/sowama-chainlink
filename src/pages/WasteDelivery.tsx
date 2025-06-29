
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Leaf, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { WebLayout } from "@/components/ui/web-layout";
import { wasteTypes } from "@/services/dataService";
import { deliverWaste } from "@/services/dataService";

export default function WasteDelivery() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [amount, setAmount] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedWasteType = wasteTypes.find(type => type.id === selectedType);
  const pointsToEarn = selectedWasteType ? selectedWasteType.pointsPerKg * amount : 0;

  const handleSubmit = async () => {
    if (!selectedType) return;
    
    setIsSubmitting(true);
    
    try {
      const success = await deliverWaste(selectedType, amount);
      
      if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error("Error delivering waste:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <WebLayout>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full p-4 bg-green-100 text-green-600">
              <CheckCircle size={64} />
            </div>
            <h1 className="text-3xl font-bold text-green-600">
              ¡Entrega registrada!
            </h1>
            <p className="text-lg text-gray-600">
              Has ganado <span className="font-bold text-green-600">{pointsToEarn} puntos</span> por tu contribución.
            </p>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">
                🌱 ¡Tu acción ayuda a reducir emisiones de CO₂!
              </p>
            </div>
            <Button
              onClick={() => navigate('/')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              size="lg"
            >
              Volver al Dashboard
            </Button>
          </div>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Entregar Residuos Orgánicos
          </h1>
          <p className="text-gray-600">
            Registra tu entrega de residuos orgánicos y gana puntos por tu contribución al medio ambiente.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Waste Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Selecciona el tipo de residuo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {wasteTypes.map((wasteType) => (
                    <Card
                      key={wasteType.id}
                      onClick={() => setSelectedType(wasteType.id)}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedType === wasteType.id 
                        ? "border-2 border-green-500 shadow-md bg-green-50" 
                        : "border border-gray-200 hover:border-green-300 hover:shadow-sm"
                      }`}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="text-4xl mb-3">{wasteType.icon}</div>
                        <div className="font-medium text-lg mb-1">{wasteType.name}</div>
                        <div className="text-sm text-gray-500">
                          {wasteType.pointsPerKg} pts/kg
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Weight Input */}
            {selectedType && (
              <Card>
                <CardHeader>
                  <CardTitle>¿Cuántos kilos vas a entregar?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[amount]}
                      min={1}
                      max={20}
                      step={1}
                      onValueChange={(value) => setAmount(value[0])}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      min={1}
                      max={20}
                      className="w-20"
                    />
                    <span className="text-lg font-medium">kg</span>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-center text-lg">
                      <span className="font-bold text-green-600 text-2xl">{pointsToEarn}</span> puntos a ganar
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen de tu entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedType ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span>Tipo de residuo:</span>
                      <span className="font-medium">{selectedWasteType?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Cantidad:</span>
                      <span className="font-medium">{amount} kg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Puntos por kg:</span>
                      <span className="font-medium">{selectedWasteType?.pointsPerKg}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total de puntos:</span>
                      <span className="text-green-600">{pointsToEarn}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Selecciona un tipo de residuo para ver el resumen
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Beneficios ambientales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌱</span>
                    <span className="text-sm">Reduces emisiones de metano</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌍</span>
                    <span className="text-sm">Contribuyes al compostaje</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">♻️</span>
                    <span className="text-sm">Apoyas la economía circular</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleSubmit}
              disabled={!selectedType || isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
              size="lg"
            >
              <Leaf className="mr-2 h-6 w-6" />
              <span>{isSubmitting ? 'Procesando...' : 'Confirmar Entrega'}</span>
            </Button>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}
