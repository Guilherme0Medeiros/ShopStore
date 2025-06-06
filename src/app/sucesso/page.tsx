"use client"
import { useCart } from "@/context/CartContext"
import { useState } from "react"

export default function SucessoPage() {
  const { cartItems, removeFromCart } = useCart()
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false)

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  function finalizarPedido() {
    // Limpa todos os itens do carrinho
    cartItems.forEach((item) => removeFromCart(item.id))
    setPedidoFinalizado(true)
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-green-600 flex items-center gap-2">
        🎉 Resumo do Pedido
      </h1>

      {pedidoFinalizado ? (
        <div className="w-full text-center py-10">
          <div className="text-4xl mb-2">✅</div>
          <h2 className="text-xl font-bold text-green-700 mb-1">Compra realizada com sucesso!</h2>
          <p className="text-gray-600 mt-2">Volte para a página inicial para continuar comprando.</p>
        </div>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-300 bg-white rounded-lg shadow mb-6">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-4 items-center py-4 px-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-contain"
                    />
                    <div className="flex-1">
                      <h2 className="font-semibold">{item.title}</h2>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold text-orange-600">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-xl font-bold text-orange-600">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={finalizarPedido}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Finalizar Pedido
              </button>
            </>
          )}
        </>
      )}
    </main>
  )
}
