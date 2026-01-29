---
title: Типизация
---

# Типизация

Типизация обязательна для всех публичных интерфейсов, функций и компонентов.
Цель — предсказуемость, безопасность и автодополнение.

## Общие правила

- Указывать типы для параметров компонентов, возвращаемых значений и параметров функций.
- Предпочитать `type` для описания сущностей и `interface` для расширяемых контрактов.
- Избегать `any` и `unknown` без необходимости.
- Не использовать `ts-ignore`, кроме крайних случаев с явным комментарием причины.

## Типы для компонентов

- Типизировать параметры и публичный интерфейс компонента.
- Дефолтные значения описывать явно в коде.

**Хорошо**
```tsx
/**
 * Параметры кнопки.
 */
interface IOwnProps extends HTMLAttributes<HTMLDivElement> {
  /** Текст кнопки. */
  label: string;
  /** Обработчик клика по кнопке. */
  onClick: () => void;
}

/**
 * Кнопка с пользовательскими стилями.
 */
export const Button:FC<IOwnProps> = ({ className, label, onClick, ...htmlAttr }) => {
  return (
    <div {...htmlAttr} className={cl(styles.root, className)}>
      button
    </div>
  )
}
```

**Плохо**
```tsx
// Плохо: параметры не типизированы.
export const Button = (props) => (
  <button type="button" onClick={props.onClick}>
    {props.label}
  </button>
);
```

## Функции

- Для публичных функций указывать возвращаемый тип.
- Не полагаться на неявный вывод для важных API.

**Хорошо**
```ts
export const formatPrice = (value: number): string => {
  return `${value} ₽`;
};
```

**Плохо**
```ts
// Плохо: нет явного возвращаемого типа.
export const formatPrice = (value: number) => {
  return `${value} ₽`;
};
```

## Работа с any/unknown

- `any` использовать только для временных заглушек.
- `unknown` сужать через проверки перед использованием.

**Хорошо**
```ts
const parse = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  return '';
};
```

**Плохо**
```ts
// Плохо: any отключает проверку типов.
const parse = (value: any) => value;
```
