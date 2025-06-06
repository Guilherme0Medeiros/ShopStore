"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardBody } from "@nextui-org/react"
import { Star } from "lucide-react"

interface Props {
  currentProductId: number
  category: string
}

const relatedProducts = [
  {
    id: 2,
    title: "Camiseta Dragon Ball Z",
    price: 79.9,
    originalPrice: 99.9,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: 3,
    title: "Camiseta One Piece",
    price: 85.9,
    originalPrice: 110.9,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: 4,
    title: "Camiseta Attack on Titan",
    price: 92.9,
    originalPrice: 120.9,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviewCount: 73,
  },
  {
    id: 5,
    title: "Camiseta Demon Slayer",
    price: 88.9,
    originalPrice: 115.9,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviewCount: 94,
  },
]

export default function RelatedProducts({ currentProductId, category }: Props) {
  const products = relatedProducts.filter((p) => p.id !== currentProductId)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/produto/${product.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardBody className="p-4">
                <div className="aspect-square mb-3 relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.title}</h3>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-600">R$ {product.price.toFixed(2)}</span>
                  </div>
                  <span className="text-xs text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</span>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
