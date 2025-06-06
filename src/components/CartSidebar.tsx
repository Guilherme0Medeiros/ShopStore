"use client"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/components/AuthProvider"
import { useEffect, useState } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: Props) {
  const { cartItems, addToCart, removeFromCart } = useCart()
  const { user } = useAuth()
  const [error, setError] = useState("")

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleSidebarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Fechar com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Prevenir scroll do body quando o carrinho estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen, onClose])

  function decreaseQuantity(id: number) {
    const item = cartItems.find((i) => i.id === id)
    if (item && item.quantity === 1) {
      removeFromCart(id)
    } else if (item) {
      addToCart({ id, title: item.title, price: item.price, image: item.image })
      setTimeout(() => removeFromCart(id), 0)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={handleSidebarClick}
      >
        {/* Header fixo */}
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold">Seu Carrinho</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Área de scroll com os itens */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
          <div className="p-4 flex flex-col gap-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500">Seu carrinho está vazio.</p>
                <p className="text-sm text-gray-400 mt-2">Adicione alguns produtos para começar!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-start border-b pb-4 last:border-b-0">
                  <div className="flex flex-col gap-1 w-full">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      R$ {item.price.toFixed(2)} × {item.quantity}
                    </p>
                    <p className="font-semibold text-orange-600">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black border rounded hover:bg-gray-50 transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          addToCart({ id: item.id, title: item.title, price: item.price, image: item.image })
                        }
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black border rounded hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 text-lg ml-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                    title="Remover item"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer fixo com total e botão */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-gray-50 flex-shrink-0">
            <div className="flex justify-between font-semibold mb-4 text-lg">
              <span>Total:</span>
              <span className="text-orange-600">R$ {total.toFixed(2)}</span>
            </div>
            {error && (
              <div className="text-red-500 mb-2 text-center text-sm">{error}</div>
            )}
            <button
              onClick={() => {
                if (!user) {
                  setError("Você precisa estar logado para finalizar a compra!");
                  return;
                }
                setError("");
                onClose();
                window.location.href = "/sucesso";
              }}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </>
  )
}
