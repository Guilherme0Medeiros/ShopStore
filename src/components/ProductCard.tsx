"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
};

export default function ProductCard({ id, title, image, price }: ProductCardProps) {
  const { addToCart } = useCart();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault(); // Evita que o botão clique também o <Link>
    addToCart({ id, title, price, image });
  }

  return (
    <Link
      href={`/produtos/${id}`}
      className="bg-white rounded-xl border-2 border-green-500 shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 p-4 max-w-xs mx-auto flex flex-col items-center text-center"
    >
      <div className="aspect-[3/3.8] mb-4 w-full">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 rounded-md">
            <span>Sem imagem</span>
          </div>
        )}
      </div>

      <h2 className="text-base font-semibold text-gray-800 line-clamp-2">{title}</h2>

      <div className="mt-2">
        <p className="text-lg font-bold text-orange-600">R$ {price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">6x de R$ {(price / 6).toFixed(2)} sem juros</p>
        <p className="text-sm text-orange-500 font-semibold">3% OFF à vista no Pix</p>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full mt-3 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
      >
        Adicionar ao carrinho
      </button>
    </Link>
  );
}
