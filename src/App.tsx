import { useContext } from "react"
import { Outlet } from "react-router-dom"

import { UserContext } from "./context/UserContext"

import NavBar from "./components/nav-bar/NavBar"

const App = () => {
  const { theme } = useContext(UserContext)
  return (
    <div className={`${theme} h-full min-h-screen bg-background text-foreground`}>
      <header className="p-4">
        <NavBar />
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default App