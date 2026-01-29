import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'ru-RU',
  title: 'Код-стайл React/NextJS и TypeScript',
  description: 'Правила и стандарты разработки фронтенд-проектов на React/NextJS и TypeScript',
  themeConfig: {
    siteTitle: 'Frontend Style Guide',
    sidebar: [
      {
        text: 'Базовые правила',
        items: [
          { text: 'Технологии/библиотеки', link: '/parts/1-tech-stack' },
          { text: 'Архитектура', link: '/parts/2-architecture' },
          { text: 'Стиль кода', link: '/parts/3-code-style' },
          { text: 'Именование', link: '/parts/4-naming' },
          { text: 'Документирование', link: '/parts/5-documentation' },
          { text: 'Типизация', link: '/parts/6-typing' },
        ],
      },
      {
        text: 'Прикладные разделы',
        items: [
          { text: 'Структура проекта', link: '/parts/7-project-structure' },
          { text: 'Компоненты', link: '/parts/8-components' },
          { text: 'Стили', link: '/parts/9-styles' },
          { text: 'Изображения/спрайты', link: '/parts/10-images-sprites' },
          { text: 'Видео', link: '/parts/11-video' },
          { text: 'API', link: '/parts/12-api' },
          { text: 'Stores', link: '/parts/13-stores' },
          { text: 'Хуки', link: '/parts/14-hooks' },
          { text: 'Шрифты', link: '/parts/15-fonts' },
          { text: 'Локализация', link: '/parts/16-localization' },
        ],
      },
    ],
  },
}); 
