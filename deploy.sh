#!/bin/bash

echo "🚀 开始部署到 GitHub Pages + Cloudflare Workers..."

# 检查是否安装了 Wrangler CLI
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI 未安装，正在安装..."
    npm install -g wrangler
fi

# 登录 Cloudflare
echo "🔐 登录 Cloudflare..."
wrangler login

# 部署 Cloudflare Worker
echo "🚀 部署 Cloudflare Worker..."
wrangler deploy

echo "✅ Cloudflare Worker 部署完成！"
echo ""
echo "🌍 您的 API 将在以下地址可用："
echo "- Cloudflare Worker: https://chbwl-gateway-api.your-subdomain.workers.dev"
echo ""
echo "📝 API 端点："
echo "- GET /api/users - 获取用户列表"
echo "- GET /api/users/:id - 获取指定用户"
echo "- GET /api/data - 获取数据列表"
echo "- GET /health - 健康检查"
