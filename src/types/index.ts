// 用户相关类型
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
}

// 数据相关类型
export interface DataItem {
  id: number;
  title: string;
  type: string;
  content: string;
  author?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  likes?: number;
}

export interface CreateDataRequest {
  title: string;
  type?: string;
  content: string;
  author?: string;
  tags?: string[];
}

export interface UpdateDataRequest {
  title?: string;
  type?: string;
  content?: string;
  author?: string;
  tags?: string[];
}

// 分页类型
export interface PaginationQuery {
  page?: string;
  limit?: string;
  type?: string;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationResponse;
}

// 统计数据类型
export interface DataStats {
  totalItems: number;
  totalViews: number;
  totalLikes: number;
  typeDistribution: Record<string, number>;
  recentActivity: Array<{
    date: string;
    newItems: number;
    views: number;
  }>;
}
