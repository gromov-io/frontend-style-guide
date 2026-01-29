# API

> В этом разделе собраны основные правила и рекомендации по созданию, оформлению и использованию API-клиентов и функций для работы с сервером. Следуйте этим принципам, чтобы обеспечить единый стиль, безопасность и удобство поддержки API-слоя в проекте.

## Описание и назначение API-клиента

API-клиент — это модуль (папка), отвечающий за взаимодействие с конкретным внешним или внутренним API.  
В проекте для HTTP-запросов используется только Axios.  
API-клиент инкапсулирует:
- инициализацию экземпляра Axios,
- настройку базового URL, интерцепторов, обработчиков ошибок,
- организацию всех сущностей и методов для работы с этим API (например, users, auth, orders и т.д.),
- экспорт всех функций, типов и fetcher через индексные файлы.

Каждый API-клиент размещается в папке `src/shared/api/<client-name>/` и имеет собственную структуру согласно архитектуре проекта.


## Использование методов API

- Все методы API должны использоваться строго внутри блока `try...catch`.
- При вызове методов API всегда используйте полный путь, например:  
  `await api.backend.createUser({ email, password });`
- Запрещено вызывать методы API вне блока `try...catch` даже в тестах, утилитах и других вспомогательных функциях.


## Структура клиента
```text
src/shared/api/backend/
│
├── client.ts
├── index.ts
└── entities/
    ├── users/
    │   ├── get-me.api.ts
    │   ├── create-user.api.ts
    │   ├── update-user.api.ts
    │   └── index.ts
    ├── auth/
    │   ├── login.api.ts
    │   ├── register.api.ts
    │   └── index.ts
    └── index.ts
```

## Описание ключевых элементов

- **client.ts**  
  Экземпляр Axios с настройками, интерцепторами, экспортом fetcher для SWR.

- **index.ts**  
  Главная точка экспорта: экспортирует client, fetcher, все сущности и их методы.

- **entities/**  
  Папка для бизнес-сущностей (например, users, auth, orders и т.д.).

- **`<entity>/`**  
  Папка для отдельной сущности. Имя — в kebab-case, отражает бизнес-область (например, users, auth).

- **`<operation>.api.ts`**  
  Файл для каждой операции (CRUD, спец. действия).  
  Внутри:
  - DTO (интерфейсы запроса/ответа)
  - Функция, реализующая запрос через client

- **index.ts (внутри `<entity>`/)**  
  Экспортирует все методы и типы этой сущности.

- **index.ts (внутри entities/)**  
  Экспортирует все сущности (users, auth и т.д.).


## Именование

- Соблюдайте [правила именования файлов и папок](#правила-именования-файлов-и-папок):
  - Файл клиента — `client.ts`.
  - Файл функции — `<operation>-<entity>.api.ts` (например, `create-user.api.ts`).
  - DTO — в папке `dto/` (например, `create-user.dto.ts`).
  - Все функции и типы экспортируются через индексные файлы на каждом уровне (сущность, entities, клиент).


## Требования

- Для каждого действия (CRUD, спец. действия) — отдельная функция и файл.
- Все функции используют общий экземпляр Axios из `client.ts`.
- Все функции строго типизированы (используются DTO).
- DTO объявляется в отдельном файле в папке `dto/` перед функцией, которая его использует.
- Для каждого GET метода обязательно должен быть создан API-хук.
- Все API-хуки должны создаваться строго по [документации раздела "Хуки для API"](#хуки-для-api-api-hooks).


## Типизация

- Все функции и DTO строго типизированы.
- Все интерфейсы, типы и enum размещены в папке `types/` на своём уровне абстракции.
- Все DTO размещены в папке `dto/` на своём уровне абстракции.
- Придерживайтесь [общих правил типизации проекта](#общие-правила-типизации).


## Документирование

- Документируйте только назначение функций и DTO.
- В описании указывается только смысл функции/типа.


## Экспорт

- Все функции и типы экспортируются через индексные файлы на каждом уровне (сущность, entities, клиент).


## Примеры

### Пример клиента API

```ts
// client.ts
import axios, { AxiosInstance } from "axios";
export { AxiosError, isAxiosError } from 'axios';
export type { AxiosResponse } from 'axios';

/**
 * Экземпляр HTTP-клиента для работы с backend API.
 */
export const backendHttpClient: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Интерцептор запроса
backendHttpClient.interceptors.request.use(
  (config) => {
    // Здесь можно добавить авторизационные заголовки или другую логику
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор ответа
backendHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Здесь можно обработать ошибки (например, показать уведомление)
    return Promise.reject(error);
  }
);
```

### Пример DTO

```ts
// dto/create-user.dto.ts
/**
 * DTO для создания пользователя.
 */
export interface CreateUserDto {
  /** Email пользователя. */
  email: string;
  /** Пароль пользователя. */
  password: string;
}
```

### Пример API-функции

```ts
// create-user.api.ts
import { backendHttpClient } from '../client';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Создать пользователя.
 */
export const createUser = (data: CreateUserDto) => backendHttpClient.post('/users', data);
```

### Пример index.ts (в папке сущности)

```ts
export * from './create-user.api';
export * from './get-user.api';
```

### Пример использования API-функции в компоненте

```tsx
import React, { useState } from 'react';
import { api } from 'shared/api';

export const CreateUserForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.backend.createUser({ email, password });
      console.log('Пользователь создан!');
    } catch {
      console.log('Ошибка создания пользователя');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Пароль"
        required
      />
      <button type="submit">Создать пользователя</button>
    </form>
  );
};
```


## Чек-лист для создания клиента
- [ ] Новый клиент размещён в `src/shared/api/<client-name>/`.
- [ ] В корне клиента есть client.ts (экземпляр Axios) и index.ts (главный экспорт).
- [ ] Все бизнес-сущности размещены в entities/, каждая — в отдельной папке.
- [ ] Для каждой операции создан отдельный файл `<operation>`.api.ts с DTO и функцией.
- [ ] DTO объявлен непосредственно перед функцией.
- [ ] В каждой папке сущности есть свой index.ts для экспорта методов и типов.
- [ ] В папке entities/ есть общий index.ts для экспорта всех сущностей.
- [ ] Все экспорты организованы через индексные файлы.
- [ ] Для каждого GET-метода создан отдельный SWR-хук (см. правила API-хуков).
- [ ] Нет дублирования кода и неиспользуемых файлов.

## Чек-лист для использования API
- [ ] Импортируется только нужный метод через публичные экспорты (index.ts).
- [ ] Все вызовы API обёрнуты в try...catch.
- [ ] Используются только строго типизированные методы.
- [ ] Не происходит обращения к Axios напрямую — только через client.
- [ ] Нет дублирования логики и неиспользуемого кода. 
