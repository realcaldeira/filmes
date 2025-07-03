# 🎬 Movie Search App

Uma aplicação fullstack completa para busca e visualização de filmes e séries, desenvolvida com Spring Boot (backend) e React (frontend).

## 📋 Características

### Backend (Spring Boot)
- ✅ API REST completa com endpoints para busca e detalhes
- ✅ Dados mockados com filmes populares
- ✅ Cache implementado com Caffeine
- ✅ Documentação OpenAPI/Swagger
- ✅ Paginação de resultados
- ✅ Configuração CORS
- ✅ Logs estruturados
- ✅ Health checks

### Frontend (React)
- ✅ Interface moderna e responsiva
- ✅ Busca com filtros (título, ano, tipo)
- ✅ Listagem paginada de resultados
- ✅ Página de detalhes completa
- ✅ Loading states e tratamento de erros
- ✅ Design gradient moderno
- ✅ Layout responsivo

## 🚀 Como executar com Docker

### Pré-requisitos
- Docker instalado
- Docker Compose instalado

### Executando a aplicação

1. **Clone ou navegue até o diretório do projeto:**
   ```bash
   cd "c:\Users\Lucas Caldeira\Desktop\Teste"
   ```

2. **Execute com Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui.html

### Para parar a aplicação:
```bash
docker-compose down
```

## 🎯 Como usar

### Busca de Filmes
1. Digite o título do filme na barra de pesquisa
2. Opcionalmente, adicione filtros:
   - **Ano**: Digite um ano específico
   - **Tipo**: Selecione "Filmes" ou "Séries"
3. Clique em "Buscar"

### Visualizar Detalhes
- Clique em qualquer card de filme na listagem
- Veja informações completas como:
  - Sinopse
  - Elenco e diretor
  - Avaliações IMDb
  - Prêmios e indicações
  - Informações técnicas

### Navegação
- Use os botões "Anterior" e "Próxima" para navegar entre páginas
- Clique em "Voltar" para retornar à busca

## 📊 Dados Disponíveis

A aplicação inclui filmes mockados populares como:
- The Shawshank Redemption
- The Dark Knight
- Forrest Gump
- Fight Club
- The Lord of the Rings
- Interstellar
- The Departed
- Breaking Bad (série)
- Game of Thrones (série)
- Sherlock (série)
- Stranger Things (série)

## 🔧 Endpoints da API

### Buscar Filmes
```
GET /api/movies/search?s={title}&y={year}&type={type}&page={page}
```

### Detalhes do Filme
```
GET /api/movies/{imdbId}
```

### Documentação Completa
Acesse: http://localhost:8080/swagger-ui.html

## 📱 Screenshots

### Tela de Busca
- Interface limpa com campo de busca e filtros
- Gradient moderno azul/roxo
- Cards responsivos com posters dos filmes

### Tela de Detalhes
- Layout em duas colunas (poster + informações)
- Informações completas do filme
- Design elegante e moderno

## 🛠️ Tecnologias Utilizadas

### Backend
- Spring Boot 3.2.0
- Java 17
- Maven
- Caffeine Cache
- OpenAPI/Swagger
- Docker

### Frontend
- React 19
- TypeScript
- CSS3 com gradients
- Fetch API
- Docker

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │
│   (React)       │───▶│  (Spring Boot)  │
│   Port: 3000    │    │   Port: 8080    │
└─────────────────┘    └─────────────────┘
        │                       │
        └───────────────────────┘
              Docker Network
```

## 🎨 Features Implementadas

- [x] Busca por título com filtros
- [x] Paginação de resultados
- [x] Cache de dados
- [x] Interface responsiva
- [x] Loading states
- [x] Tratamento de erros
- [x] Documentação OpenAPI
- [x] Docker containerization
- [x] Dados mockados ricos
- [x] Design moderno

## 🚀 Melhorias Futuras

- [ ] Tema escuro/claro
- [ ] Sistema de favoritos
- [ ] Filtros avançados
- [ ] Busca por ator/diretor
- [ ] Integração com API real (OMDb)
- [ ] Autenticação de usuários
- [ ] Histórico de buscas
# filmes
