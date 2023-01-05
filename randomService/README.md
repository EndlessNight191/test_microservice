
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
запуск миграций, сидов
```bash
  npm run prisma:generate
  npm run prisma:migrate
  npm run prisma:seeds
```

## .env
```bash
DATABASE_URL=postgresql://postgres:123456@127.0.0.1:5432/test_tusk_prisma
```

Дополнительно зайди по пути /src/prisma/schema.prisma и на строчке номер укажите ссылку DATABASE_URL
## ROUTES
Документация пока не написано, актуальные запросы указаны в виду коллекции postman в корне проекта ("testPrisma.postman_collection.json")
