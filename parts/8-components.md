# Компоненты

Раздел описывает правила создания UI‑компонентов. Эти правила обязательны для всех слоёв FSD: `app`, `screens`, `layouts`, `widgets`, `features`, `entities`, `shared`.

## Базовая структура компонента

Минимальный набор файлов: компонент, стили, типы и публичный экспорт.

```text
container/
├── styles/
│   └── container.module.scss
├── types/
│   └── container.interface.ts
├── container.ui.tsx
└── index.ts
```

## Пример базового компонента

`styles/container.module.scss`
```scss
.root {}
```
В CSS Modules использование имени класса **.root** — это общепринятое соглашение (best practice)

`types/container.interface.ts`  
```ts
import type { HTMLAttributes } from 'react'

/**
 * Параметры контейнера.
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}
```
Интерфес параметров компонента всегда наследует свойства своего тега: div, button, итд..

`container.ui.tsx`

```tsx
import type { FC } from 'react'
import { cl } from 'clsx'
import type { ContainerProps } from './types/container.interface'
import styles from './styles/container.module.scss'

/**
 * Контейнер с адаптивной максимальной шириной.
 *
 * Используется для:
 *  - ограничения ширины контента
 *  - центрирования содержимого
 *  - построения адаптивной сетки страницы
 */
export const Container: FC<ContainerProps> = ({ className, ...htmlAttr }) => {
  return (
    <div {...htmlAttr} className={cl(styles.root, className)}>
      Container...
    </div>
  )
}
```

- Компонент объявляется через `const` и экспортируется именованно.
- Пропсы деструктурируются в сигнатуре; если их больше двух — деструктуризацию переносим в тело компонента.
- Из пропсов отдельно извлекаются `className` и `...htmlAttr`, чтобы корректно объединять классы и прокидывать остальные атрибуты.
- `cl` — короткое имя функции для конкатенации CSS‑классов.
- `FC<>` используется для декларации `children`.

`index.ts`

```ts
export { Container } from './container.ui'
```


## Вложенные (дочерние) компоненты

Если для реализации функционала нужны компоненты, которые используются только внутри текущего компонента, создавайте их как вложенные в папке `ui/`. Такие компоненты не экспортируются наружу и используются только локально.

Вложенные компоненты подчиняются тем же правилам по структуре, именованию и стилю (включая папку `styles/` для их стилей).
