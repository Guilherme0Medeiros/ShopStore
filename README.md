# Projeto: Shop Store 🛒

E-commerce fictício moderno desenvolvido com **Next.js** , **NextUI** e **Tailwind CSS**.  
Permite navegação, visualização de produtos, simulação de carrinho e autenticação fake, simulando uma loja online real

---

## ✨ Descrição

O **Shop Store** é uma aplicação front-end que simula um e-commerce completo, usando a [FakeStore API](https://fakestoreapi.com/) para dados de produtos.  
Entre as funcionalidades principais estão:

- **Página inicial** com listagem de produtos (busca via API pública)
- **Página de detalhes do produto** (rota dinâmica `/produtos/[id]`) com galeria, descrições, avaliações mockadas, variações de tamanho/cor e botão de adicionar ao carrinho
- **Carrinho de compras** como barra lateral , com ajuste de quantidade, remoção e resumo dinâmico
- **Login/registro fake** (simulação de autenticação)
- **Roteamento com App Router** (rotas dinâmicas e persistência de layout)
- **Estilização moderna** usando Tailwind CSS e componentes ricos do NextUI (HeroUI)
- **Loading/Error boundaries** para experiência polida
- **Deploy na Vercel** (link abaixo)

---

## 🛠️ Tecnologias utilizadas

- [Next.js (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextUI (HeroUI)](https://nextui.org/)
- [FakeStore API](https://fakestoreapi.com/)

---

## 🚀 Como rodar localmente

```bash
#Clone o Repositorio
git clone https://github.com/Guilherme0Medeiros/ShopStore
cd shop-store
#Instale as Rependencias
npm install
npm run dev
```

## 🌐 Links importantes

```bash
Deploy na Vercel: https://shop-store-red.vercel.app
Repositório GitHub: https://github.com/Guilherme0Medeiros/ShopStore
```


```bash

/shopstoree
│
└── src/
    │
    ├── app/
    │   ├── layout.tsx            # Layout global
    │   ├── page.tsx              # Página inicial
    │   ├── loading.tsx           # Tela de loading global
    │   ├── error.tsx             # Tela de erro global
    │   ├── providers.tsx         # Providers globais (Auth, Cart, NextUI)
    │   ├── globals.css           # Estilos globais (caso esteja aqui)
    │   ├── favicon.ico           # Ícone do site
    │   ├── login/
    │   │   └── page.tsx          # Página de login/cadastro
    │   ├── produtos/
    │   │   └── [id]/
    │   │       └── page.tsx      # Página de detalhes do produto
    │   ├── carrinho/
    │   │   └── page.tsx          # Página do carrinho
    │   └── sucesso/
    │       └── page.tsx          # Página de compra finalizada
    │
    ├── components/
    │   ├── CartSidebar.tsx       # Barra lateral do carrinho
    │   ├── ProductCard.tsx       # Card de produto para listagem
    │   ├── ProductDetail.tsx     # Detalhes do produto
    │   ├── Navbar.tsx            # Navegação principal
    │   ├── AuthProvider.tsx      # Contexto/autenticação simulada
    │   ├── AuthButton.tsx        # Botão de login/logout na navbar
    │   ├── ImageGallery.tsx      # Galeria de imagens do produto
    │   ├── ProductReviews.tsx    # Avaliações mockadas
    │   ├── RelatedProducts.tsx   # Produtos relacionados
    │
    └── context/
        └── CartContext.tsx       # Contexto do carrinho (com persistência)
```
## IMAGENS 

![prints readme1](https://github.com/user-attachments/assets/8527ea28-c10d-416e-bf16-dc05d50f1a4b)
![prints readme2](https://github.com/user-attachments/assets/f9d8223d-643d-4cc6-8e68-08886b9650da)
![prints readme3](https://github.com/user-attachments/assets/fa7bddff-438c-4859-bb37-c9218c109a39)



