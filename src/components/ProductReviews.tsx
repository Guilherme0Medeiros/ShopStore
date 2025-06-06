import { Star } from "lucide-react"

export default function ProductReviews({ rating }: { rating: { rate: number, count: number } }) {
  // Mock de avaliações
  const reviews = [
    { user: "João", stars: 5, text: "Produto excelente, chegou rápido!" },
    { user: "Maria", stars: 4, text: "Bom custo-benefício. Recomendo." },
    { user: "Carlos", stars: 3, text: "Produto ok, mas poderia ser melhor embalado." }
  ]
  return (
    <div className="space-y-4 mt-2">
      {reviews.map((rev, i) => (
        <div key={i} className="p-3 rounded-lg border bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="font-bold">{rev.user}</span>
            {[...Array(5)].map((_, j) => (
              <Star key={j} size={16} className={j < rev.stars ? "text-yellow-400" : "text-gray-300"} />
            ))}
          </div>
          <p className="mt-1 text-gray-700">{rev.text}</p>
        </div>
      ))}
      <div className="text-xs text-gray-400">Avaliação média: {rating.rate} ({rating.count} avaliações)</div>
    </div>
  )
}
