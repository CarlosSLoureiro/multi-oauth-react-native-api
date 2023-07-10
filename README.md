# ⚙️ API for [Multi OAuth Example App with React Native](https://github.com/CarlosSLoureiro/multi-oauth-react-native)

> Essa aplicação foi desenvolvida para o gerenciamento do aplicativo **Multi OAuth Example App**. Note que ambas as aplicações foram desenvolvidas para fins educacionais e experiência.

Essa aplicação foi desenvolvida baseado em um contexto mais ou menos de como é praticado em um cenário real: com um fluxo de deploy automatizado para o servidor onde a aplicação está hospedada. Nesse caso, usando *GitHub Actions* a cada criação de tag no repositório.


# ✅ Características

- [x] Feito em *TypeScript* com *Express.js*
- [x] Modelagem do banco com *Sequelize*
- [x] Documentação com *Swagger* ([Link para o Swagger](https://api-multi-oauth-react-native.carlosloureiro.xyz/swagger/))
- [x] Injeção de dependências com *InversifyJS*
- [x] Autenticação com *JSON Web Token*
- [x] Autenticação OAuth com *Passport.js*
- [x] Validação de requisições com *Joi*
- [x] Testes unitários com *Jest*
- [x] Ambiente com *Docker* e *Docker Swarm* (com *Redis*)
- [x] Fluxo de deploy automatizado com *GitHub Actions*


# 💻 Pré-requisitos
Antes de começar, para executar a aplicação você precisará ter o [Docker](https://www.docker.com/) instalado em sua máquina.


# 🚀 Executando
Após clonar o projeto, siga estas etapas:

1. Faça uma cópia do arquivo `.env.example` para `.env` e configure com suas próprias credenciais.

2. Caso você não tenha um servidor [MySQL](https://www.mysql.com/), defina no arquivo `.env`: `MYSQL_HOST=host.docker.internal` e instale e execute-o usando o próprio Docker com o seguinte comando baixo:
```
docker run -p 3306:3306 --name mysql-server -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=app -d mysql
```

3. Abra o arquivo *HOSTS* do seu sistema operacional e aponte o domínio `api-multi-oauth-react-native-test.carlosloureiro.xyz` para `127.0.0.1`.

4. No diretório raiz do projeto, execute o comando abaixo para construir e iniciar o container da aplicação:
```
  docker-compose up -d --build
```

5. Acesse a documentação da API pelo url `http://api-multi-oauth-react-native-test.carlosloureiro.xyz/swagger` ou `http://localhost/swagger`.


Lembre-se de criar sua aplicação e suas próprias crendenciais para cada provedor oauth que você deseja testar na página de desenvolvedor do provedor. Por exemplo: https://cloud.google.com/ (Google), https://developer.twitter.com/ (Twitter).

Note que a cada alteração no arquivo `.env`, você precisará parar a aplicação com o comando `docker-compose down` e executar o comando do **passo 4** novamente.

# 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE) para mais detalhes.
