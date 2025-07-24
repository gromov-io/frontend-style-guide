import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'ru-RU',
  title: 'Документация Gram Pay',
  description: 'Документация по проекту Gram Pay',
  themeConfig: {
    sidebar: [
      {
        text: 'Введение',
        items: [
          { text: 'Ассистент', link: '/parts/1-assistent' },
          { text: 'Общие принципы', link: '/parts/3-general-principles' },
          { text: 'Архитектура', link: '/parts/4-arkhitektura' },
          { text: 'Стиль кода', link: '/parts/5-code-style' },
          { text: 'Именование', link: '/parts/6-naming' },
          { text: 'Документирование', link: '/parts/7-docs' },
          { text: 'Типизация', link: '/parts/8-typing' },
          { text: 'Локализация', link: '/parts/9-localization' },
        ],
      },
      {
        text: 'FSD и слои',
        items: [
          { text: 'Stores', link: '/parts/10-stores' },
          { text: 'CSS', link: '/parts/11-css' },
          { text: 'Компоненты', link: '/parts/12-components' },
          { text: 'Hooks', link: '/parts/13-hooks' },
          { text: 'API-хуки', link: '/parts/14-api-hooks' },
          { text: 'API', link: '/parts/15-api' },
        ],
      },
    ],
    nav: [
      { text: 'Главная', link: '/' },
    ],
  },
}); 
