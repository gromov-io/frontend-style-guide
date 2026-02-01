# Шаблоны генерации кода

Подход к использованию шаблонов и генерации кода для стандартизации структуры и ускорения разработки.

## Что генерируем

- Компоненты (`screens`, `layouts`, `widgets`, `features`, `entities`).
- Страницы (nextjs `app`, `pages`)
- Типовые инфраструктурные модули (например, `store`).

## Чем генерируем

### VSCode extension

[расширение VS Code](https://open-vsx.org/extension/MyTemplateGenerator/mytemplategenerator) — создание файлов и папок из шаблонов через UI‑интерфейс внутри редактора.

### CLI (для агентов)

[@gromlab/create](https://gromlab.ru/gromov/create) — CLI для генерации файлов и папок по шаблонам.

Примеры:
```bash
# Создать компонент
create component button

# Создать компонент используя NPX
npx @gromlab/create component button
```

## Структура папок
Все шаблоны лежат в `.templates/` в корне проекта.  
Каждая папка в `.templates/` — это уникальный шаблон.  

```text
.templates/                     # корневая папка всех шаблонов
├── component/                  # шаблон компонента
│   └── {&#123;&#123;name.pascalCase&#125;&#125;}/
│       ├── index.ts
│       ├── {&#123;&#123;name.pascalCase&#125;&#125;}.tsx
│       └── {&#123;&#123;name.pascalCase&#125;&#125;}.module.css
└── store/                      # шаблон Zustand стора
    └── {&#123;&#123;name.camelCase&#125;&#125;}Store/
        ├── index.ts
        ├── {&#123;&#123;name.camelCase&#125;&#125;}Store.ts
        └── {&#123;&#123;name.camelCase&#125;&#125;}Store.type.ts
```

## Синтаксис

- Переменные в шаблонах работают в именах файлов/папок и внутри файлов.
- Базовая переменная — `name`.

Формат записи переменной:

```text
{{variable}}
```

Модификаторы — это преобразования переменной, которые меняют регистр и формат записи. Они пишутся после имени через точку и применяются в момент генерации.

```text
{{name.pascalCase}} -> MyButton
{{name.camelCase}} -> myButton
{{name.kebabCase}} -> my-button
{{name.snakeCase}} -> my_button
{{name.screamingSnakeCase}} -> MY_BUTTON
```

Пример использования в шаблоне:

```text
{{name}}.tsx
{{name.pascalCase}}.tsx
```

```tsx
export const {{name.pascalCase}} = () => {
  return <div>{{name}}</div>
}
```

## Шаблон компонента

Рекомендуемая структура компонента, создаётся генератором по шаблону.

```ts
// .templates/component/index.ts
export * from './{{name.pascalCase}}'
```

```tsx
// .templates/component/{{name.pascalCase}}.tsx
import { FC, HTMLAttributes } from "react";
import styles from './{{name.kebabCase}}.module.css'
import cl from 'clsx'

interface IOwnProps extends HTMLAttributes<HTMLDivElement> {}

export const {{name.pascalCase}}:FC<IOwnProps> = ({className, ...htmlAttr}) => {
  return (
    <div {...htmlAttr} className={cl(styles.root, className)}>
      {{name.kebabCase}}
    </div>
  )
}
```

```css
/* .templates/component/{{name.kebabCase}}.module.css */
.root {
  
}
```
