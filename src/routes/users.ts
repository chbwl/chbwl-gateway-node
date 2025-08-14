import express from 'express';
import { User, CreateUserRequest, UpdateUserRequest, ApiResponse } from '../types';
const router = express.Router();

// 获取用户列表
router.get('/', (_req, res) => {
  // 模拟用户数据
  const users: User[] = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user' }
  ];
  
  const response: ApiResponse<User[]> = {
    success: true,
    data: users
  };
  
  res.json(response);
});

// 获取单个用户
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  // 模拟用户数据
  const user: User = {
    id: userId,
    name: '张三',
    email: 'zhangsan@example.com',
    role: 'admin',
    createdAt: new Date().toISOString()
  };
  
  if (userId > 0 && userId <= 3) {
    const response: ApiResponse<User> = {
      success: true,
      data: user
    };
    res.json(response);
  } else {
    const response: ApiResponse = {
      success: false,
      message: '用户不存在'
    };
    res.status(404).json(response);
  }
});

// 创建用户
router.post('/', (req, res) => {
  const { name, email, role }: CreateUserRequest = req.body;
  
  if (!name || !email) {
    const response: ApiResponse = {
      success: false,
      message: '姓名和邮箱是必填项'
    };
    return res.status(400).json(response);
  }
  
  // 模拟创建用户
  const newUser: User = {
    id: Date.now(),
    name,
    email,
    role: role || 'user',
    createdAt: new Date().toISOString()
  };
  
  const response: ApiResponse<User> = {
    success: true,
    data: newUser,
    message: '用户创建成功'
  };
  
  return res.status(201).json(response);
});

// 更新用户
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, role }: UpdateUserRequest = req.body;
  
  // 模拟更新用户
  const updatedUser: User = {
    id: userId,
    name: name || '张三',
    email: email || 'zhangsan@example.com',
    role: role || 'admin',
    updatedAt: new Date().toISOString()
  };
  
  const response: ApiResponse<User> = {
    success: true,
    data: updatedUser,
    message: '用户更新成功'
  };
  
  res.json(response);
});

// 删除用户
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  const response: ApiResponse = {
    success: true,
    message: `用户 ${userId} 删除成功`
  };
  
  res.json(response);
});

export default router;
