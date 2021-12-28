Este é um projeto [Next.js](https://nextjs.org/) criado através do método [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Sobre

Projeto web de uma página incial de um portal de assinatura de notícias sobre o ecossistema da tecnologia React.

O foco principal de estudo é entender e aplicar os conceitos e fundamentos utilizados no framework de desenvolvimento NextJs.

Os principais pontos e tecnologias abordados neste projeto, foram:

- Server Side Rendering (Renderizando a aplicação do lado servidor, quais problemas são resolvidos e em quais contextos aplicar)

- Static Site Generation (Geração de site estático, aplicado num contexo no qual evita que uma mesma requisição seja feita de forma desnecessária por usuários diferentes)

- Client-side (Requisições feitas pelo client do usuário após a aplicação já estar renderizada)

- Utilização da api de pagamentos de serviços Stripe

## Novas Funcionalidades

Na segunda etapa do módulo foram apresentadas e aplicadas as seguintes features:

- Criação e configuração de rotas de uma API Serveless

- Autenticação via Github [NextAuth.js](https://next-auth.js.org/)

- Conexão e configuração com o banco de dados [FaunaDB](https://fauna.com/)
  -- FQL
  -- CRUD básico

- Configuração do gateway de pagamento da [Stripe SDK](https://stripe.com/br)
  -- consumo privado de informações (sessões de usuários, dados sensíveis, etc...)

- Utilização da api web da [Stripe.js](https://stripe.com/docs/js)
  -- consumo público de informações (valores, informações de planos)

- Monitoramento de eventos através de webhooks utilizando o [Stripe CLI](https://stripe.com/docs/cli)
  -- salvar informações das assinaturas efetuadas pelos usuários que se cadastraram na aplicação

- Integração com as APIs do CMS [Prismic](https://prismic.io/)

- Páginas de Posts e Preview

- Regras de redirecionamento para usuários não logados ou sem assinatura.

## Executando

Primeiramente, execute o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
```

Em outro terminal
Necessário instalar o [Stripe CLI](https://stripe.com/docs/cli)

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

![Home Page](/public/images/home-page.png "Home Page")
![Github Auth](/public/images/git-auth.png "Github Auth")
![Stripe Gateway](/public/images/stripe-pay.png "Stripe Gateway")
![Posts](/public/images/posts.png "Not Found Posts")
![Preview Posts](/public/images/preview.png "Not Found Posts")
![Not Found Posts](/public/images/not-found.png "Not Found Posts")

_keep learning..._
