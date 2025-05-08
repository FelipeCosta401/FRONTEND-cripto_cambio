import type { ElementType } from "react"
import { useNavigate } from "react-router-dom"

import { cn } from "@/lib/utils"

interface NavItemProps {
    title: string,
    href: string,
    icon: ElementType,
    active?: boolean,
}

const NavItem = ({ active, title, icon: Icon, href }: NavItemProps) => {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => navigate(href)}
            className={cn(
                'p-4 py-2 rounded-md font-bold flex gap-2 items-center',
                "hover:cursor-pointer hover:bg-primary/40",
                active && "bg-primary/60 text-primary-foreground"
            )}>
            <Icon size={20} />
            <h2>{title}</h2>
        </div>
    )
}

export default NavItem