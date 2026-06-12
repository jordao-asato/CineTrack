# CineTrack — Catálogo e Acompanhamento de Filmes

> Aplicativo mobile (React Native + Expo) para descobrir, organizar e acompanhar filmes, integrado à API do TMDB (The Movie Database).

---

## 📋 Sobre o Projeto

O **CineTrack** é um aplicativo mobile que permite ao usuário explorar filmes populares, buscar títulos específicos, visualizar detalhes (sinopse, pôster) e organizar sua experiência de consumo de mídia em duas listas: **Watch List** (filmes para assistir) e **Filmes Assistidos**. Os dados de filmes são obtidos em tempo real através da API pública do **TMDB**, e o estado das listas do usuário é gerenciado globalmente via **Context API** do React.

---

## 🚀 Funcionalidades

- 🔍 **Busca de filmes** — pesquisa por título via integração com a API do TMDB
- 🔥 **Filmes populares** — exibição de lista de filmes em alta no momento
- 🎬 **Detalhes do filme** — pôster, título e sinopse completa
- ➕ **Watch List** — adicionar/remover filmes da lista de "para assistir"
- ✅ **Filmes Assistidos** — marcar filmes como assistidos e gerenciar essa lista
- 📱 **Navegação por abas** — Home, Filmes Assistidos e Watch List, com navegação em pilha para detalhes

---

## 🏗️ Arquitetura

```
App.js
 ├─ GlobalProvider (Context API)
 │    └─ estado global: watchList, watched
 │
 └─ NavigationContainer
      ├─ BottomTabNavigator
      │    ├─ HomeScreen ───────► busca + populares (tmdbApi)
      │    ├─ WatchListStack ───► WatchListScreen
      │    └─ FilmesAssistidosStack ─► WatchedScreen
      │
      └─ MovieDetailsScreen (stack root)
           └─ adiciona filme ao Context (watched / watchList)
```

O app segue uma arquitetura típica de React Native com Expo: navegação em camadas (Bottom Tabs + Stacks), estado global compartilhado via Context API, e uma camada de serviço (`tmdbApi`) isolando as chamadas HTTP à API externa.

---

## 📁 Estrutura do Projeto

```
.
├── App.js                          # Componente raiz, configura navegação e contexto global
├── index.js                        # Entry point (registro do app via Expo)
├── package.json
├── .env.example                    # Modelo de configuração da chave da API TMDB
└── src/
    ├── api/
    │   └── tmdbApi.js               # Cliente único da API TMDB (busca, populares, detalhes)
    ├── context/
    │   └── GlobalContext.js          # Context API: watchList, watched e suas operações
    ├── navigation/
    │   ├── BottomTabNavigator.js      # Navegação por abas (Home, Assistidos, Watch List)
    │   ├── WatchListStack.js           # Stack de navegação da aba Watch List
    │   └── FilmesAssistidosStack.js    # Stack de navegação da aba Filmes Assistidos
    ├── screens/
    │   ├── HomeScreen.js               # Busca de filmes + lista de populares
    │   ├── ExploreScreen.js            # Exploração de filmes populares com pôsteres
    │   ├── WatchListScreen.js          # Lista de filmes a assistir
    │   ├── WatchedScreen.js            # Lista de filmes assistidos
    │   ├── MovieDetailsScreen.js        # Detalhes do filme + ações (adicionar às listas)
    │   └── DimensionsScreen.js          # Utilitário: exibe dimensões da tela
    ├── components/
    │   ├── MovieInput.js                # Input reutilizável para adicionar filme por nome
    │   └── MovieItem.js                  # Item de lista reutilizável (título + remover)
    └── utils/
        └── storage.js                  # Persistência local com AsyncStorage
```

---

## 🛠️ Tecnologias

- **React Native** + **Expo**
- **React Navigation** (Bottom Tabs + Stack Navigator)
- **Context API** — gerenciamento de estado global
- **Axios** — requisições HTTP
- **TMDB API** — base de dados de filmes
- **AsyncStorage** — persistência local de dados

---

## ⚙️ Como Executar

### 1. Pré-requisitos

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`) ou uso via `npx`
- App **Expo Go** no celular (ou emulador Android/iOS)

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar a chave da API TMDB

Crie uma conta gratuita em [themoviedb.org](https://www.themoviedb.org/), gere uma API Key em **Configurações > API**, e então:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e cole sua chave:

```
EXPO_PUBLIC_TMDB_API_KEY=sua_chave_aqui
```

O prefixo `EXPO_PUBLIC_` é necessário para que o Expo exponha a variável ao código do app (SDK 49+). O arquivo `.env` já está no `.gitignore` e nunca deve ser commitado.

### 4. Rodar o projeto

```bash
npx expo start
```

Escaneie o QR Code com o app Expo Go ou execute em um emulador.


## 👤 Autor

**Jordão Asato**
