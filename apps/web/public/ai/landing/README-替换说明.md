# 首页 AI 图片替换说明

把你在 ChatGPT 里生成好的图片，按下面文件名放到本目录：
`/Users/jimmy/Desktop/LingxiForge/apps/web/public/ai/landing/`

建议格式：`webp`

## 需要的 15 张图（文件名必须一致）
1. `pain-vision.webp`
2. `pain-cost.webp`
3. `pain-skill.webp`
4. `solution-ip.webp`
5. `solution-ai-design.webp`
6. `solution-manufacturing.webp`
7. `solution-marketing.webp`
8. `process-delivery.webp`
9. `metrics-system.webp`
10. `metrics-quality.webp`
11. `metrics-fulfillment.webp`
12. `coop-museum.webp`
13. `coop-brand.webp`
14. `coop-maker.webp`
15. `coop-education.webp`

## 对应关系
- PainPointsSection：`pain-*`
- SolutionsSection：`solution-*`
- ProcessSection：`process-delivery.webp`
- MetricsSection：`metrics-*`
- CooperationSection：`coop-*`

## 提示词清单
已放在同目录：`landing-prompts.jsonl`

## 一个提示词一个文件夹
- 目录：`/Users/jimmy/Desktop/LingxiForge/apps/web/public/ai/landing/prompt-folders/`
- 每个子文件夹对应 1 张图，里面有 `prompt.md`（直接可复制到 ChatGPT）和目标文件名。

## 风格说明
- 这版提示词已统一为“亚洲学生 / 亚洲青年团队”叙事语境。

你可以直接在 ChatGPT 逐条生成，下载后改成上述文件名覆盖即可。
