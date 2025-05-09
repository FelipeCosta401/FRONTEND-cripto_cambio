import { useLocation } from "react-router-dom"

import NavItem from "./nav-item/NavItem"

import { FaHome, FaStar } from "react-icons/fa"
import UserSection from "./user-section/UserSection"


const NavBar = () => {
    const { pathname } = useLocation()

    return (
        <div className="h-15 bg-card px-4 rounded-lg shadow-md flex justify-between items-center ">
            <section className="flex items-center gap-4">
                <NavItem title="Pagina inicial" icon={FaHome} href="/" active={pathname === "/"} />
                <NavItem title="Favoritas" icon={FaStar} href="/favoritas" active={pathname === "/favoritas"} />
            </section>
            <UserSection />
        </div>
    )
}

export default NavBar