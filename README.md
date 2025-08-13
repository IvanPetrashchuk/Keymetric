# Keystroke Metrics App

Цей проєкт складається з двох основних частин:
1.  **Бекенд (NestJS):** API-сервер для збереження та обробки даних про натискання клавіш.
2.  **Фронтенд (Next.js):** Клієнтський додаток для візуалізації статистики в реальному часі.

---

### Вимоги

-   [Node.js](https://nodejs.org/) (v18 або вище)
-   [Docker](https://www.docker.com/)

---

### Інструкція з підняття PG БД через Docker

Для роботи проєкту необхідна база даних PostgreSQL. 
Її можна запустити за допомогою Docker.

1.  Перейдіть до кореневого каталогу проєкту:
    ```bash
    cd /path/to/your/project
    ```
2.  Запустіть файл `docker-compose.yml` з наступним вмістом:
    ```yaml
    version: '3.8' 

    services:
      postgres_db: 
        image: postgres:16 
        restart: always 
        environment: 
          POSTGRES_USER: userDB 
          POSTGRES_PASSWORD: P@ssword123
          POSTGRES_DB: keymetricdb  
        ports:
          - "5432:5432" 
        volumes:
          - db_data:/var/lib/postgresql/data 
        networks:
          - pg_network 

    volumes:
      db_data: 

    networks:
      pg_network: 
        driver: bridge 

    ```
3.  Запустіть контейнер Docker, виконавши команду:
    ```bash
    docker compose -f docker-compose-pg.yaml up -d                 
    ```
    Це запустить базу даних PostgreSQL на порту `5432`.

---

### Інструкція зі встановлення та запуску

#### 1. Бекенд (NestJS)

1.  Перейдіть до каталогу бекенду:
    ```bash
    cd app/server
    ```
2.  Встановіть залежності:
    ```bash
    npm install
    ```

3.  Запустіть сервер у режимі розробки:
    ```bash
    npm run start:dev
    ```
    Бекенд буде доступний за адресою `http://localhost:3001`.


#### 2. Фронтенд (Next.js)

1.  Перейдіть до каталогу фронтенду:
    ```bash
    cd app/client
    ```
2.  Встановіть залежності:
    ```bash
    npm install
    ```
3.  Запустіть сервер у режимі розробки:
    ```bash
    npm run dev
    ```
    Фронтенд буде доступний за адресою `http://localhost:3000`.

Після запуску обох частин проєкту ви зможете відкрити `http://localhost:3000` у браузері та почати працювати з додатком.

<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=11aiH4WYbL9niGtrhmo7r17_sxnW_cJ3m" width="100%"/>
  <img src="https://drive.google.com/uc?export=view&id=1sl8YqqEDgYWZdotY-3t9G68opbQ-SKis" width="100%"/>
  <img src="https://drive.google.com/uc?export=view&id=1JF3sIfb-cc4vHMiYulBrOdpp6uVQvwHH" width="100%"/>
  <img src="https://drive.google.com/uc?export=view&id=13NmCBxKK0SCJZ9z5QVKuBi5LhlSVnhng" width="100%"/>
</p>