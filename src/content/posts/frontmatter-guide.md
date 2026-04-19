---

title: "Frontmatter 使用示例"
date: "2026-04-18"
summary: "一篇带有 Frontmatter 的示例文章，展示首页摘要与详情页元信息是如何生成的。"
tags:

- YAML
- MDX
- Content

---

# Frontmatter 使用示例

每篇文章都可以在文件顶部写一段 YAML Frontmatter：

```yaml
---
title: 文章标题
date: 2026-04-18
summary: 文章摘要
tags:
  - YAML
  - Content
---
```

这些字段会被首页列表和详情页共用。

## 推荐字段

- `title`: 文章标题
- `date`: 发布日期
- `summary`: 列表页摘要
- `coverImage`: 可选封面图
- `tags`: 可选标签数组

这样内容和页面逻辑就能彻底分开。
