import axios from 'axios';

const Axios = axios.create({
    timeout: 10000,
    withCredentials: true,
    baseURL: 'https://www.poker4d.club:10086',
    headers: {
      "Content-Type": "application/json"  
    }
});
  
Axios.interceptors.request.use(
    config => { // 在发送请求之前做某件事
    //   if (config.method === "post") {
    //     config.data = config.data;
    //   }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);
  
//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
      return res.data;
    },
    error => {
      return Promise.reject(error);
    }
);

export default Axios;