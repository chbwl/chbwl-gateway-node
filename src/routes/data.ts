import express from 'express';
import { DataItem, CreateDataRequest, UpdateDataRequest, ApiResponse, PaginationResponse, DataStats } from '../types';
const router = express.Router();

// 获取数据列表
router.get('/', (req, res) => {
  const pageParam = Array.isArray(req.query['page']) ? req.query['page'][0] : req.query['page'];
  const limitParam = Array.isArray(req.query['limit']) ? req.query['limit'][0] : req.query['limit'];
  const typeParam = Array.isArray(req.query['type']) ? req.query['type'][0] : req.query['type'];

  const page: number = typeof pageParam === 'string' ? parseInt(pageParam, 10) : 1;
  const limit: number = typeof limitParam === 'string' ? parseInt(limitParam, 10) : 10;
  const type: string | undefined = typeof typeParam === 'string' ? typeParam : undefined;

  // 模拟数据
  const mockData: DataItem[] = [
    { id: 1, title: '数据项1', type: 'article', content: '这是第一篇文章的内容', createdAt: '2024-01-01' },
    { id: 2, title: '数据项2', type: 'news', content: '这是一条新闻', createdAt: '2024-01-02' },
    { id: 3, title: '数据项3', type: 'article', content: '这是第二篇文章的内容', createdAt: '2024-01-03' },
    { id: 4, title: '数据项4', type: 'report', content: '这是一份报告', createdAt: '2024-01-04' },
    { id: 5, title: '数据项5', type: 'news', content: '这是另一条新闻', createdAt: '2024-01-05' }
  ];
  
  // 过滤数据
  let filteredData = mockData;
  if (type) {
    filteredData = mockData.filter(item => item.type === type);
  }
  
  // 分页
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 10;
  const startIndex = (safePage - 1) * safeLimit;
  const endIndex = safePage * safeLimit;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  const pagination: PaginationResponse = {
    page: safePage,
    limit: safeLimit,
    total: filteredData.length,
    totalPages: Math.ceil(filteredData.length / safeLimit)
  };

  const response: ApiResponse<DataItem[]> = {
    success: true,
    data: paginatedData,
    pagination
  };

  res.json(response);
});

// 获取单个数据项
router.get('/:id', (req, res) => {
  const dataId = parseInt(req.params.id);
  
  // 模拟数据
  const dataItem: DataItem = {
    id: dataId,
    title: `数据项${dataId}`,
    type: 'article',
    content: `这是第${dataId}个数据项的详细内容。这里可以包含更多的信息，比如描述、标签、作者等。`,
    author: '系统管理员',
    tags: ['技术', '开发', 'Node.js'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    views: 1250,
    likes: 45
  };
  
  if (dataId > 0 && dataId <= 5) {
    const response: ApiResponse<DataItem> = {
      success: true,
      data: dataItem
    };
    res.json(response);
  } else {
    const response: ApiResponse = {
      success: false,
      message: '数据项不存在'
    };
    res.status(404).json(response);
  }
});

// 创建数据项
router.post('/', (req, res) => {
  const { title, type, content, author, tags }: CreateDataRequest = req.body;
  
  if (!title || !content) {
    const response: ApiResponse = {
      success: false,
      message: '标题和内容是必填项'
    };
    return res.status(400).json(response);
  }
  
  // 模拟创建数据项
  const newDataItem: DataItem = {
    id: Date.now(),
    title,
    type: type || 'article',
    content,
    author: author || '匿名用户',
    tags: tags || [],
    createdAt: new Date().toISOString(),
    views: 0,
    likes: 0
  };
  
  const response: ApiResponse<DataItem> = {
    success: true,
    data: newDataItem,
    message: '数据项创建成功'
  };
  
  return res.status(201).json(response);
});

// 更新数据项
router.put('/:id', (req, res) => {
  const dataId = parseInt(req.params.id);
  const { title, type, content, author, tags }: UpdateDataRequest = req.body;
  
  // 模拟更新数据项
  const updatedDataItem: DataItem = {
    id: dataId,
    title: title || `数据项${dataId}`,
    type: type || 'article',
    content: content || '更新后的内容',
    author: author || '系统管理员',
    tags: tags || ['技术'],
    updatedAt: new Date().toISOString()
  };
  
  const response: ApiResponse<DataItem> = {
    success: true,
    data: updatedDataItem,
    message: '数据项更新成功'
  };
  
  res.json(response);
});

// 删除数据项
router.delete('/:id', (req, res) => {
  const dataId = parseInt(req.params.id);
  
  const response: ApiResponse = {
    success: true,
    message: `数据项 ${dataId} 删除成功`
  };
  
  res.json(response);
});

// 统计数据
router.get('/stats/overview', (_req, res) => {
  const stats: DataStats = {
    totalItems: 150,
    totalViews: 12500,
    totalLikes: 850,
    typeDistribution: {
      article: 60,
      news: 45,
      report: 30,
      other: 15
    },
    recentActivity: [
      { date: '2024-01-15', newItems: 5, views: 120 },
      { date: '2024-01-14', newItems: 3, views: 95 },
      { date: '2024-01-13', newItems: 7, views: 180 }
    ]
  };
  
  const response: ApiResponse<DataStats> = {
    success: true,
    data: stats
  };
  
  res.json(response);
});

export default router;
