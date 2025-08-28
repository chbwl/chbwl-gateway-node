#!/bin/bash

echo "🚀 开始部署到 Railway..."

# 检查是否安装了 Railway CLI
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI 未安装，正在安装..."
    npm install -g @railway/cli
fi

# 登录 Railway（如果需要）
echo "🔐 检查 Railway 登录状态..."
railway login

# 初始化项目（如果是第一次）
echo "📦 初始化 Railway 项目..."
railway init

# 部署到 Railway
echo "🚀 部署到 Railway..."
railway up

echo "✅ 部署完成！"
echo "🌍 您的应用现在应该可以在 Railway 上访问了"
