import { Card, CardBody } from "@nextui-org/react"

export default function ImageGallery({ images }: { images: string[] }) {
  // Pode expandir pra galeria múltipla
  return (
    <Card className="w-72 h-72 flex items-center justify-center overflow-hidden">
      <CardBody className="flex items-center justify-center">
        <img src={images[0]} alt="Produto" className="object-contain w-full h-full" />
      </CardBody>
    </Card>
  )
}
