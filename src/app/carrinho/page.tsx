"use client";
import { useCart } from "@/context/CartContext";

export default function CarrinhoPage() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Meu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-300">
            {cartItems.map((item) => (
              <li key={item.id} className="flex gap-4 items-center py-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × R$ {item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right mt-6">
            <p className="text-lg font-bold">
              Total: <span className="text-orange-600">R$ {total.toFixed(2)}</span>
            </p>
          </div>
        </>
      )}
    </main>
  );
}
