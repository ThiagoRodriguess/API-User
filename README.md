# Autenticação API

## Descrição

Esta API fornece funcionalidades básicas de autenticação, incluindo registro de usuários, login e recuperação de informações do usuário.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (ou outra base de dados)
- JWT (JSON Web Tokens)
- Outras dependências (listadas no package.json)

## Configuração do Projeto

1. **Instalação das Dependências:**
   ```bash
   npm install
   
2. **Execução do projeto:**
   ```bash
   npm start
   
3. **Execução do build:**
   ```bash
   npm run build

# MongoDB - Inicialização Rápida

Para utilizar este projeto, é necessário ter o MongoDB instalado na sua máquina. Siga os passos abaixo para instalar e iniciar o MongoDB:

## Pré-requisitos

- **MongoDB:**
  - Faça o download e instale o MongoDB no seu sistema. Você pode encontrar o instalador [aqui](https://www.mongodb.com/try/download/community).
  - Durante a instalação, escolha a opção de instalar o MongoDB como um serviço do Windows, se disponível.
  - Caso prefira, siga as [instruções de instalação detalhadas](https://docs.mongodb.com/manual/administration/install-community/) conforme o seu sistema operacional.

## Inicialização

1. **Crie um Diretório para Dados:**
   - Crie um diretório para armazenar os dados do MongoDB. Exemplo: `C:\data\db`.

2. **Inicie o MongoDB:**
   - Abra o Prompt de Comando ou PowerShell como administrador.
   - Navegue até o diretório do MongoDB. Exemplo:
     ```bash
     cd "C:\Program Files\MongoDB\Server\{versão}\bin"
     ```
   - Inicie o MongoDB executando:
     ```bash
     mongod
     ```

3. **Abra o Shell do MongoDB:**
   - Em outra janela do Prompt de Comando, navegue até o diretório do MongoDB e execute:
     ```bash
     cd "C:\Program Files\MongoDB\Server\{versão}\bin"
     mongo
     ```

Agora, o MongoDB está pronto para ser utilizado com este projeto.

---

**Observação:** Certifique-se de substituir `{versão}` pelo número da versão do MongoDB que você instalou.

## Endpoints Disponíveis

### Cadastro de Usuário (POST)

Registra um novo usuário.

**Endpoint:**
```bash
/signup
```

### Login com Usuário (POST)

Loga usuário.

**Endpoint:**
```bash
/signin
```

### Retornar Usuário (GET)

Busca usuário.

**Endpoint:**

### Cabeçalho de Autorização (Header)

Ao realizar requisições que requerem autenticação, adicione o seguinte cabeçalho à sua solicitação:

**Header:**
```bash
Authorization: Bearer [seu_token_jwt]
````

**Importante:** Substitua `[seu_token_jwt]` pelo token JWT obtido durante o processo de login.

## Testes com Postman

Os arquivos JSON para testes estão disponíveis na pasta `.postman`. Certifique-se de importar esses arquivos no Postman para realizar os testes dos endpoints da API.

1. Abra o Postman.

2. Importe os arquivos JSON de teste disponíveis em `.postman`.

3. Certifique-se de configurar o token JWT conforme indicado nos testes que requerem autenticação.

4. Execute os testes para cada endpoint conforme necessário.
