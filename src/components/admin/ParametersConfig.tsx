
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import blockchainService from "@/services/blockchainService";
import { wasteTypes } from "@/services/dataService";

const ParametersConfig = () => {
  const { toast } = useToast();
  const [tokenValue, setTokenValue] = useState<string>("0.01");
  const [wasteValues, setWasteValues] = useState(
    wasteTypes.map(type => ({
      id: type.id,
      name: type.name,
      pointsPerKg: type.pointsPerKg
    }))
  );

  // Función para actualizar el valor del token
  const updateTokenValue = async () => {
    const newValue = parseFloat(tokenValue);
    
    if (isNaN(newValue) || newValue <= 0) {
      toast({
        title: "Error",
        description: "El valor del token debe ser un número positivo",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await blockchainService.updateTokenValue(newValue);
      
      if (success) {
        toast({
          title: "Valor actualizado",
          description: `El valor del token ha sido actualizado a $${newValue} USD`,
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar el valor del token",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar el valor del token",
        variant: "destructive",
      });
    }
  };

  // Función para actualizar los valores de los residuos
  const updateWasteValues = () => {
    // En una app real, aquí actualizaríamos los valores en la base de datos
    toast({
      title: "Valores actualizados",
      description: "Los valores de puntos por kg han sido actualizados",
    });
  };

  // Función para manejar cambios en los valores de residuos
  const handleWasteValueChange = (id: string, value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    setWasteValues(prev => 
      prev.map(waste => 
        waste.id === id ? { ...waste, pointsPerKg: numValue } : waste
      )
    );
  };

  return (
    <Tabs defaultValue="token">
      <TabsList className="mb-6">
        <TabsTrigger value="token">Valor del Token</TabsTrigger>
        <TabsTrigger value="waste">Puntos por Residuos</TabsTrigger>
        <TabsTrigger value="rewards">Recompensas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="token">
        <Card>
          <CardHeader>
            <CardTitle>Configuración del Token</CardTitle>
            <CardDescription>
              Establece el valor de conversión del token SowamaToken (SWT)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="token-value">Valor en USD</Label>
              <div className="flex items-center space-x-2">
                <span className="text-xl">$</span>
                <Input
                  id="token-value"
                  type="number"
                  step="0.001"
                  min="0.001"
                  value={tokenValue}
                  onChange={(e) => setTokenValue(e.target.value)}
                  className="max-w-xs"
                />
                <span className="text-lg">USD</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Este valor determina cuánto vale cada token en dólares americanos.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
                <div>
                  <p className="font-medium">Valor actual del token</p>
                  <p className="text-sm text-muted-foreground">
                    Últimos 30 días: <span className="text-green-600">+12.5%</span>
                  </p>
                </div>
                <div className="text-xl font-bold">$0.015 USD</div>
              </div>
            </div>

            <div>
              <Button onClick={updateTokenValue}>Actualizar valor del token</Button>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Historial de cambios de valor</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>10 Abr 2025</span>
                  <span>$0.015 USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>15 Mar 2025</span>
                  <span>$0.014 USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>20 Feb 2025</span>
                  <span>$0.012 USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>5 Ene 2025</span>
                  <span>$0.010 USD</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="waste">
        <Card>
          <CardHeader>
            <CardTitle>Puntos por Kilogramo de Residuo</CardTitle>
            <CardDescription>
              Configura la cantidad de puntos que recibe un usuario por cada kilogramo de residuos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {wasteValues.map((waste) => (
                <div key={waste.id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-md bg-primary/10 text-2xl">
                    {wasteTypes.find(w => w.id === waste.id)?.icon}
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`waste-${waste.id}`}>{waste.name}</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        id={`waste-${waste.id}`}
                        type="number"
                        min="1"
                        value={waste.pointsPerKg}
                        onChange={(e) => handleWasteValueChange(waste.id, e.target.value)}
                        className="max-w-[100px]"
                      />
                      <span>puntos por kg</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Button onClick={updateWasteValues}>Guardar configuración</Button>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mt-6">
              <h3 className="text-amber-800 font-medium">Nota importante</h3>
              <p className="text-amber-700 text-sm mt-1">
                Cambiar estos valores afectará a todas las futuras entregas de residuos. 
                Los cambios no son retroactivos y no afectarán a las transacciones ya realizadas.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="rewards">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Recompensas</CardTitle>
            <CardDescription>
              Gestiona los productos del marketplace y sus valores en puntos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-md divide-y">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <h3 className="font-medium">Compost Premium</h3>
                    <p className="text-sm text-muted-foreground">5kg de compost de alta calidad</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min="1"
                      value="200"
                      className="max-w-[100px]"
                    />
                    <span className="ml-2">puntos</span>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <h3 className="font-medium">Kit de Jardinería</h3>
                    <p className="text-sm text-muted-foreground">Set de herramientas ecológicas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min="1"
                      value="350"
                      className="max-w-[100px]"
                    />
                    <span className="ml-2">puntos</span>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  <div>
                    <h3 className="font-medium">Semillas Orgánicas</h3>
                    <p className="text-sm text-muted-foreground">Pack de semillas de temporada</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min="1"
                      value="150"
                      className="max-w-[100px]"
                    />
                    <span className="ml-2">puntos</span>
                  </div>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline">Añadir nueva recompensa</Button>
              <Button>Guardar cambios</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ParametersConfig;
