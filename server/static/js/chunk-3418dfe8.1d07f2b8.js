(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3418dfe8"],{"4ec3":function(t,n,a){"use strict";a.d(n,"v",(function(){return c})),a.d(n,"u",(function(){return i})),a.d(n,"i",(function(){return o})),a.d(n,"d",(function(){return u})),a.d(n,"h",(function(){return d})),a.d(n,"c",(function(){return l})),a.d(n,"t",(function(){return p})),a.d(n,"b",(function(){return _})),a.d(n,"k",(function(){return f})),a.d(n,"n",(function(){return m})),a.d(n,"e",(function(){return h})),a.d(n,"l",(function(){return g})),a.d(n,"s",(function(){return v})),a.d(n,"p",(function(){return b})),a.d(n,"o",(function(){return x})),a.d(n,"a",(function(){return C})),a.d(n,"m",(function(){return w})),a.d(n,"r",(function(){return k})),a.d(n,"q",(function(){return y}));var e=a("bc3a"),r=a.n(e);r.a.defaults.withCredentials=!0;var s="http://54.214.110.168:8080",c="http://54.214.110.168:8080",i=function(t){return r.a.post("".concat(s,"/login/userLogin"),t).then((function(t){return t.data}))},o=function(t,n){return r.a.get("".concat(s,"/api/campaigns"),{params:n,headers:t}).then((function(t){return t.data}))},u=function(t,n){return r.a.post("".concat(s,"/api/campaigns/add_campaign"),n,{headers:t}).then((function(t){return t.data}))},d=function(t,n){return r.a.get("".concat(s,"/api/campaigns/abexps"),{params:n,headers:t}).then((function(t){return t.data}))},l=function(t,n){return r.a.post("".concat(s,"/api/campaigns/add_ab_exp"),n,{headers:t}).then((function(t){return t.data}))},p=function(t,n){return r.a.get("".concat(s,"/api/abtesting/report/alt_table_report"),{params:n,headers:t}).then((function(t){return t.data}))},_=function(t,n){return r.a.post("".concat(s,"/api/abtesting/report/abset_winner"),n,{headers:t}).then((function(t){return t.data}))},f=function(t,n){return r.a.get("".concat(s,"/api/dashboard/get_dashboard_info"),{params:n,headers:t}).then((function(t){return t.data}))},m=function(t,n){return r.a.get("".concat(s,"/api/experiments/get_model_experiments"),{params:n,headers:t}).then((function(t){return t.data}))},h=function(t,n){return r.a.post("".concat(s,"/api/experiments/add_model_experiment"),n,{headers:t}).then((function(t){return t.data}))},g=function(t,n){return r.a.get("".concat(s,"/api/experiments/get_model_experiment"),{params:n,headers:t}).then((function(t){return t.data}))},v=function(t,n){return r.a.get("".concat(s,"/api/models/get_registered_models"),{params:n,headers:t}).then((function(t){return t.data}))},b=function(t,n){return r.a.get("".concat(s,"/api/experiments/get_model_runs"),{params:n,headers:t}).then((function(t){return t.data}))},x=function(t,n){return r.a.get("".concat(s,"/api/experiments/get_model_run"),{params:n,headers:t}).then((function(t){return t.data}))},C=function(t,n){return r.a.post("".concat(s,"/api/models/register_model"),n,{headers:t}).then((function(t){return t.data}))},w=function(t,n){return r.a.get("".concat(s,"/api/models/get_model_base_info"),{params:n,headers:t}).then((function(t){return t.data}))},k=function(t,n){return r.a.get("".concat(s,"/api/models/get_model_versions"),{params:n,headers:t}).then((function(t){return t.data}))},y=function(t,n){return r.a.get("".concat(s,"/api/models/get_model_base_versioninfo"),{params:n,headers:t}).then((function(t){return t.data}))}},"666d":function(t,n,a){},b7b4:function(t,n,a){"use strict";a.r(n);var e=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"main-a"},[a("el-row",{attrs:{span:24}},[a("el-col",{staticClass:"inline",attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("h1",[t._v(t._s(t.campaign_cnt))]),a("div",[t._v("营销活动总数")])])],1),a("el-col",{staticClass:"inline",attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("h1",[t._v(t._s(t.ab_exp_cnt))]),a("div",[t._v("A/B在线实验总数")])])],1),a("el-col",{staticClass:"inline",attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("h1",[a("router-link",{staticStyle:{cursor:"pointer",color:"#0000ff","text-decoration":"none"},attrs:{to:{name:"模型中心",params:{}}}},[t._v("\n            "+t._s(t.models_cnt)+"\n          ")])],1),a("div",[t._v("注册的模型总数")])])],1)],1),a("el-row",{attrs:{span:24}},[a("el-col",{staticClass:"inline",attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("h1",[a("el-link",{attrs:{type:"primary"}},[t._v(t._s(t.pay_cvr_lift)+"%")])],1),a("div",[t._v("付费转化率提升")])])],1),a("el-col",{staticClass:"inline",attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("h1",[t._v(t._s(t.repurchase_lift)+"%")]),a("div",[t._v("复购率提升")])])],1),a("el-col",{staticClass:"inline",attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("h1",[t._v(t._s(t.pay_m_lift)+"%")]),a("div",[t._v("付费额提升")])])],1)],1),a("el-row",{attrs:{span:24}},[a("el-col",{staticClass:"inline",attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("h1",[t._v(t._s(t.retention_lift)+"%")]),a("div",[t._v("留存提升")])])],1),a("el-col",{staticClass:"inline",attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("h1",[t._v(t._s(t.spin_consume_lift)+"%")]),a("div",[t._v("消耗提升")])])],1)],1),a("el-row",{attrs:{span:24}},[a("el-col",{staticClass:"inline",attrs:{span:6}},[a("el-card",{staticClass:"box-card"},[a("h1",[t._v("xx")]),a("div",[t._v("模型调用总次数")])])],1)],1)],1)},r=[],s=a("4ec3"),c=(a("c1df"),{data:function(){return{retention_lift:"x",pay_m_lift:"x",repurchase_lift:"x",pay_cvr_lift:"x",spin_consume_lift:"x",models_cnt:0,ab_exp_cnt:0,campaign_cnt:0,activeNames:["1"]}},methods:{getDashboardInfo:function(){var t=this,n={user_key:JSON.parse(sessionStorage.getItem("name"))},a={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(s["k"])(a,n).then((function(n){var a=n.msg,e=n.code,r=n.data;t.listLoading=!1,"999999"===e?(t.campaign_cnt=r.data.campaign_cnt,t.ab_exp_cnt=r.data.ab_exp_cnt,t.models_cnt=r.data.models_cnt):t.$message.error({message:a,center:!0})}))}},mounted:function(){this.getDashboardInfo()}}),i=c,o=(a("e40c"),a("2877")),u=Object(o["a"])(i,e,r,!1,null,"214eabcc",null);n["default"]=u.exports},e40c:function(t,n,a){"use strict";a("666d")}}]);
//# sourceMappingURL=chunk-3418dfe8.1d07f2b8.js.map