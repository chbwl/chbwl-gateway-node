import { createServer } from 'net';
import { logger } from './logger';

/**
 * 查找可用端口
 * @param startPort 起始端口
 * @param maxAttempts 最大尝试次数
 * @returns 可用的端口号
 */
export const findAvailablePort = async (startPort: number, maxAttempts: number = 10): Promise<number> => {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i;
    try {
      await new Promise<void>((resolve, reject) => {
        const server = createServer();
        server.listen(port, () => {
          server.close();
          resolve();
        });
        server.on('error', () => {
          reject(new Error(`Port ${port} is in use`));
        });
      });
      return port;
    } catch (error) {
      logger.warn(`端口 ${port} 被占用，尝试下一个端口...`);
      if (i === maxAttempts - 1) {
        throw new Error(`无法找到可用端口，已尝试 ${maxAttempts} 个端口`);
      }
    }
  }
  throw new Error('无法找到可用端口');
};
