# App

GymPass style app.

## RF: requisitos funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizado pelo usuário;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RN: regras de negócio

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver até 100m da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNF: requisitos não funcionais

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas lista de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## fundamentos

| func                     | desc                                                  |
| ------------------------ | ----------------------------------------------------- |
| `npx prisma init`        | inicializa o prisma cli                               |
| **schema**               | representação das tabelas no BD                       |
| `npx prisma generate`    | gera a tipagem Typescript automaticamente do schema   |
| `npx prisma migrate dev` | executa a ultima mudança feita na migration para o DB |

O que é o Docker?

Docker é uma plataforma de software que permite criar, implantar e executar aplicativos em contêineres virtuais. Ele permite que as aplicações e seus componentes sejam empacotados em um contêiner isolado e portátil, que pode ser executado em qualquer ambiente que tenha o Docker instalado, sem a necessidade de instalar dependências adicionais ou fazer grandes configurações. Com o Docker, é possível ter ambientes de desenvolvimento, teste e produção consistentes, seguros e escaláveis, aumentando a eficiência e a produtividade do desenvolvimento de software.

## Repository Pattern

- repository: todas as operações de banco de dados passam pelo repo

  - SOLID
  - D (dependency Inversion Principle): os arquivos que precisarem do UseCase, é esse arquivo que deve enviar as dependências

## Mocking

- Criar valores fictícios para dados, funções...

## Tests

- E2E: testa desde à rota até a chamada no banco de dados, ou até o retorno dos dados
  - testar a aplicação de ponta á ponta, testa como o usuário vai usar a API.

`npm link | npm link [vitest-env-prisma]`: para poder utilizar a lib local de environment

os `scripts` arquivo `package.json`, todo comando que começar com `pre` vai ser executado antes de qualquer escript, ao contrário do `post`.

- ex: `pre[test]: 'run vitest' | post[test]: 'run vitest'`
