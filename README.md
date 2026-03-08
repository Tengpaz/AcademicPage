# AcademicPage

使用 Vue 3 + Vite 开发的个人学术主页模板。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 主要文件

- `src/App.vue`: 页面入口，负责语言状态和组件组装
- `src/config/siteContent.zh.js`: 中文内容配置
- `src/config/siteContent.en.js`: 英文内容配置
- `src/config/siteContent.js`: 配置聚合入口
- `src/components/`: 页面组件目录（导航、简介、论文、项目、联系等）
- `src/styles/site.css`: 全局样式
- `src/main.js`: Vue 应用入口
- `public/assets/avatar.svg`: 默认头像资源

## 如何改内容

优先修改 `src/config/siteContent.zh.js` 和 `src/config/siteContent.en.js`，包括：

- 个人简介与履历信息
- 论文列表
- 项目列表
- 联系方式
- 中英文文案
