import { extend } from 'umi-request';

// 统一错误处理
const errorHandler = (error) => {
  console.log('error==', error);
  const codeMap = {
    '021': '哦噢，出错了',
    '022': '哦噢，出大问题了'
    // ...
  }

  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    console.log(error.response.status);
    console.log(error.response.headers);
    console.log(error.data);
    console.log(error.request);
    console.log(codeMap[error.data.status]);
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    console.log(error.message);
  }

  throw error; // 如果throw，错误将继续抛出

  // 如果return, 则将值作为返回。 'return;' 相当于return undefined, 在处理结果时判断response是否有值即可.
  // return {some: 'data'};
}

export const request1 = extend({
  prefix: 'http://mgact2.api.mgtv.com:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  params: {
    token: 'xxxxx'
  },
  credentials: 'include',
  errorHandler,
})

// ===================================
// request.use(function (ctx, next) {
//   console.log('ctx=', ctx);
//   console.log('a1');
//   return next().then(function () {
//     console.log('a2');
//   })
// })

// request.use(function (ctx, next) {
//   console.log('ctx=', ctx);
//   console.log('b1');
//   return next().then(function () {
//     console.log('b2');
//   })
// })
// ===================================
// request.use(async (ctx, next) => {
//   //   console.log('ctx=', ctx);
//   console.log('a1');
//   await next()
//   console.log('a2');
// })

// request.use(async (ctx, next) => {
//   //   console.log('ctx=', ctx);
//   console.log('b1');
//   await next()
//   console.log('b2');
// })

// ===================================

export const request2 = extend({
  prefix: "//10.200.8.206:6582/captcha", // 统一设置 url 前缀
  // suffix: ".json", // 统一设置 url 后缀
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data"
  },
  params: {
    // token: "xxx" // 所有请求默认带上 token 参数
  }, // 将与请求一起发送的 URL 参数，参数会自动 encode 后添加到 URL 中
  data: {}, // 作为请求主体被发送的数据
  errorHandler (error) {// 异常处理
    console.err('error=====', error);
    const codeMap = {
      500: "系统异常",
      404: "请求无效",
      403: "请求403",
    };
    if (error.response) {
      let status = codeMap[error.response.status];
      if (status) {
        alert(status);
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
})

// request拦截器, 改变url 或 options.
request2.interceptors.request.use((url, options) => {
  return {
    url,
    options: { ...options, interceptors: true },
  };
});

// response拦截器
request2.interceptors.response.use((response) => {
  return response;
});
