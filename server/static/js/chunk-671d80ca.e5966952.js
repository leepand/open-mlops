(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-671d80ca"],{"4ec3":function(t,a,n){"use strict";n.d(a,"s",(function(){return c})),n.d(a,"r",(function(){return i})),n.d(a,"j",(function(){return o})),n.d(a,"d",(function(){return d})),n.d(a,"i",(function(){return u})),n.d(a,"c",(function(){return l})),n.d(a,"p",(function(){return p})),n.d(a,"b",(function(){return _})),n.d(a,"l",(function(){return f})),n.d(a,"m",(function(){return h})),n.d(a,"e",(function(){return m})),n.d(a,"o",(function(){return v})),n.d(a,"a",(function(){return g}));var e=n("bc3a"),r=n.n(e);r.a.defaults.withCredentials=!0;var s="http://127.0.0.1:5001",c="http://127.0.0.1:5001",i=function(t){return r.a.post("".concat(s,"/login/userLogin"),t).then((function(t){return t.data}))},o=function(t,a){return r.a.get("".concat(s,"/api/campaigns"),{params:a,headers:t}).then((function(t){return t.data}))},d=function(t,a){return r.a.post("".concat(s,"/api/campaigns/add_campaign"),a,{headers:t}).then((function(t){return t.data}))},u=function(t,a){return r.a.get("".concat(s,"/api/campaigns/abexps"),{params:a,headers:t}).then((function(t){return t.data}))},l=function(t,a){return r.a.post("".concat(s,"/api/campaigns/add_ab_exp"),a,{headers:t}).then((function(t){return t.data}))},p=function(t,a){return r.a.get("".concat(s,"/api/abtesting/report/alt_table_report"),{params:a,headers:t}).then((function(t){return t.data}))},_=function(t,a){return r.a.post("".concat(s,"/api/abtesting/report/abset_winner"),a,{headers:t}).then((function(t){return t.data}))},f=function(t,a){return r.a.get("".concat(s,"/api/dashboard/get_dashboard_info"),{params:a,headers:t}).then((function(t){return t.data}))},h=function(t,a){return r.a.get("".concat(s,"/api/experiments/get_model_experiments"),{params:a,headers:t}).then((function(t){return t.data}))},m=function(t,a){return r.a.post("".concat(s,"/api/experiments/add_model_experiment"),a,{headers:t}).then((function(t){return t.data}))},v=function(t,a){return r.a.get("".concat(s,"/api/models/get_registered_models"),{params:a,headers:t}).then((function(t){return t.data}))},g=function(t,a){return r.a.post("".concat(s,"/api/models/register_model"),a,{headers:t}).then((function(t){return t.data}))}},"560b":function(t,a,n){"use strict";n("dfa1")},b7b4:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"main-a"},[n("el-row",{attrs:{span:24}},[n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.campaign_cnt))]),n("div",[t._v("活动总数")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.ab_exp_cnt))]),n("div",[t._v("实验总数")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.models_cnt))]),n("div",[t._v("模型总数")])])],1)],1),n("el-row",{attrs:{span:24}},[n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[n("el-link",{attrs:{type:"danger"}},[t._v(t._s(t.pay_cvr_lift)+"%")])],1),n("div",[t._v("付费转化率提升")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.repurchase_lift)+"%")]),n("div",[t._v("复购率提升")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.pay_m_lift)+"%")]),n("div",[t._v("付费额提升")])])],1)],1),n("el-row",{attrs:{span:24}},[n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.retention_lift)+"%")]),n("div",[t._v("留存提升")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.spin_consume_lift)+"%")]),n("div",[t._v("消耗提升")])])],1)],1),n("el-row",{attrs:{span:24}},[n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v("xx")]),n("div",[t._v("模型调用总次数")])])],1)],1)],1)},r=[],s=n("4ec3"),c=(n("c1df"),{data:function(){return{retention_lift:"x",pay_m_lift:"x",repurchase_lift:"x",pay_cvr_lift:"x",spin_consume_lift:"x",models_cnt:0,ab_exp_cnt:0,campaign_cnt:0,activeNames:["1"]}},methods:{getDashboardInfo:function(){var t=this,a={user_key:JSON.parse(sessionStorage.getItem("name"))},n={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(s["l"])(n,a).then((function(a){var n=a.msg,e=a.code,r=a.data;t.listLoading=!1,"999999"===e?(t.campaign_cnt=r.data.campaign_cnt,t.ab_exp_cnt=r.data.ab_exp_cnt,t.models_cnt=r.data.models_cnt):t.$message.error({message:n,center:!0})}))}},mounted:function(){this.getDashboardInfo()}}),i=c,o=(n("560b"),n("2877")),d=Object(o["a"])(i,e,r,!1,null,"2cb53136",null);a["default"]=d.exports},dfa1:function(t,a,n){}}]);
//# sourceMappingURL=chunk-671d80ca.e5966952.js.map