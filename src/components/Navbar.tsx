"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CartSidebar from "@/components/CartSidebar"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/components/AuthProvider"

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems } = useCart()
  const { user, logout } = useAuth()
  const router = useRouter()

  // Calcular total de itens no carrinho
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <div className="bg-black text-white w-full">
        {/* Top bar */}
        <div className="text-sm py-2 border-b border-gray-800 flex justify-between px-6 items-center">
          <div className="text-orange-500 font-bold text-xl">Shop Easyy</div>
          <p className="text-orange-400">🚚 FRETE GRÁTIS em todo Brasil*</p>
          <div className="flex gap-4 text-sm items-center">
            <a href="#" className="hover:underline">
              Fale Conosco
            </a>
            <a href="#" className="hover:underline">
              Meus Pedidos
            </a>

            {/* Login/Logout */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-white">Olá, <span className="font-bold">{user.name}</span>!</span>
                <button
                  className="text-red-400 hover:text-red-500 font-semibold transition-colors"
                  onClick={() => {
                    logout()
                    router.push("/")
                  }}
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                className="text-white hover:text-orange-400 font-semibold transition-colors"
                onClick={() => router.push("/login")}
              >
                Entrar
              </button>
            )}

            {/* Botão do carrinho com badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-orange-400 font-bold text-lg transition-colors flex items-center gap-1"
            >
              🛒
              {totalItems > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Pesquisar */}
        <div className="py-4 px-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Menu de categorias */}
        <nav className="px-6 py-4 flex gap-6 justify-center text-sm uppercase font-semibold tracking-wide border-b border-gray-900">
          <Link href="#" className="hover:text-orange-400 transition-colors">
            Camisetas
          </Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">
            Games
          </Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">
            Acessórios
          </Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">
            Animes
          </Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">
            Heróis
          </Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">
            Filmes
          </Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">
            Colecionáveis
          </Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">
            Séries
          </Link>
          <Link href="#" className="hover:text-orange-400 transition-colors">
            Animações
          </Link>
        </nav>
      </div>

      {/* Barra lateral do carrinho */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
