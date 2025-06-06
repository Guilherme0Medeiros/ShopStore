"use client"
import { createContext, useContext, useState, useEffect } from "react"
import type React from "react"
import { Spinner } from "@nextui-org/react"

type User = {
  name: string
  email: string
} | null

const AuthContext = createContext<{
  user: User
  login: (name: string, email: string) => void
  logout: () => void
}>({
  user: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Persistência com localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user")
      if (saved) {
        const userData = JSON.parse(saved)
        setUser(userData)
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error)
      localStorage.removeItem("user")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = (name: string, email: string) => {
    const userObj = { name, email }
    setUser(userObj)
    localStorage.setItem("user", JSON.stringify(userObj))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Mostra loading enquanto verifica se há usuário salvo
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center gap-4">
          <Spinner
            size="lg"
            color="primary"
            classNames={{
              circle1: "border-b-blue-500",
              circle2: "border-b-indigo-500",
            }}
          />
          <span className="text-gray-600 font-medium">Carregando...</span>
        </div>
      </div>
    )
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
