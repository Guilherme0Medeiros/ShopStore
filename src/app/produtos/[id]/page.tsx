import ProductDetail from "@/components/ProductDetail";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  if (!res.ok) {
    return <div>Produto não encontrado</div>;
  }
  const product = await res.json();

  return (
    <main className="flex justify-center items-center min-h-[80vh] bg-background py-8">
      <ProductDetail product={product} />
    </main>
  );
}
