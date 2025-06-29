
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Twitter, Link, CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface TwitterAccount {
  username: string;
  walletAddress: string;
  isLinked: boolean;
}

interface TwitterDelivery {
  id: string;
  tweetId: string;
  username: string;
  weight: number;
  location: string;
  status: 'pending' | 'validated' | 'nft_minted' | 'rejected';
  timestamp: string;
  nftTokenId?: string;
}

export function TwitterDeliverySection() {
  const [twitterAccount, setTwitterAccount] = useState<TwitterAccount>({
    username: '',
    walletAddress: '',
    isLinked: false
  });
  const [linkingWallet, setLinkingWallet] = useState(false);
  const [deliveries, setDeliveries] = useState<TwitterDelivery[]>([
    {
      id: '1',
      tweetId: '1234567890',
      username: 'usuario_ejemplo',
      weight: 3,
      location: 'Medellín',
      status: 'validated',
      timestamp: '2024-01-15T10:30:00Z',
      nftTokenId: '42'
    }
  ]);

  const handleLinkWallet = async () => {
    if (!twitterAccount.username || !twitterAccount.walletAddress) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setLinkingWallet(true);
    
    // Simulate wallet linking process
    setTimeout(() => {
      setTwitterAccount(prev => ({ ...prev, isLinked: true }));
      setLinkingWallet(false);
      toast.success('¡Wallet vinculada exitosamente a tu cuenta de Twitter!');
    }, 2000);
  };

  const handleTweetIntent = () => {
    const tweetText = encodeURIComponent(
      "Entregué residuos orgánicos en @SowamaAgent 🌱 #Reciclaje #SowamaColombia"
    );
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, "_blank");
  };

  const getStatusIcon = (status: TwitterDelivery['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'validated':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'nft_minted':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: TwitterDelivery['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'validated':
        return 'bg-green-100 text-green-800';
      case 'nft_minted':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: TwitterDelivery['status']) => {
    switch (status) {
      case 'pending':
        return 'Esperando validación';
      case 'validated':
        return 'Validado por municipio';
      case 'nft_minted':
        return 'NFT emitido';
      case 'rejected':
        return 'Rechazado';
    }
  };

  return (
    <div className="space-y-6">
      {/* Twitter Account Linking */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-600 to-twitter text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            Vincular Cuenta de Twitter
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!twitterAccount.isLinked ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">¿Por qué vincular tu cuenta?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Recibe NFTs automáticamente cuando tweets sobre tus entregas</li>
                  <li>• El agente Eliza validará tus tweets en tiempo real</li>
                  <li>• Solo necesitas hacerlo una vez</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="twitter-username">Usuario de Twitter (sin @)</Label>
                  <Input
                    id="twitter-username"
                    placeholder="tu_usuario"
                    value={twitterAccount.username}
                    onChange={(e) => setTwitterAccount(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="wallet-address">Dirección de Wallet</Label>
                  <Input
                    id="wallet-address"
                    placeholder="0x..."
                    value={twitterAccount.walletAddress}
                    onChange={(e) => setTwitterAccount(prev => ({ ...prev, walletAddress: e.target.value }))}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleLinkWallet}
                disabled={linkingWallet}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {linkingWallet ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Vinculando...
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4 mr-2" />
                    Vincular Wallet a Twitter
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-800 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Cuenta vinculada exitosamente</span>
              </div>
              <div className="text-sm text-green-700">
                <strong>Twitter:</strong> @{twitterAccount.username}<br />
                <strong>Wallet:</strong> {twitterAccount.walletAddress.slice(0, 8)}...{twitterAccount.walletAddress.slice(-6)}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tweet Instructions */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Twitter className="h-5 w-5" />
            Cómo Reportar Entregas vía Twitter
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Formato del Tweet:</h4>
            <div className="bg-white p-3 rounded border font-mono text-sm">
              "Entregué [peso] kg de residuos orgánicos en [ubicación] @SowamaAgent 🌱 #Reciclaje"
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Ejemplo:</h4>
            <div className="bg-blue-50 p-3 rounded border">
              "Entregué 3 kg de residuos orgánicos en Medellín @SowamaAgent 🌱 #Reciclaje"
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleTweetIntent}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Crear Tweet de Entrega
            </Button>
            <Button variant="outline" className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver @SowamaAgent
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delivery History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Twitter className="h-5 w-5" />
            Historial de Entregas vía Twitter
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {deliveries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Twitter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No hay entregas vía Twitter aún</p>
              <p className="text-sm">¡Haz tu primer tweet para comenzar!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div key={delivery.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(delivery.status)}
                      <Badge className={getStatusColor(delivery.status)}>
                        {getStatusText(delivery.status)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(delivery.timestamp).toLocaleDateString('es-CO')}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Peso:</span> {delivery.weight} kg
                    </div>
                    <div>
                      <span className="font-medium">Ubicación:</span> {delivery.location}
                    </div>
                    <div>
                      <span className="font-medium">Usuario:</span> @{delivery.username}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Ver Tweet
                    </Button>
                    {delivery.nftTokenId && (
                      <div className="text-sm text-green-600 font-medium">
                        NFT #{delivery.nftTokenId} emitido
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
