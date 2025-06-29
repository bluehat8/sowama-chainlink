
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, UserCheck, UserX } from "lucide-react";
import { currentUser } from "@/services/dataService";

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Datos simulados de usuarios
  const users = [
    { id: "1", name: "María García", email: "maria@example.com", points: 1250, status: "active" },
    { id: "2", name: "Juan Pérez", email: "juan@example.com", points: 430, status: "active" },
    { id: "3", name: "Ana López", email: "ana@example.com", points: 950, status: "pending" },
    { id: "4", name: "Carlos Rodríguez", email: "carlos@example.com", points: 1800, status: "active" },
    { id: "5", name: "Laura Mendoza", email: "laura@example.com", points: 250, status: "pending" },
    { id: "6", name: "Roberto Sánchez", email: "roberto@example.com", points: 520, status: "active" },
    { id: "7", name: "Patricia Flores", email: "patricia@example.com", points: 0, status: "inactive" },
    { id: "8", name: "Miguel Ángel", email: "miguel@example.com", points: 350, status: "active" },
    { id: "9", name: "Isabel Medina", email: "isabel@example.com", points: 1100, status: "active" },
    { id: "10", name: "Fernando Torres", email: "fernando@example.com", points: 780, status: "pending" },
  ];

  // Filtrar usuarios por término de búsqueda
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const usersPerPage = 5;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Función para aprobar usuario
  const approveUser = (userId: string) => {
    console.log(`Usuario aprobado: ${userId}`);
    // En una app real, aquí actualizaríamos el estado del usuario
  };

  // Función para rechazar usuario
  const rejectUser = (userId: string) => {
    console.log(`Usuario rechazado: ${userId}`);
    // En una app real, aquí actualizaríamos el estado del usuario
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Usuarios</CardTitle>
        <CardDescription>Administra los usuarios de la plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar usuarios..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">Exportar</Button>
            <Button>Añadir Usuario</Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Puntos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.points}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : user.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 
                       user.status === 'pending' ? 'Pendiente' : 'Inactivo'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {user.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => approveUser(user.id)}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Aprobar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => rejectUser(user.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Rechazar
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                      >
                        Ver detalles
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default UsersManagement;
