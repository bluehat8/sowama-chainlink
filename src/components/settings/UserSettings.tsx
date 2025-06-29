
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Twitter, Bell, Shield, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface TwitterConfig {
  username: string;
  password: string;
  email: string;
  twoFactorSecret: string;
  isConnected: boolean;
}

export function UserSettings() {
  const [profile, setProfile] = useState({
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    phone: '+1234567890',
    location: 'Ciudad, País'
  });

  const [twitterConfig, setTwitterConfig] = useState<TwitterConfig>({
    username: '',
    password: '',
    email: '',
    twoFactorSecret: '',
    isConnected: false
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    tweetVerification: true,
    nftRewards: true
  });

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    twoFactor: false
  });

  const handleProfileSave = () => {
    toast.success('Perfil actualizado correctamente');
  };

  const handleTwitterSave = () => {
    if (twitterConfig.username && twitterConfig.password) {
      setTwitterConfig(prev => ({ ...prev, isConnected: true }));
      toast.success('Configuración de Twitter guardada correctamente');
    } else {
      toast.error('Por favor completa todos los campos requeridos');
    }
  };

  const handleTwitterDisconnect = () => {
    setTwitterConfig({
      username: '',
      password: '',
      email: '',
      twoFactorSecret: '',
      isConnected: false
    });
    toast.info('Cuenta de Twitter desconectada');
  };

  const handleNotificationsSave = () => {
    toast.success('Preferencias de notificaciones actualizadas');
  };

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Perfil
        </TabsTrigger>
        <TabsTrigger value="social" className="flex items-center gap-2">
          <Twitter className="h-4 w-4" />
          Redes Sociales
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notificaciones
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Seguridad
        </TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Actualiza tu información de perfil y datos de contacto.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleProfileSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Social Media Tab */}
      <TabsContent value="social">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Twitter className="h-5 w-5 text-blue-500" />
              Configuración de Twitter/X
            </CardTitle>
            <CardDescription>
              Configura tu cuenta de Twitter para la verificación automática de tweets y recompensas NFT.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {twitterConfig.isConnected && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">Conectado</Badge>
                    <span className="text-green-800 font-medium">
                      @{twitterConfig.username}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleTwitterDisconnect}
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Desconectar
                  </Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter-username">Nombre de Usuario *</Label>
                <Input
                  id="twitter-username"
                  placeholder="@tu_usuario"
                  value={twitterConfig.username}
                  onChange={(e) => setTwitterConfig(prev => ({ 
                    ...prev, 
                    username: e.target.value.replace('@', '') 
                  }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-email">Email de Twitter</Label>
                <Input
                  id="twitter-email"
                  type="email"
                  placeholder="email@ejemplo.com"
                  value={twitterConfig.email}
                  onChange={(e) => setTwitterConfig(prev => ({ 
                    ...prev, 
                    email: e.target.value 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter-password">Contraseña *</Label>
              <div className="relative">
                <Input
                  id="twitter-password"
                  type={showPasswords.password ? "text" : "password"}
                  placeholder="Tu contraseña de Twitter"
                  value={twitterConfig.password}
                  onChange={(e) => setTwitterConfig(prev => ({ 
                    ...prev, 
                    password: e.target.value 
                  }))}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(prev => ({ 
                    ...prev, 
                    password: !prev.password 
                  }))}
                >
                  {showPasswords.password ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter-2fa">Secreto 2FA (Opcional)</Label>
              <div className="relative">
                <Input
                  id="twitter-2fa"
                  type={showPasswords.twoFactor ? "text" : "password"}
                  placeholder="Secreto de autenticación de dos factores"
                  value={twitterConfig.twoFactorSecret}
                  onChange={(e) => setTwitterConfig(prev => ({ 
                    ...prev, 
                    twoFactorSecret: e.target.value 
                  }))}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(prev => ({ 
                    ...prev, 
                    twoFactor: !prev.twoFactor 
                  }))}
                >
                  {showPasswords.twoFactor ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Solo necesario si tienes autenticación de dos factores activada en Twitter.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-2">⚠️ Información de Seguridad</h4>
              <p className="text-sm text-amber-700">
                Tus credenciales se almacenan de forma segura y cifrada. Solo se utilizan para 
                verificar automáticamente tus tweets relacionados con el reciclaje.
              </p>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleTwitterSave} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {twitterConfig.isConnected ? 'Actualizar' : 'Conectar'} Twitter
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Preferencias de Notificaciones</CardTitle>
            <CardDescription>
              Configura cómo y cuándo quieres recibir notificaciones.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones por Email</Label>
                  <p className="text-sm text-gray-500">
                    Recibe actualizaciones importantes por correo electrónico
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificaciones Push</Label>
                  <p className="text-sm text-gray-500">
                    Recibe notificaciones en tu navegador
                  </p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, pushNotifications: checked }))
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Verificación de Tweets</Label>
                  <p className="text-sm text-gray-500">
                    Notificar cuando se verifique un tweet automáticamente
                  </p>
                </div>
                <Switch
                  checked={notifications.tweetVerification}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, tweetVerification: checked }))
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Recompensas NFT</Label>
                  <p className="text-sm text-gray-500">
                    Notificar cuando recibas una nueva recompensa NFT
                  </p>
                </div>
                <Switch
                  checked={notifications.nftRewards}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, nftRewards: checked }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNotificationsSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Guardar Preferencias
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Tab */}
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Seguridad y Privacidad</CardTitle>
            <CardDescription>
              Gestiona la seguridad de tu cuenta y configuraciones de privacidad.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Cambiar Contraseña</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Te recomendamos cambiar tu contraseña regularmente para mantener tu cuenta segura.
                </p>
                <Button variant="outline">
                  Cambiar Contraseña
                </Button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Autenticación de Dos Factores</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Añade una capa extra de seguridad a tu cuenta.
                </p>
                <Button variant="outline">
                  Configurar 2FA
                </Button>
              </div>

              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <h4 className="font-medium mb-2 text-red-800">Zona de Peligro</h4>
                <p className="text-sm text-red-700 mb-4">
                  Estas acciones son permanentes y no se pueden deshacer.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                    Desconectar Todas las Cuentas
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                    Eliminar Cuenta
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
