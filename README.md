# catalogo-app
Catálogo de filmes utilizando React, Next.js e TanStack Query com a API do TMDB.

---

## Variáveis de ambiente

Para rodar este projeto, você precisa de uma chave da API do TMDB.

Preencha o arquivo `.env.example` com sua chave:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_IMAGE_URL=https://image.tmdb.org/t/p/w500
```

O arquivo `.env.local` deve permanecer local e não deve ser enviado ao Git.

## Como rodar

Instale as dependências e então execute o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Sobre o projeto

Este projeto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar fontes automaticamente.

## Mais informações

- [Documentação do Next.js](https://nextjs.org/docs)