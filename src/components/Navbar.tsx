"use client";
import { useState } from "react";
import type React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "@nextui-org/react";
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  LogOut,
  Phone,
  ShoppingBag,
} from "lucide-react";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  // Calcular total de itens no carrinho
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { name: "Camisetas", href: "/categoria/camisetas", icon: "👕" },
    { name: "Games", href: "/categoria/games", icon: "🎮" },
    { name: "Acessórios", href: "/categoria/acessorios", icon: "⌚" },
    { name: "Animes", href: "/categoria/animes", icon: "🎌" },
    { name: "Heróis", href: "/categoria/herois", icon: "🦸" },
    { name: "Filmes", href: "/categoria/filmes", icon: "🎬" },
    { name: "Colecionáveis", href: "/categoria/colecionaveis", icon: "🏆" },
    { name: "Séries", href: "/categoria/series", icon: "📺" },
    { name: "Animações", href: "/categoria/animacoes", icon: "🎨" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <div className="bg-black text-white w-full shadow-2xl">
        {/* Top bar */}
        <div className="text-sm py-3 border-b border-gray-800">
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className="text-orange-500 font-bold text-xl hover:text-orange-400 transition-colors"
            >
              ShopStore
            </Link>

            <div className="hidden md:block">
              <p className="text-orange-400 font-medium flex items-center gap-2">
              </p>
            </div>

            {/* Right menu */}
            <div className="flex items-center gap-4">
              {/* Desktop menu */}
              <div className="hidden md:flex items-center gap-4 text-sm">
                <Link
                  href="/contato"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  <Phone className="w-4 h-4" />
                  Contatos
                </Link>
                <Link
                  href="/pedidos"
                  className="hover:text-orange-400 transition-colors flex items-center gap-1"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Compras antigas
                </Link>
                jsx Copiar Editar
              </div>

              {/* User menu */}
              {user ? (
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="text-white hover:text-orange-400 font-medium p-2 min-w-0 flex items-center gap-2"
                      startContent={<User className="w-4 h-4" />}
                    >
                      Olá, <span className="font-bold">{user.name}</span>!
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="User menu"
                    className="bg-gray-900 border border-gray-700"
                  >
                    <DropdownItem
                      key="profile"
                      className="text-white hover:bg-gray-800"
                      startContent={<User className="w-4 h-4" />}
                    >
                      Meu Perfil
                    </DropdownItem>
                    <DropdownItem
                      key="orders"
                      className="text-white hover:bg-gray-800 md:hidden"
                      startContent={<ShoppingBag className="w-4 h-4" />}
                    >
                      Compras antigas
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      className="text-red-400 hover:bg-gray-800"
                      startContent={<LogOut className="w-4 h-4" />}
                      onClick={() => {
                        logout();
                        router.push("/");
                      }}
                    >
                      Sair
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Button
                  variant="light"
                  className="text-white hover:text-orange-400 font-medium"
                  startContent={<User className="w-4 h-4" />}
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
              )}

              {/* Cart button */}
              <Badge
                content={totalItems > 99 ? "99+" : totalItems}
                color="danger"
                isInvisible={totalItems === 0}
                shape="circle"
              >
                <Button
                  isIconOnly
                  variant="light"
                  className="text-white hover:text-orange-400 text-lg"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </Badge>

              {/* Mobile menu button */}
              <Button
                isIconOnly
                variant="light"
                className="text-white hover:text-orange-400 md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="py-4 px-4">
          <div className="container mx-auto">
            <form onSubmit={handleSearch} className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <Input
                  type="text"
                  placeholder="Pesquisar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search className="w-4 h-4 text-gray-400" />}
                  classNames={{
                    base: "w-full",
                    mainWrapper: "w-full",
                    input: "text-white placeholder:text-gray-400",
                    inputWrapper:
                      "bg-gray-900 border-gray-700 hover:border-orange-500 focus-within:!border-orange-500 transition-colors",
                  }}
                  size="lg"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Categories menu - Desktop */}
        <nav className="hidden md:block border-t border-gray-800 bg-gray-900/50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-center items-center gap-1 flex-wrap">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-orange-500/20 transition-all duration-200 flex items-center gap-2"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </span>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-900">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile categories */}
              <div className="space-y-2 mb-4">
                <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wide mb-3">
                  Categorias
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center gap-2 p-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-orange-500/20 transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile links */}
              <div className="border-t border-gray-800 pt-4 space-y-2">
                <Link
                  href="/contato"
                  className="flex items-center gap-2 p-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  Contatos
                </Link>
                <Link
                  href="/pedidos"
                  className="flex items-center gap-2 p-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Compras antigas
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
