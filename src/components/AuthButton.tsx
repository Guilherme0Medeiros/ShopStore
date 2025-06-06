// components/AuthButton.tsx
"use client"
import { useAuth } from "./AuthProvider"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function AuthButton() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user)
    return (
      <Button color="primary" onClick={() => router.push("/login")}>
        Entrar
      </Button>
    )

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">Olá, {user.name}!</span>
      <Button color="danger" size="sm" onClick={logout}>
        Sair
      </Button>
    </div>
  )
}
