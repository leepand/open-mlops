(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-232490e2"],{"4ec3":function(t,a,n){"use strict";n.d(a,"j",(function(){return r})),n.d(a,"i",(function(){return i})),n.d(a,"f",(function(){return o})),n.d(a,"c",(function(){return l})),n.d(a,"e",(function(){return d})),n.d(a,"b",(function(){return u})),n.d(a,"h",(function(){return _})),n.d(a,"a",(function(){return p}));var e=n("bc3a"),s=n.n(e);s.a.defaults.withCredentials=!0;var c="http://127.0.0.1:5001",r="http://127.0.0.1:5001",i=function(t){return s.a.post("".concat(c,"/login/userLogin"),t).then((function(t){return t.data}))},o=function(t,a){return s.a.get("".concat(c,"/api/campaigns"),{params:a,headers:t}).then((function(t){return t.data}))},l=function(t,a){return s.a.post("".concat(c,"/api/campaigns/add_campaign"),a,{headers:t}).then((function(t){return t.data}))},d=function(t,a){return s.a.get("".concat(c,"/api/campaigns/abexps"),{params:a,headers:t}).then((function(t){return t.data}))},u=function(t,a){return s.a.post("".concat(c,"/api/campaigns/add_ab_exp"),a,{headers:t}).then((function(t){return t.data}))},_=function(t,a){return s.a.get("".concat(c,"/api/abtesting/report/alt_table_report"),{params:a,headers:t}).then((function(t){return t.data}))},p=function(t,a){return s.a.post("".concat(c,"/api/abtesting/report/abset_winner"),a,{headers:t}).then((function(t){return t.data}))}},"786e":function(t,a,n){"use strict";n("a799")},a799:function(t,a,n){},b7b4:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"main-a"},[n("el-row",{attrs:{span:24}},[n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.campaign_cnt))]),n("div",[t._v("活动总数")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.ab_exp_cnt))]),n("div",[t._v("实验总数")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.models_cnt))]),n("div",[t._v("模型总数")])])],1)],1),n("el-row",{attrs:{span:24}},[n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[n("el-link",{attrs:{type:"danger"}},[t._v(t._s(t.pay_cvr_lift)+"%")])],1),n("div",[t._v("付费转化率提升")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.repurchase_lift)+"%")]),n("div",[t._v("复购率提升")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.pay_m_lift)+"%")]),n("div",[t._v("付费额提升")])])],1)],1),n("el-row",{attrs:{span:24}},[n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.retention_lift)+"%")]),n("div",[t._v("留存提升")])])],1),n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v(t._s(t.spin_consume_lift)+"%")]),n("div",[t._v("消耗提升")])])],1)],1),n("el-row",{attrs:{span:24}},[n("el-col",{staticClass:"inline",attrs:{span:6}},[n("el-card",{staticClass:"box-card"},[n("h1",[t._v("xx")]),n("div",[t._v("模型调用总次数")])])],1)],1)],1)},s=[],c=(n("4ec3"),n("c1df"),{data:function(){return{retention_lift:"x",pay_m_lift:"x",repurchase_lift:"x",pay_cvr_lift:"x",spin_consume_lift:"x",models_cnt:0,ab_exp_cnt:0,campaign_cnt:0,activeNames:["1"]}},methods:{getDashboardInfo:function(){var t=this,a={user_key:JSON.parse(sessionStorage.getItem("name"))},n={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};getDashboardDetail(n,a).then((function(a){var n=a.msg,e=a.code,s=a.data;t.listLoading=!1,"999999"===e?(t.campaign_cnt=s.data.campaign_cnt,t.ab_exp_cnt=s.data.ab_exp_cnt,t.models_cnt=s.data.models_cnt):t.$message.error({message:n,center:!0})}))}},mounted:function(){this.getDashboardInfo()}}),r=c,i=(n("786e"),n("2877")),o=Object(i["a"])(r,e,s,!1,null,"4391892c",null);a["default"]=o.exports}}]);
//# sourceMappingURL=chunk-232490e2.65c5f8ac.js.map