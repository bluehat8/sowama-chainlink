
import { WebLayout } from "@/components/ui/web-layout";
import { UserSettings } from "@/components/settings/UserSettings";

const Settings = () => {
  return (
    <WebLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configuración de Usuario
          </h1>
          <p className="text-gray-600">
            Gestiona tu perfil, conecta tus cuentas sociales y configura tus preferencias.
          </p>
        </div>
        <UserSettings />
      </div>
    </WebLayout>
  );
};

export default Settings;
