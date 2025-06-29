
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/admin/Layout";
import Dashboard from "@/components/admin/Dashboard";
import UsersManagement from "@/components/admin/UsersManagement";
import SystemStats from "@/components/admin/SystemStats";
import ParametersConfig from "@/components/admin/ParametersConfig";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Gestión de Usuarios</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="config">Configuración</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>
          
          <TabsContent value="stats">
            <SystemStats />
          </TabsContent>
          
          <TabsContent value="config">
            <ParametersConfig />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
