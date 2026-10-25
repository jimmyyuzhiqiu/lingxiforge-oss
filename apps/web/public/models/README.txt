使用自有 3D 文物模型的方式：

1) 复制示例配置：
   public/models/catalog.example.json -> public/models/catalog.json

2) 将你的 GLB 模型放到 public/models/heritage/ 目录下，文件名与 catalog.json 中的 src 对应。

3) 可选：替换 thumbnail 为你的封面图（推荐 16:10 或 4:3 比例）。

说明：如果 catalog.json 不存在，页面会使用内置示例模型列表（当前为公开资源）。
