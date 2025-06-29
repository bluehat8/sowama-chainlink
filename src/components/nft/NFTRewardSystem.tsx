import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AlertCircle, CheckCircle, Clock, Gift, Twitter, ExternalLink, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { TwitterDeliverySection } from './TwitterDeliverySection';

interface TweetStatus {
  status: 'checking' | 'detected' | 'not_found' | 'error' | 'not_authenticated';
  giftCode?: string;
  tweetId?: string;
  message?: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  ipfsHash: string;
  tokenId?: string;
}

const GetGiftABI = [
  {
    name: 'sendRequest',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'giftCode', type: 'string' }],
    outputs: [],
  },
] as const;

const GET_GIFT_CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890' as `0x${string}`;

export function NFTRewardSystem() {
  const { address, isConnected, chain } = useAccount();
  const [tweetStatus, setTweetStatus] = useState<TweetStatus>({ status: 'not_authenticated' });
  const [nftMetadata, setNftMetadata] = useState<NFTMetadata | null>(null);
  const [isCheckingTweet, setIsCheckingTweet] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isTwitterConnected, setIsTwitterConnected] = useState(false);
  const [twitterUsername, setTwitterUsername] = useState<string>('');

  const { data: hash, writeContract, isPending: isMinting } = useWriteContract();

  const { isLoading: isWaitingForTransaction, isSuccess: isMintSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isMintSuccess) {
      toast.success('¡NFT minteado exitosamente!');
      fetchNFTMetadata();
    }
  }, [isMintSuccess]);

  const connectTwitter = async () => {
    toast.info('Conectando con Twitter...');
    
    setTimeout(() => {
      setIsTwitterConnected(true);
      setTwitterUsername('usuario_ejemplo');
      setTweetStatus({ status: 'not_found' });
      toast.success('¡Conectado con Twitter exitosamente!');
    }, 2000);
  };

  const checkForTweet = async () => {
    if (!isConnected) {
      toast.error('Conecta tu wallet primero');
      return;
    }

    if (!isTwitterConnected) {
      toast.error('Conecta tu cuenta de Twitter primero');
      return;
    }

    setIsCheckingTweet(true);
    setProgress(0);
    setTweetStatus({ status: 'checking' });

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockResult = Math.random() > 0.3;

      setProgress(100);
      
      if (mockResult) {
        const giftCode = `GIFT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setTweetStatus({
          status: 'detected',
          giftCode,
          tweetId: '1234567890',
          message: `Tweet de entrega de residuos orgánicos detectado en @${twitterUsername}`
        });
        toast.success('¡Tweet válido encontrado!');
      } else {
        setTweetStatus({
          status: 'not_found',
          message: 'No se encontraron tweets válidos recientes'
        });
        toast.error('No se encontraron tweets válidos');
      }
    } catch (error) {
      setTweetStatus({
        status: 'error',
        message: 'Error al verificar tweets'
      });
      toast.error('Error al verificar tweets');
    } finally {
      setIsCheckingTweet(false);
    }
  };

  const handleMintNFT = async () => {
    if (!tweetStatus.giftCode || !address || !chain) {
      toast.error('No hay código de regalo válido o wallet no conectado');
      return;
    }

    try {
      writeContract({
        address: GET_GIFT_CONTRACT_ADDRESS,
        abi: GetGiftABI,
        functionName: 'sendRequest',
        args: [tweetStatus.giftCode],
        account: address,
        chain: chain,
      });
      toast.success('¡Transacción enviada! Esperando confirmación...');
    } catch (error: any) {
      toast.error(`Error al mintear NFT: ${error.message}`);
    }
  };

  const fetchNFTMetadata = async () => {
    const mockMetadata: NFTMetadata = {
      name: 'Sowama Eco Warrior',
      description: 'NFT otorgado por contribuir al reciclaje de residuos orgánicos',
      image: '/placeholder.svg',
      ipfsHash: 'QmX...abc123',
      tokenId: '42'
    };
    
    setNftMetadata(mockMetadata);
  };

  const getStatusIcon = () => {
    switch (tweetStatus.status) {
      case 'checking':
        return <Clock className="h-5 w-5 animate-spin" />;
      case 'detected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'not_authenticated':
        return <Twitter className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (tweetStatus.status) {
      case 'checking':
        return 'bg-blue-100 text-blue-800';
      case 'detected':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'not_authenticated':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Sistema de Recompensas NFT
        </h1>
        <p className="text-gray-600 max-w-4xl mx-auto text-lg">
          Obtén NFTs de recompensa por tus entregas de residuos orgánicos. 
          Puedes reportar desde la app o directamente desde Twitter mencionando a @SowamaAgent.
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="twitter" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="twitter" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            Entregas vía Twitter
          </TabsTrigger>
          <TabsTrigger value="app" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Desde la App
          </TabsTrigger>
        </TabsList>

        {/* Twitter Delivery Tab */}
        <TabsContent value="twitter" className="space-y-6">
          <TwitterDeliverySection />
        </TabsContent>

        {/* App Delivery Tab */}
        <TabsContent value="app" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Process Steps */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wallet Connection */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Paso 1: Conectar Wallet
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Conecta tu wallet para poder recibir el NFT de recompensa
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <ConnectButton />
                  </div>
                  {isConnected && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Wallet conectado exitosamente</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Twitter Connection */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Twitter className="h-5 w-5" />
                    Paso 2: Conectar Twitter
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Autoriza el acceso a tu cuenta de Twitter para verificar tus tweets
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {!isTwitterConnected ? (
                    <div className="space-y-4">
                      <Button 
                        onClick={connectTwitter}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                        size="lg"
                      >
                        <Twitter className="h-5 w-5 mr-2" />
                        Conectar con Twitter
                      </Button>
                      <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                        <strong>Nota:</strong> En producción se implementaría OAuth 2.0 con Twitter para autenticar tu cuenta de forma segura.
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-800 mb-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Twitter conectado</span>
                      </div>
                      <div className="text-sm text-blue-700">
                        Cuenta: @{twitterUsername}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tweet Verification */}
              {isConnected && isTwitterConnected && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon()}
                      Paso 3: Verificar Tweet
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      Verifica si has publicado un tweet válido sobre entrega de residuos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon()}
                        <Badge className={getStatusColor()}>
                          {tweetStatus.status === 'checking' && 'Verificando...'}
                          {tweetStatus.status === 'detected' && 'Tweet Detectado'}
                          {tweetStatus.status === 'not_found' && 'No Encontrado'}
                          {tweetStatus.status === 'error' && 'Error'}
                          {tweetStatus.status === 'not_authenticated' && 'Listo para verificar'}
                        </Badge>
                      </div>
                      <Button 
                        onClick={checkForTweet} 
                        disabled={isCheckingTweet}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isCheckingTweet ? 'Verificando...' : 'Verificar Tweet'}
                      </Button>
                    </div>

                    {isCheckingTweet && (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          Analizando tweets recientes con Eliza AI...
                        </div>
                        <Progress value={progress} className="w-full h-3" />
                      </div>
                    )}

                    {tweetStatus.message && (
                      <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border">
                        {tweetStatus.message}
                      </div>
                    )}

                    {tweetStatus.giftCode && (
                      <div className="text-sm bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="font-medium text-green-800 mb-2">¡Tweet válido encontrado!</div>
                        <div className="text-green-700">
                          <strong>Código de Regalo:</strong> {tweetStatus.giftCode}
                        </div>
                        {tweetStatus.tweetId && (
                          <div className="mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Ver Tweet
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Mint NFT */}
              {isConnected && tweetStatus.status === 'detected' && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                    <CardTitle>Paso 4: Reclamar NFT</CardTitle>
                    <CardDescription className="text-green-100">
                      Tu tweet ha sido validado. ¡Reclama tu recompensa!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Button 
                      onClick={handleMintNFT}
                      disabled={isMinting || isWaitingForTransaction}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      {isMinting || isWaitingForTransaction ? (
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 animate-spin" />
                          {isMinting ? 'Enviando transacción...' : 'Esperando confirmación...'}
                        </div>
                      ) : (
                        <>
                          <Gift className="h-5 w-5 mr-2" />
                          Reclamar NFT de Recompensa
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Info & NFT Display */}
            <div className="space-y-6">
              {/* Instructions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>¿Cómo funciona?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <div className="font-medium">Publica en Twitter</div>
                        <div className="text-sm text-gray-600">Comparte tu experiencia entregando residuos orgánicos</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <div className="font-medium">Verificación AI</div>
                        <div className="text-sm text-gray-600">Nuestro agente Eliza verifica automáticamente tu tweet</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <div className="font-medium">Recibe NFT</div>
                        <div className="text-sm text-gray-600">Obtén tu recompensa NFT directamente en tu wallet</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* NFT Display */}
              {nftMetadata && (
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                    <CardTitle>¡NFT Recibido!</CardTitle>
                    <CardDescription className="text-yellow-100">
                      Tu recompensa ha sido minteada exitosamente
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <img 
                          src={nftMetadata.image} 
                          alt={nftMetadata.name}
                          className="w-48 h-48 rounded-xl object-cover border-4 border-green-200 shadow-lg"
                        />
                      </div>
                      <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold">{nftMetadata.name}</h3>
                        <p className="text-gray-600 text-sm">{nftMetadata.description}</p>
                        {nftMetadata.tokenId && (
                          <Badge variant="outline">Token ID: {nftMetadata.tokenId}</Badge>
                        )}
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="font-medium mb-1 text-sm">IPFS Hash:</div>
                        <div className="font-mono text-xs break-all text-gray-600">{nftMetadata.ipfsHash}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
