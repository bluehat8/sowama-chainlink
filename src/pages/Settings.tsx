
import { useState, useEffect } from 'react';
import supabase from '../supabaseClient';
import { User } from '@supabase/supabase-js';
import { WebLayout } from "@/components/ui/web-layout";

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // The onAuthStateChange listener in App.tsx will handle the redirect.
  };

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
        
        {loading && <p>Loading user data...</p>}

        {user && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6 text-center">User Profile</h2>
            {user.user_metadata.avatar_url && (
              <div className="flex justify-center mb-4">
                <img 
                    src={user.user_metadata.avatar_url} 
                    alt="User Avatar" 
                    className="w-24 h-24 rounded-full"/>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 p-2 w-full bg-gray-50 rounded-md">{user.email}</p>
              </div>
              {user.user_metadata.full_name && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 p-2 w-full bg-gray-50 rounded-md">{user.user_metadata.full_name}</p>
                </div>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="mt-8 w-full bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}

      </div>
    </WebLayout>
  );
};

export default Settings;
