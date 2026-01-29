---
title: Стиль кода
---

# Стиль кода

Раздел описывает единые правила оформления кода: отступы, переносы, кавычки, порядок импортов и базовую читаемость.

## Отступы и переносы

- Использовать 2 пробела для отступов.
- Не использовать табы.
- Одна инструкция — одна строка.
- Между логическими блоками оставлять пустую строку по необходимости, если это улучшает читаемость.
- В многострочных конструкциях выравнивать закрывающую скобку по началу выражения.

**Хорошо**
```ts
const payload = {
  id: 1,
  name: 'User',
  meta: {
    role: 'admin',
  },
};
```

**Плохо**
```ts
const payload = { id: 1, name: 'User', meta: { role: 'admin' } };
```

## Длина строк

- Ориентироваться на 100 символов, но превышение допустимо, если строка читается легко.
- Переносить выражение на новые строки, когда строка становится плохо читаемой.
- Не переносить строку внутри строковых литералов без необходимости.

**Хорошо**
```ts
const config = createRequestConfig(
  endpoint,
  {
    headers: {
      'X-Request-Id': requestId,
      'X-User-Id': userId,
    },
    params: {
      page,
      pageSize,
      sort: 'createdAt',
    },
  },
  timeoutMs,
);
```

**Плохо**
```ts
const config = createRequestConfig(endpoint, { headers: { 'X-Request-Id': requestId, 'X-User-Id': userId }, params: { page, pageSize, sort: 'createdAt' } }, timeoutMs);
```

## Кавычки

- В JavaScript/TypeScript использовать одинарные кавычки.
- В JSX/TSX для атрибутов использовать двойные кавычки.
- Шаблонные строки использовать только при интерполяции или многострочном тексте.

**Хорошо**
```ts
const label = 'Сохранить';
const title = `Привет, ${name}`;
```

```tsx
<input type="text" placeholder="Введите имя" />
```

**Плохо**
```ts
const label = "Сохранить";
const title = 'Привет, ' + name;
```

```tsx
<input type='text' placeholder='Введите имя' />
```

## Точки с запятой и запятые

- Допускаются упущения точки с запятой, если код остаётся читаемым и однозначным.
- В многострочных массивах, объектах и параметрах функции запятая в конце допускается, но не обязательна.

## Импорты

- В именованных импортах использовать пробелы внутри фигурных скобок.
- Типы импортировать через `import type`.
- `default` импорт и экспорт избегать, использовать именованные.
- Избегать импорта всего модуля через `*`.

**Хорошо**
```ts
import { MyComponent } from 'MyComponent';
import type { User } from '../model/types';
```

**Плохо**
```ts
import MyComponent from 'MyComponent';
import type {User} from '../model/types';
```

## Ранние возвраты (early return)

- Использовать ранние возвраты для упрощения чтения.
- Избегать `else` после `return`.

**Хорошо**
```ts
const getName = (user?: { name: string }) => {
  if (!user) {
    return 'Гость';
  }

  return user.name;
};
```

**Плохо**
```ts
const getName = (user?: { name: string }) => {
  if (user) {
    return user.name;
  } else {
    return 'Гость';
  }
};
```

## Форматирование объектов и массивов

- В многострочных объектах каждое свойство на новой строке.
- В многострочных массивах каждый элемент на новой строке.
- Объекты и массивы можно писать в одну строку, если длина строки не превышает 100 символов.
- В однострочных объектах и массивах использовать пробелы после запятых.

**Хорошо**
```ts
const roles = ['admin', 'editor'];
const options = { id: 1, name: 'User' };

const config = {
  url: '/api/users',
  method: 'GET',
  params: { page: 1, pageSize: 20 },
};
```

**Плохо**
```ts
const roles = ['admin','editor'];
const options = { id: 1,name: 'User' };
const config = { url: '/api/users', method: 'GET', params: { page: 1, pageSize: 20 } };
```
