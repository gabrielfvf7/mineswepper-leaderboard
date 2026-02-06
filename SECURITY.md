# Configuração de Segurança - API Keys

## Como funciona a proteção da API Key

### 1. Arquivo `.env` (NUNCA vai pro GitHub)

```bash
API_SECRET_KEY=sua-chave-super-secreta-aqui-123456
```

### 2. Arquivo `.env.example` (vai pro GitHub como documentação)

```bash
API_SECRET_KEY=your-secret-api-key-here
```

### 3. Como configurar localmente

1. **Clone o repositório**

```bash
git clone [seu-repo]
cd minesweeper-leaderboard-api
```

2. **Instale as dependências**

```bash
npm install
```

3. **Crie seu arquivo `.env`**

```bash
cp .env.example .env
```

4. **Edite o `.env` com sua chave secreta**

```bash
# Mude esta linha:
API_SECRET_KEY=your-secret-api-key-here

# Para algo como:
API_SECRET_KEY=minha-chave-super-secreta-123456
```

### 4. Como configurar em produção

#### Vercel

```bash
vercel env add API_SECRET_KEY
```

#### Railway

No dashboard → Variables → Add Variable:

- Name: `API_SECRET_KEY`
- Value: `sua-chave-secreta`

#### Heroku

```bash
heroku config:set API_SECRET_KEY="sua-chave-secreta"
```

#### Docker

```bash
docker run -e API_SECRET_KEY="sua-chave-secreta" seu-app
```

### 5. Verificar se está funcionando

Execute: `npm run start:dev`

Se aparecer erro sobre `API_SECRET_KEY`, verifique se:

- ✅ Arquivo `.env` existe
- ✅ Variável `API_SECRET_KEY` está no `.env`
- ✅ Não há espaços extras na linha

### 6. Como usar nos testes HTTP

No arquivo `api-tests.http`, use:

```http
x-api-key: {{$dotenv API_SECRET_KEY}}
```

Isso vai buscar automaticamente do seu arquivo `.env`.
