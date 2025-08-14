# Node.js API Gateway

一个简洁的 Node.js API 网关，提供用户和数据接口服务。

## 功能特性

- 用户管理接口 (`/api/users`)
- 数据管理接口 (`/api/data`)
- TypeScript 支持
- 开发环境热重载

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发环境运行

```bash
pnpm dev
```

### 生产环境构建

```bash
pnpm build
pnpm start
```

## API 接口

### 用户接口 (`/api/users`)

- `GET /api/users` - 获取用户列表
- `GET /api/users/:id` - 获取单个用户
- `POST /api/users` - 创建用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户

### 数据接口 (`/api/data`)

- `GET /api/data` - 获取数据列表（支持分页和类型过滤）
- `GET /api/data/:id` - 获取单个数据项
- `POST /api/data` - 创建数据项
- `PUT /api/data/:id` - 更新数据项
- `DELETE /api/data/:id` - 删除数据项
- `GET /api/data/stats/overview` - 获取统计数据

## 环境变量

复制 `env.example` 为 `.env` 并配置：

```bash
cp env.example .env
```

主要配置项：
- `PORT` - 服务器端口（默认：3000）
- `NODE_ENV` - 运行环境（development/production）
- `FRONTEND_URL` - 前端地址（用于 CORS 配置）

## 项目结构

```
src/
├── app.ts          # 主应用文件
├── routes/
│   ├── users.ts    # 用户路由
│   └── data.ts     # 数据路由
├── types/
│   └── index.ts    # TypeScript 类型定义
└── utils/
    └── logger.ts   # 日志工具
```
