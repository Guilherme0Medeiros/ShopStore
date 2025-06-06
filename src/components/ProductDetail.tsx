"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button, Badge, Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react";
import ImageGallery from "./ImageGallery";
import ProductReviews from "./ProductReviews";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Preto");
  const [added, setAdded] = useState(false);

  // Mock de tamanhos e cores
  const sizes = ["P", "M", "G", "GG"];
  const colors = ["Preto", "Branco", "Azul"];

  // Função de adicionar ao carrinho
  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Card className="w-full max-w-3xl shadow-2xl rounded-2xl p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Galeria de imagens */}
        <div className="flex-1">
          <ImageGallery images={[product.image]} />
        </div>
        {/* Infos do produto */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Badge color="primary">{product.category}</Badge>
            <span className="text-yellow-400 flex items-center gap-1">
              <Star size={18} /> {product.rating.rate} ({product.rating.count})
            </span>
          </div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <div className="text-3xl font-extrabold mt-2 mb-1">
            R$ {product.price.toFixed(2)}
          </div>

          {/* Mock de variações */}
          <div className="flex gap-4 items-center">
            <div>
              <span className="font-semibold mr-2">Tamanho:</span>
              {sizes.map((s) => (
                <Button
                  key={s}
                  size="sm"
                  className={`mr-2 ${
                    selectedSize === s ? "bg-primary text-white" : ""
                  }`}
                  variant={selectedSize === s ? "solid" : "bordered"}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
            <div>
              <span className="font-semibold mr-2">Cor:</span>
              {colors.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  className={`mr-2 ${
                    selectedColor === c ? "bg-primary text-white" : ""
                  }`}
                  variant={selectedColor === c ? "solid" : "bordered"}
                  onClick={() => setSelectedColor(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          {/* Botão de adicionar */}
          <Button
            size="lg"
            className={`mt-4 font-bold bg-orange-500 hover:bg-orange-600 text-white`}
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? "Adicionado!" : "Adicionar ao Carrinho"}
          </Button>
          {/* Ações extras (curtir, compartilhar, etc) */}
          <div className="flex gap-3 mt-4">
            <Button isIconOnly variant="light">
              <Heart size={20} />
            </Button>
            <Button isIconOnly variant="light">
              <Share2 size={20} />
            </Button>
          </div>

          {/* Tabs de detalhes */}
          <Tabs aria-label="Detalhes do produto" className="mt-6">
            <Tab key="specs" title="Especificações">
              <ul className="text-sm list-disc ml-6 mt-2">
                <li>Categoria: {product.category}</li>
                <li>Marca: Mock Brand</li>
                <li>Tamanho: {selectedSize}</li>
                <li>Cor: {selectedColor}</li>
                <li>Garantia: 3 meses</li>
                {/* Adicione mais detalhes mockados */}
              </ul>
            </Tab>
            <Tab
              key="reviews"
              title={<span className="text-orange-500">Avaliações</span>}
            >
              <ProductReviews rating={product.rating} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Card>
  );
}
