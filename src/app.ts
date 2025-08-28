import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './utils/logger';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = parseInt(process.env['PORT'] || '3000', 10);

// 基础中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 基础路由
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: '🚀 Node.js API Gateway',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      users: '/api/users',
      data: '/api/data'
    }
  });
});

// API路由
import usersRouter from './routes/users';
import dataRouter from './routes/data';

// 同时支持 /api 前缀和根路径
app.use('/api/users', usersRouter);
app.use('/api/data', dataRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);

// 错误处理中间件
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error('服务器错误:', err);
  
  res.status(500).json({
    error: '服务器内部错误',
    message: process.env['NODE_ENV'] === 'development' ? err.message : '请稍后重试'
  });
});

// 404处理
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: '接口不存在',
    path: req.originalUrl
  });
});

// 启动服务器
const startServer = () => {
  try {
    app.listen(PORT, () => {
      logger.info(`🚀 服务器启动成功！`);
      logger.info(`📍 运行端口: ${PORT}`);
      logger.info(`🌍 环境: ${process.env['NODE_ENV'] || 'development'}`);
      logger.info(`📡 API地址: http://localhost:${PORT}`);
      logger.info(`👥 用户接口: http://localhost:${PORT}/api/users`);
      logger.info(`📊 数据接口: http://localhost:${PORT}/api/data`);
    });
  } catch (error) {
    logger.error('❌ 服务器启动失败:', error);
    process.exit(1);
  }
};

// 在 Vercel 环境中不启动服务器，只导出应用
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  startServer();
}

// 导出 Express 应用实例（Vercel 需要）
export default app;
