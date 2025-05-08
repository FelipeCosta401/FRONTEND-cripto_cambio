import { Moon } from "lucide-react"

import { DropdownMenuItem } from "../ui/dropdown-menu"

interface ThemeToggleProps {
  handleTheme: () => void
}

export function ThemeToggle({ handleTheme }: ThemeToggleProps) {

  return (
    <DropdownMenuItem
      className="w-full"
      onClick={handleTheme}
    >
      Alterar tema
      {/* <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" /> */}
      <Moon className=" h-5 w-5" />
    </DropdownMenuItem>
  )
}