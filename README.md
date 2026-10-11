# Vue Lottery — лабораторна №5

Застосунок на Vue 3 і TypeScript для лабораторної роботи про Vue Router, Repository pattern та JWT-авторизацію.

## Що реалізовано

- маршрути Home, About author, Users, Login і сторінка 404;
- захист `/users` через navigation guard і `meta.requiresAuth`;
- Users API DummyJSON: список, пошук, пагінація, деталі, створення, редагування й видалення;
- Repository pattern: `UserService`, `AuthService`, `ServiceProvider`, узагальнені інтерфейси;
- Pinia store для авторизації та списку users;
- JWT: `accessToken`, `refreshToken`, Logout і автоматичне оновлення токена після 401;
- VeeValidate + Zod для форм Login та User;
- `.env` для адреси API та `.env.example` для репозиторію.

## Запуск

```bash
npm install
npm run dev
```

Відкрий адресу з термінала, зазвичай `http://localhost:5173/`.

Тестовий логін DummyJSON:

```text
username: emilys
password: emilyspass
```

## Перевірка

```bash
npm run type-check
npm run build
npm run lint:check
```
