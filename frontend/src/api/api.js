import axios from 'axios'

axios.defaults.withCredentials = true // 配置为true
let base = 'http://54.214.110.168:8080'
export const test = 'http://54.214.110.168:8080'
export const delpoySocketIP = `http://54.214.110.168:8080`

export const requestLogin = params => {
  return axios.post(`${base}/login/userLogin`, params).then(res => res.data)
}

export const setpwd = params => {
  return axios.post(`${base}/setpwd`, params)
}

// 获取活动列表
export const getCampaigns = (headers, params) => {
  return axios.get(`${base}/api/campaigns`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}
// 添加活动
export const addCampaign = (headers, params) => {
  return axios.post(`${base}/api/campaigns/add_campaign`,
    params, {
      headers
    }).then(res => res.data)
}
// 获取实验基础信息
export const getAbExps = (headers, params) => {
  return axios.get(`${base}/api/campaigns/abexps`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}
// 创建实验
export const addAbExp = (headers, params) => {
  return axios.post(`${base}/api/campaigns/add_ab_exp`, params, {
    headers
  }).then(res => res.data)
}
// 获取ab测试结果
export const getTestResultList = (headers, params) => {
  return axios.get(`${base}/api/abtesting/report/alt_table_report`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}

// 设定实验的获胜者
export const absetWinner = (headers, params) => {
  return axios.post(`${base}/api/abtesting/report/abset_winner`,
    params, {
      headers
    }).then(res => res.data)
}
// 获取dashboard 信息
export const getDashboardDetail = (headers, params) => {
  return axios.get(`${base}/api/dashboard/get_dashboard_info`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}

// 获取模型实验信息
export const getModelExperiments = (headers, params) => {
  return axios.get(`${base}/api/experiments/get_model_experiments`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}
// 增加模型实验
export const addModelExperiment = (headers, params) => {
  return axios.post(`${base}/api/experiments/add_model_experiment`,
    params, {
      headers
    }).then(res => res.data)
}
// 获取模型实验基础信息
export const getExperimentbaseInfo = (headers, params) => {
  return axios.get(`${base}/api/experiments/get_model_experiment`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}

// 获取所有已注册的模型信息
export const getRegisteredModels = (headers, params) => {
  return axios.get(`${base}/api/models/get_registered_models`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}
// 获取 model runs
export const getModelRuns = (headers, params) => {
  return axios.get(`${base}/api/experiments/get_model_runs`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}
// 获取 model run
export const getModelRun = (headers, params) => {
  return axios.get(`${base}/api/experiments/get_model_run`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}

// 注册模型
export const RegisterModel = (headers, params) => {
  return axios.post(`${base}/api/models/register_model`,
    params, {
      headers
    }).then(res => res.data)
}
// 模型详情页
export const getModelBaseinfo = (headers, params) => {
  return axios.get(`${base}/api/models/get_model_base_info`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}

// 获取模型版本
export const getModelVersions = (headers, params) => {
  return axios.get(`${base}/api/models/get_model_versions`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}
// 获取版本信息
export const getModelVersionBaseinfo = (headers, params) => {
  return axios.get(`${base}/api/models/get_model_base_versioninfo`, {
    params: params,
    headers: headers
  }).then(res => res.data)
}
