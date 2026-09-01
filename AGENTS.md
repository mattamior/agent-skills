# 项目约定

## 结构

- 每个 skill 位于 `skills/<skill-name>/`，入口为 `SKILL.md`。
- `SKILL.md` 只保留选择、路由、关键工作流和非显而易见约束；条件性细节放入 `references/`。
- 可复制到交付物的模板与静态资源放入 `assets/`；只有重复且需要确定性的操作才添加 `scripts/`。
- 不在 skill 目录内添加 README、changelog、压缩包或未使用的占位目录。

## 修改

- 目录名必须与 `SKILL.md` frontmatter 的 `name` 一致。
- `description` 必须明确触发范围与关键排除项，避免吸引无关任务。
- `agents/openai.yaml` 的界面信息必须与 skill 一致，`default_prompt` 必须显式调用 `$<skill-name>`。
- 不把特定项目的品牌名称、视觉风格或一次性失败固化为通用规则；保留授权边界与明确失败路径。
- 对外正式文档保持中英文双份；skill 指令与参考文档默认使用英文，以便跨产品复用。
- 不提交凭据、用户数据、生成缓存、虚拟环境或本地安装链接。

## 验证

- 每次修改后运行 `./scripts/validate-skills.py`。
- 新增或大幅修改 skill 时，同时运行系统 `skill-creator` 的 `quick_validate.py` 与 Agent Skills `skills-ref`。
- 修改安装脚本后验证检查模式、首次安装、重复安装和冲突拒绝。

## Agnir

- Before Project work, follow `README.md` → `## Agnir Project Instructions` for the canonical Agnir activation instructions.
