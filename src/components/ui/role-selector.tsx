
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Role = {
  id: string
  label: string
  path: string
}

const roles: Role[] = [
  { id: "user", label: "Usuario Regular", path: "/" },
  { id: "admin", label: "Administrador", path: "/admin" },
  { id: "collector", label: "Centro de Recolección", path: "/collector" },
  { id: "partner", label: "Socio Comercial", path: "/partner" },
  { id: "org", label: "Organización Ambiental", path: "/org" }
]

export function RoleSelector() {
  const handleRoleChange = (roleId: string) => {
    const selectedRole = roles.find(role => role.id === roleId)
    if (selectedRole) {
      window.location.href = selectedRole.path
    }
  }

  return (
    <Select onValueChange={handleRoleChange}>
      <SelectTrigger className="w-[200px] bg-white">
        <SelectValue placeholder="Seleccionar rol" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.id} value={role.id}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
