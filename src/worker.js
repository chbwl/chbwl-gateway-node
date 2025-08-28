// Cloudflare Worker 版本的 API Gateway
const users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user' }
];

const data = [
  { id: 1, title: '数据1', content: '这是第一条数据', createdAt: new Date().toISOString() },
  { id: 2, title: '数据2', content: '这是第二条数据', createdAt: new Date().toISOString() },
  { id: 3, title: '数据3', content: '这是第三条数据', createdAt: new Date().toISOString() }
];

// CORS 头部
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Content-Type': 'application/json'
};

// 处理 CORS 预检请求
function handleCORS(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }
}

// 用户 API 路由
function handleUsers(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/users', '');
  
  if (request.method === 'GET') {
    if (path === '' || path === '/') {
      // 获取所有用户
      return new Response(JSON.stringify({
        success: true,
        data: users
      }), {
        status: 200,
        headers: corsHeaders
      });
    } else {
      // 获取单个用户
      const userId = parseInt(path.substring(1));
      const user = users.find(u => u.id === userId);
      
      if (user) {
        return new Response(JSON.stringify({
          success: true,
          data: user
        }), {
          status: 200,
          headers: corsHeaders
        });
      } else {
        return new Response(JSON.stringify({
          success: false,
          message: '用户不存在'
        }), {
          status: 404,
          headers: corsHeaders
        });
      }
    }
  }
  
  if (request.method === 'POST') {
    // 创建用户
    return request.json().then(body => {
      const newUser = {
        id: Date.now(),
        name: body.name,
        email: body.email,
        role: body.role || 'user',
        createdAt: new Date().toISOString()
      };
      
      return new Response(JSON.stringify({
        success: true,
        data: newUser,
        message: '用户创建成功'
      }), {
        status: 201,
        headers: corsHeaders
      });
    });
  }
}

// 数据 API 路由
function handleData(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/data', '');
  
  if (request.method === 'GET') {
    if (path === '' || path === '/') {
      // 获取所有数据
      return new Response(JSON.stringify({
        success: true,
        data: data
      }), {
        status: 200,
        headers: corsHeaders
      });
    } else {
      // 获取单个数据
      const dataId = parseInt(path.substring(1));
      const item = data.find(d => d.id === dataId);
      
      if (item) {
        return new Response(JSON.stringify({
          success: true,
          data: item
        }), {
          status: 200,
          headers: corsHeaders
        });
      } else {
        return new Response(JSON.stringify({
          success: false,
          message: '数据不存在'
        }), {
          status: 404,
          headers: corsHeaders
        });
      }
    }
  }
}

// 主处理函数
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  // 处理 CORS
  const corsResponse = handleCORS(request);
  if (corsResponse) return corsResponse;
  
  // 根路径
  if (path === '/') {
    return new Response(JSON.stringify({
      message: '🚀 Node.js API Gateway (Cloudflare Workers)',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
      endpoints: {
        users: '/api/users',
        data: '/api/data'
      }
    }), {
      status: 200,
      headers: corsHeaders
    });
  }
  
  // 健康检查
  if (path === '/health') {
    return new Response(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      platform: 'Cloudflare Workers'
    }), {
      status: 200,
      headers: corsHeaders
    });
  }
  
  // 用户 API
  if (path.startsWith('/api/users')) {
    return handleUsers(request);
  }
  
  // 数据 API
  if (path.startsWith('/api/data')) {
    return handleData(request);
  }
  
  // 404
  return new Response(JSON.stringify({
    error: '接口不存在',
    path: path
  }), {
    status: 404,
    headers: corsHeaders
  });
}
