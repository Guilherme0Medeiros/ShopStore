import ProductCard from "@/components/ProductCard";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "ShopStore",
  description: "Uma loja virtual fictícia com Next.js",
}


type Produto = {
  id: number;
  title: string;
  image: string;
  price: number;
};

async function getProdutos(): Promise<Produto[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}

export default async function HomePage() {
  const produtos = await getProdutos();

  return (
    <main className="p-6">
      <div className="flex flex-wrap gap-6 justify-center">
        {produtos.map((produto) => (
          <ProductCard
            key={produto.id}
            id={produto.id}
            title={produto.title}
            image={produto.image}
            price={produto.price}
          />
        ))}
      </div>
    </main>
  );
}
