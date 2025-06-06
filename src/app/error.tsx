"use client";
import { Button } from "@nextui-org/react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <html>
      <body className="bg-gradient-to-br from-red-50 to-orange-100 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 flex flex-col items-center">
          <div className="text-6xl mb-2">😵</div>
          <h2 className="text-2xl font-bold mb-2 text-red-500">
            Ops! Algo deu errado
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Houve um erro inesperado.
            <br />
            Você pode tentar novamente ou voltar para a página inicial.
          </p>
          <div className="flex gap-3">
            <Button
              className="mt-4 font-bold bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => reset()}
            >
              Tentar novamente
            </Button>
            <Button
              className="mt-4 font-bold bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => (window.location.href = "/")}
            >
              Voltar para Home
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
