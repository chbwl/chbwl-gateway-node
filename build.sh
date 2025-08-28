#!/bin/bash

# 清理之前的构建
rm -rf dist

# 安装依赖
pnpm install --frozen-lockfile

# 编译TypeScript
pnpm run build

# 检查构建结果
if [ -d "dist" ]; then
    echo "✅ 构建成功"
    ls -la dist/
else
    echo "❌ 构建失败"
    exit 1
fi
