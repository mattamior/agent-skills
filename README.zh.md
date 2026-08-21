# 品牌设计工作流

这是一个采用 Apache-2.0 许可证的 Codex skill，用于将品牌概念推进为已确认、可生产交付的品牌识别系统。

## 内含 skill

[`brand-design-system`](brand-design-system/SKILL.md) 支持：

- 探索具有明显差异、适合矢量化的 Logo 方向；
- 在迭代与资产生成中严格保留已确认的设计母版；
- 按实际交付需要生成 SVG、PNG、favicon、PWA 与社媒资产；
- 在获得授权后，将已确认资产接入网站；
- 验证真实渲染透明度、比例、小尺寸识别与 favicon/manifest 实际路径。

它不会预设视觉风格、色彩、语言或品牌名称。视觉近似提示不构成商标检索结论或法律意见。

## 安装

将 [`brand-design-system`](brand-design-system) 复制或软链接到 Codex skills 目录：

```bash
git clone https://github.com/mattamior/brand-design-workflow.git
ln -s "$(pwd)/brand-design-workflow/brand-design-system" "$CODEX_HOME/skills/brand-design-system"
```

若未设置 `CODEX_HOME`，可使用 `~/.codex/skills/brand-design-system`。

## 使用

可显式调用 `$brand-design-system`，也可让 Codex 在品牌识别、Logo 系统、生产级品牌资产或品牌网站接入任务中自动选择它。

请提供品牌名称、受众、使用场景、现有资产或已定稿设计，以及语言、色彩或交付限制。只有会实质影响最终品牌或资产包的选择，skill 才会要求确认。

## 范围边界

生产资产以已确认的设计母版为基础。图像生成适合概念探索；最终 Logo 优先采用可编辑的 SVG/矢量构建。法律商标清查需通过独立的专业流程完成。
