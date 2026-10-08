# Vue Lottery App - лабораторна №4

Застосунок-лотерея на Vue 3, TypeScript і Composition API.

## Що є в проєкті

- реєстрація учасника з валідацією і перевіркою унікального e-mail;
- випадковий вибір до трьох переможців;
- таблиця учасників: пошук, сортування, редагування і видалення;
- збереження учасників у `localStorage` через `watch` з `deep: true`;
- компоненти `AppButton`, `FormField`, `WinnerCard`, `WinnersPanel`, `ParticipantForm`, `ParticipantsTable`, `SearchBar`, `AppModal`;
- Bootstrap, імпортований через npm, і SCSS.

## Запуск

```bash
npm install
npm run dev
```

Відкрий адресу з термінала, зазвичай `http://localhost:5173`.

## Перевірка

```bash
npm run type-check
npm run build
```
