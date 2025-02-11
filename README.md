# How to host app

- Install **docker** and **docker-compose**

- Copy **.env-template** to **.env**

```
cp .env-template .env
```

- Host server with **docker-compose**

```
docker-compose up -d
```

### Default hosting ports

- Backend: 8000
- Frontend: 3000
- Database: 3306