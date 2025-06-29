
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Filter, CheckCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { WebLayout } from "@/components/ui/web-layout";
import EcoCard from "@/components/ui/eco-card";
import { products, currentUser, redeemProduct } from "@/services/dataService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function Marketplace() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Filter products by category and search query
  const filteredProducts = products.filter((product) => {
    const categoryMatch = category === "all" || product.category === category;
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Get unique categories
  const categories = ["all", ...new Set(products.map(p => p.category))];
  
  // Get selected product details
  const product = products.find(p => p.id === selectedProduct);
  
  // Check if user has enough points
  const canPurchase = product ? currentUser.points >= product.points : false;

  const handleRedeemClick = (productId: string) => {
    setSelectedProduct(productId);
    setIsConfirmOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedProduct) return;
    
    try {
      const success = await redeemProduct(selectedProduct);
      
      if (success) {
        setIsConfirmOpen(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error("Error redeeming product", error);
    }
  };

  if (isSuccess) {
    return (
      <WebLayout>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="rounded-full p-4 bg-blue-100 text-blue-600">
              <CheckCircle size={64} />
            </div>
            <h1 className="text-3xl font-bold text-blue-600">
              ¡Canje exitoso!
            </h1>
            <p className="text-lg text-gray-600">
              Tu pedido será procesado y pronto te contactaremos.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">
                💚 ¡Gracias por ser parte del cambio!
              </p>
            </div>
            <Button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
            <p className="text-gray-600">
              Canjea tus puntos por productos sostenibles y experiencias únicas.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <div className="bg-green-100 px-4 py-2 rounded-lg">
              <span className="text-green-800 font-bold text-lg">
                {currentUser.points.toLocaleString()} puntos
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="lg:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Categories */}
        <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="mb-8">
          <TabsList className="h-auto p-1 bg-gray-100">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="capitalize px-6 py-2"
              >
                {cat === "all" ? "Todos" : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <EcoCard
              key={product.id}
              title={product.name}
              description={product.description}
              image={product.image}
              points={product.points}
              eco={product.eco}
              actionText="Canjear"
              actionDisabled={currentUser.points < product.points}
              onAction={() => handleRedeemClick(product.id)}
              className="h-full"
            />
          ))}
        </div>
        
        {/* Confirmation Dialog */}
        {product && (
          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar canje</DialogTitle>
                <DialogDescription>
                  {canPurchase 
                    ? "¿Estás seguro de que quieres canjear este producto?"
                    : "No tienes suficientes puntos para este canje."}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center gap-4">
                  {product.image && (
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {product.points} puntos
                    </p>
                  </div>
                </div>
                {!canPurchase && (
                  <div className="mt-4 bg-red-50 p-3 rounded-md text-sm text-red-800">
                    Te faltan {product.points - currentUser.points} puntos para este canje.
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!canPurchase}
                  onClick={handleConfirmPurchase}
                >
                  <Gift className="mr-2 h-4 w-4" />
                  Confirmar canje
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </WebLayout>
  );
}
