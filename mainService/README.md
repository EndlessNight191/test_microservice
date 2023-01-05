
# Test tusk


A brief description of what this project does and who it's for


## Start

"серктный" код для авторизации вшит в файе, auth.middleware и auth.controller - "admin"

To deploy this project run

```bash
  npm run start
```
to start
```bash
  npm run dev
```


## Installation

Install my-project with npm

```bash
  npm i
```
запуск миграций
```bash
  npm run prisma:generate
  npm run prisma:migrate
```

## .env
```bash
DATABASE_URL=mysql://root:123456@127.0.0.1:3306/test_microservice
```

Дополнительно зайди по пути /src/prisma/schema.prisma и на строчке номер укажите ссылку DATABASE_URL
## ROUTES
Актуальные запросы указаны в коллекции postman в корне проекта ("testPrisma.postman_collection.json")
