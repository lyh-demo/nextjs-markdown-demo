---
title: "使用 Next.js 渲染 Markdown"
date: "2026-04-19"
summary: "从零开始搭一个支持 markdown、图片和 Frontmatter 的 Next.js 内容站点。"
coverImage: "/images/fe6eb2a1f488026cb3c12585d6c83444.jpg"
tags:
  - Next.js
  - Markdown
  - Frontmatter
---

# 使用 Next.js 渲染 Markdown

这篇文章展示了如何用 Next.js 渲染本地 markdown 文件，并把它组织成博客列表页和详情页。

## 文章能力

- 首页自动读取 markdown 文件列表
- 点击后进入动态详情页
- 使用 Frontmatter 维护标题、日期、摘要和封面图
- 正文图片自动走 `next/image`

## 示例图片

![示例图片](/images/fe6eb2a1f488026cb3c12585d6c83444.jpg)

## 继续扩展

你后面可以继续往 `src/content/posts` 目录里添加新的 `.md` 或 `.mdx` 文件，首页会自动把它们列出来。
