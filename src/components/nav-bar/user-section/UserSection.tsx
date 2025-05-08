import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"

import { UserContext } from "@/context/UserContext";
import useAuth from "@/hooks/useAuth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";
import ConfirmModal from "@/components/modal/confirm-modal/ConfirmModal";

import { FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

const UserSection = () => {
  const navigate = useNavigate()
  const { user, toggleTheme } = useContext(UserContext)
  const { logout } = useAuth()
  const [isConfirmLogoutModalOpen, setIsConfirmLogoutModalOpen] = useState<boolean>(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-10 h-10">
          <AvatarFallback className="font-extrabold uppercase">{user.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Olá {user.name}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate("/")}>
          Ver perfil
          <FaGear />
        </DropdownMenuItem>
        <ThemeToggle handleTheme={toggleTheme} />
        <DropdownMenuSeparator />
        <Button 
          onClick={() => setIsConfirmLogoutModalOpen(true)} 
          type="button" 
          variant={"destructive"} 
          className="w-full justify-between"
        >
          Sair
          <MdLogout />
        </Button>
      </DropdownMenuContent>
      <ConfirmModal 
        onConfirm={logout} 
        open={isConfirmLogoutModalOpen} 
        onOpenChange={setIsConfirmLogoutModalOpen} 
        description="Ao sair, toda alteração não salva será perdida" 
      />
    </DropdownMenu>
  )
}

export default UserSection