# App

GymPass style app.

## RF: requisitos funcionais

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizado pelo usuário;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RN: regras de negócio

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNF: requisitos não funcionais

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
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
