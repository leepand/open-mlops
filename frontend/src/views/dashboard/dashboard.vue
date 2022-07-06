<template>
  <div class="main-a">
    <el-row :span="24">
      <el-col :span="6" class="inline">
        <el-card class="box-card">
          <h1>{{ campaign_cnt }}</h1>
          <div>营销活动总数</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="inline">
        <el-card class="box-card">
          <h1>{{ ab_exp_cnt }}</h1>
          <div>A/B在线实验总数</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="inline">
        <el-card class="box-card">
          <h1>
            <router-link
              :to="{ name: '模型中心', params: {} }"
              style="cursor: pointer; color: #0000ff; text-decoration: none"
            >
              {{ models_cnt }}
            </router-link>
          </h1>
          <div>注册的模型总数</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col :span="6" class="inline">
        <el-card class="box-card">
          <h1>
            <el-link type="primary">{{ pay_cvr_lift }}%</el-link>
          </h1>
          <div>付费转化率提升</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="inline">
        <el-card class="box-card">
          <h1>{{ repurchase_lift }}%</h1>
          <div>复购率提升</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="inline">
        <el-card class="box-card">
          <h1>{{ pay_m_lift }}%</h1>
          <div>付费额提升</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col :span="6" class="inline">
        <el-card class="box-card">
          <h1>{{ retention_lift }}%</h1>
          <div>留存提升</div>
        </el-card>
      </el-col>
      <el-col :span="6" class="inline">
        <el-card class="box-card">
          <h1>{{ spin_consume_lift }}%</h1>
          <div>消耗提升</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col :span="6" class="inline">
        <el-card class="box-card">
          <h1>xx</h1>
          <div>模型调用总次数</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDashboardDetail } from '@/api/api'
export default {
  data () {
    return {
      retention_lift: 'x',
      pay_m_lift: 'x',
      repurchase_lift: 'x',
      pay_cvr_lift: 'x',
      spin_consume_lift: 'x',
      models_cnt: 0,
      ab_exp_cnt: 0,
      campaign_cnt: 0,
      activeNames: ['1']
    }
  },
  methods: {
    getDashboardInfo () {
      var self = this
      let params = { user_key: JSON.parse(sessionStorage.getItem('name')) }
      let headers = {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + JSON.parse(sessionStorage.getItem('token'))
      }
      getDashboardDetail(headers, params).then((_data) => {
        let { msg, code, data } = _data
        self.listLoading = false
        if (code === '999999') {
          self.campaign_cnt = data.data.campaign_cnt
          self.ab_exp_cnt = data.data.ab_exp_cnt
          self.models_cnt = data.data.models_cnt
        } else {
          self.$message.error({
            message: msg,
            center: true
          })
        }
      })
    }
  },
  mounted () {
    this.getDashboardInfo()
  }
}
</script>

<style lang="scss" scoped>
//@import url("//unpkg.com/element-ui@2.7.2/lib/theme-chalk/index.css");
.box-card {
  width: 100%;
  height: 100%;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.main-a {
  margin: 10px;
  margin-top: 10px;
}
.inline {
  margin: 10px;
  margin-left: 0px;
  margin-right: 10px;
}
</style>
