# 🍽️ MealTracker – Gestão de Refeições

Aplicação Full Stack desenvolvida como parte do **Desafio Técnico – Estágio Full Stack** da Prismma.

O **MealTracker** é uma solução web completa que permite aos usuários registrarem, visualizarem e acompanharem suas refeições diárias de forma simples, rápida e inteligente. O sistema foi construído integrando funcionalidades modernas como **login com Google (NextAuth)** e **preenchimento inteligente com IA**, que interpreta imagens de refeições e preenche automaticamente os dados nutricionais, como nome, descrição e calorias estimadas.

Com interface intuitiva e responsiva, o projeto oferece uma experiência fluida tanto para dispositivos móveis quanto desktops. Toda a gestão de dados é feita com persistência no **MongoDB Atlas**, e o sistema está publicado com deploy contínuo na **Vercel**, permitindo acesso público imediato.

> Desenvolvido por: **Maycow Jordny**

---

## ▶️ Video aplicação

Assista o [video]() da apresentação do projeto!

## 🌐 Deploy

🔗 Acesse a aplicação: [https://desafio-tecnico-prismma-5sei.vercel.app/](https://desafio-tecnico-prismma-5sei.vercel.app/)

---

## 🧠 Sobre o Projeto

O **MealTracker** é uma aplicação web para gerenciamento de refeições diárias.  
Permite registrar refeições com os seguintes dados:

- 📝 Nome
- 🧾 Descrição
- 🔢 Quantidade de calorias
- 📅 Data e hora
- 🍽️ Tipo da refeição: Café da manhã, Almoço, Lanche da tarde ou Janta

---

## ✅ Funcionalidades

- [x] Criar, visualizar, editar e excluir refeições (CRUD completo)
- [x] Filtrar refeições por tipo (Café da manhã, Almoço, Lanche da tarde, Janta)
- [x] Dashboard com:
  - Listagem das refeições do dia
  - Total de calorias do dia atual
- [x] Editar e excluir refeições diretamente pela interface
- [x] Deploy online na Vercel
- [x] Conexão com MongoDB Atlas

---

## 🛠️ Tecnologias Utilizadas

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Zod](https://zod.dev/)
- [Material UI (MUI)](https://mui.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Vercel](https://vercel.com/)
- [Jest](https://jestjs.io/)

---

## ✨ Diferenciais implementados

- ✅ **Login com Google (NextAuth)**: autenticação rápida e segura.
- ✅ **Landing Page promocional**: simula um produto real.
- ✅ **Demonstração em vídeo**: mostra a aplicação em funcionamento.
- ✅ **Reconhecimento de imagem com IA (Gemini API)**: obtém as informações da refeição e ingredientes.
- ✅ **Estimativa de calorias com IA (Gemini API)**: calcula automaticamente as calorias da refeição baseada na descrição.
- ✅ **Exemplo de implementação de teste**: implemetado como um exemplo de proficiência teste unitário.
- ✅ **Arquitetura limpa + DDD**: implemetado arquitetura limpa e ddd ao projeto.

---

## 💡 Idéias de evolução para o futuro

- **Melhorias tecnicas**

  - **Aumentar a cobertura de testes unitários/integrados**
  - **Criar testes e2e**
  - **Adicionar ferramentas de observabilidade**
  - **Melhorar performace do banco criando indices**

- **Melhorias de negocio**
  - **Criar assinatura recorrente**
  - **Mostrar macronutrientes das refeições**
  - **Calcular taxa de metabolismo basal**
  - **Sugerir dietas para o objetivo do cliente (emagrecimento, ganho de massa, etc...)**
  - **Marketplace com profissionais da saúde (nutricionistas, personais, etc..)**

## ▶️ Como rodar localmente

1. **Clone o repositório**

   ```bash
   git clone https://github.com/maycowjordny/desafio-tecnico-prismma.git

   cd desafio-tecnico-prismma

   ```

   2. **Instale as dependências**

   ```bash
   npm install

   ```

2. **Adicione as variáveis ao seu env**

```bash
DATABASE_URL=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome-do-banco>?retryWrites=true&w=majority
NODE_ENV=development
GOOGLE_CLIENT_ID=sua_google_client_id
GOOGLE_CLIENT_SECRET=sua_google_client_secret
GEMINI_SECRET_KEY=sua_api_key_da_gemini
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=uma_chave_aleatória_segura

```

**Para utilizar as credenciais reais basta acessar esse [vault](https://envshare.dev/unseal#ezyv7oatoDoNmrftTXce9j2akVKF12FVUAjK4hiLtdDR)**

**IMPORTANTE** : Essas credenciais expiram em 30 dias e so permitem 10 consultas ao vault

4.  **Inicia a aplicação**

```bash
npm run dev
```
