---
title: Именование
---

# Именование

Именование должно быть предсказуемым, коротким и отражать смысл сущности.

## Базовые правила

| Что              | Рекомендуется          |
| ---------------- | ---------------------- |
| Папки            | `kebab-case`           |
| Файлы            | `kebab-case`           |
| Переменные       | `camelCase`            |
| Константы        | `SCREAMING_SNAKE_CASE` |
| Классы           | `PascalCase`           |
| React-компоненты | `PascalCase`           |
| Хуки             | `useSomething`         |
| CSS классы       | `camelCase`            |


## Архитектурный неймспейс

Соглашение о суффиксах, которые обозначают слой (уровень абстракции), роль или тип файла.

- Суффиксы используются для обозначения слоя, роли или типа файла.
- Суффиксы всегда пишутся в единственном числе.
- Формат имени: `name.<suffix>.ts` или `name.<suffix>.tsx`.

**UI и слои FSD**
- `.screen.tsx` — экран
- `.layout.tsx` — layout
- `.widget.tsx` — виджет
- `.feature.tsx` — UI фичи
- `.entity.tsx` — UI сущности
- `.ui.tsx` — UI‑компонент

**Логика и модель**
- `.store.ts` — стор
- `.service.ts` — сервис

**Типы и контракты**
- `.type.ts` — типы и интерфейсы
- `.interface.ts` — файл с интерфейсами (если нужен отдельный контракт)
- `.enum.ts` — enum
- `.dto.ts` — внешние DTO
- `.schema.ts` — схемы валидации
- `.constant.ts` — константы
- `.config.ts` — конфигурация

**Утилиты и хелперы**
- `.util.ts` — утилиты
- `.helper.ts` — вспомогательные функции
- `.lib.ts` — вспомогательные функции

**Тесты**
- `.test.ts` / `.test.tsx`
- `.mock.ts`


**Хорошо**
```text
src/
├── screens/
│   └── main/
│       ├── main.screen.tsx
│       └── index.ts
├── features/
│   └── auth-by-email/
│       ├── ui/
│       │   └── login-form.ui.tsx
│       ├── auth-by-email.feature.tsx
│       └── index.ts
└── shared/
    └── ui/
        └── icon/
            ├── icon.ui.tsx
            └── icon.module.css
```

**Плохо**
```text
// Плохо: нет единых правил для слоёв и публичных файлов.
src/
├── screens/
│   └── Main/
│       └── Main.tsx
└── features/
    └── authByEmail/
        └── login-form.tsx
```

## Булевы значения

- Использовать префиксы `is`, `has`, `can`, `should`.

**Хорошо**
```ts
const isReady = true;
const hasAccess = false;
const canSubmit = true;
const shouldRedirect = false;
```

**Плохо**
```ts
// Плохо: неясное булево значение без префикса.
const ready = true;
const access = false;
const submit = true;
```

## События и обработчики

- Обработчики начинать с `handle`.
- События и колбэки начинать с `on`.

**Хорошо**
```ts
const handleSubmit = () => { ... };
const onSubmit = () => { ... };
```

**Плохо**
```ts
// Плохо: неочевидное назначение имени.
const submitClick = () => { ... };
```

## Коллекции

- Для массивов использовать имена во множественном числе.
- Для словарей/мап — использовать суффиксы `ById`, `Map`, `Dict`.

**Хорошо**
```ts
const users = [];
const usersById = {} as Record<string, User>;
const userIds = ['u1', 'u2'];
const ordersMap = new Map<string, Order>();
const featureFlagsDict = { beta: true, legacy: false } as Record<string, boolean>;
```

**Плохо**
```ts
// Плохо: имя не отражает, что это коллекция.
const user = [];
// Плохо: словарь назван как массив.
const usersMap = [];
// Плохо: по имени непонятно, что это словарь.
const users = {} as Record<string, User>;
```
