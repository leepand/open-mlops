(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d210315"],{b79c:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",[s("br"),s("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[s("el-form",{attrs:{inline:!0,model:e.filters},nativeOn:{submit:function(e){e.preventDefault()}}},[s("el-form-item",[s("el-input",{attrs:{placeholder:"名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getModelList.apply(null,arguments)}},model:{value:e.filters.name,callback:function(t){e.$set(e.filters,"name",t)},expression:"filters.name"}})],1),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.getModelList}},[e._v("查询")])],1),s("el-form-item",[s("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("注册模型")])],1)],1)],1),s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.registeredmodels,"highlight-current-row":"","show-header":!1},on:{"selection-change":e.selsChange}},[s("el-table-column",{attrs:{prop:"name",label:"模型名称","min-width":"20%",sortable:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("router-link",{staticStyle:{cursor:"pointer",color:"#0000ff","text-decoration":"none"},attrs:{to:{name:"模型版本管理",params:{model_name:t.row.name}}}},[e._v("\n              "+e._s(t.row.name)+"\n            ")]),s("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"}},[e._v("私有")])],1),s("el-descriptions",{staticClass:"margin-top",staticStyle:{"margin-top":"0px"},attrs:{title:"",column:3,size:e.size}},[s("el-descriptions-item",{attrs:{label:"最近更新时间"}},[e._v("\n              "+e._s(e._f("formatDate")(t.row.last_updated_timestamp))+"\n           ")]),s("el-descriptions-item",{attrs:{label:"生产版本"}},[e._v("\n              "+e._s(t.row.latest_version_prodcution||"无")+"\n            ")]),s("el-descriptions-item",{attrs:{label:"最近版本"}},[e._v("\n                "+e._s(t.row.latest_version||"无")+"\n            ")])],1),t.row.description?s("div",{staticClass:"text item"},[s("el-tag",{attrs:{size:"small",type:"warning"}},[e._v("\n                "+e._s("模型描述："+t.row.description||!1)+"\n            ")])],1):e._e()],1)]}}])})],1),s("el-col",{staticClass:"toolbar",attrs:{span:24}},[s("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"prev, pager, next","page-size":10,"page-count":e.total},on:{"current-change":e.handleCurrentChange}})],1),s("el-dialog",{staticStyle:{width:"75%",left:"12.5%"},attrs:{title:"注册模型",visible:e.addFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addFormVisible=t}}},[s("el-form",{ref:"addForm",attrs:{model:e.addForm,"label-width":"80px",rules:e.addFormRules}},[s("el-form-item",{attrs:{label:"模型名称",prop:"name"}},[s("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}})],1),s("el-form-item",{attrs:{label:"模型描述",prop:"description"}},[s("el-input",{attrs:{type:"textarea",rows:2},model:{value:e.addForm.description,callback:function(t){e.$set(e.addForm,"description",t)},expression:"addForm.description"}}),s("span",[e._v("创建后，你可以将记录的模型注册为新版本。"),s("el-link",{attrs:{href:"https://www.zhihu.com/people/leepand",target:"_blank",type:"primary"}},[e._v("了解更多。")])],1)],1)],1),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{nativeOn:{click:function(t){e.addFormVisible=!1}}},[e._v("取消")]),s("el-button",{attrs:{type:"primary",loading:e.addLoading},nativeOn:{click:function(t){return e.addSubmit.apply(null,arguments)}}},[e._v("提交")])],1)],1)],1)},n=[],r=(s("7f7f"),s("1157")),o=s.n(r),i=s("c1df"),l=s.n(i),d=s("4ec3"),m={data:function(){return{forked:-1,users:{},filters:{name:""},registeredmodels:[],total:0,page:1,listLoading:!1,sels:[],addFormVisible:!1,addLoading:!1,addFormRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}],description:[{required:!1,message:"请输入版本号",trigger:"blur"},{max:1024,message:"不能超过1024个字符",trigger:"blur"}]},addForm:{name:"",description:""}}},filters:{formatDate:function(e){var t=new Date(e),s=t.getFullYear(),a=t.getMonth()+1;a=a<10?"0"+a:a;var n=t.getDate();n=n<10?"0"+n:n;var r=t.getHours();r=r<10?"0"+r:r;var o=t.getMinutes();o=o<10?"0"+o:o;var i=t.getSeconds();return i=i<10?"0"+i:i,s+"-"+a+"-"+n+" "+r+":"+o+":"+i}},methods:{handleFork:function(e){this.forked=e},formatTime2:function(e,t){var s=new Date(e[t.property]);return s.getFullYear()+"-"+s.getMonth()+"-"+s.getDate()+" "+s.getHours()+":"+s.getMinutes()+":"+s.getSeconds()},formatTime:function(e,t){var s=e[t.property];return"undefined"===typeof s?"":l()(s).format("YYYY-MM-DD HH:mm:ss")},getUserInfo:function(){var e=this,t={experiment_id:e.$route.params.experiment_id};o.a.ajax({type:"get",url:d["v"]+"/api/user/get_user_meta",async:!0,data:t,headers:{Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(t){"999999"===t.code?(e.users=t.data.users,console.log(e.users,"self.users")):e.$message.error({message:t.msg,center:!0})}})},getModelList:function(){this.listLoading=!0;var e=this,t={page:e.page,user_key:JSON.parse(sessionStorage.getItem("name")),name:e.filters.name},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(d["s"])(s,t).then((function(t){e.listLoading=!1;var s=t.msg,a=t.code,n=t.data;"999999"===a?(e.total=n.total,e.registeredmodels=n.data,console.log("self.registeredmodels",e.registeredmodels)):e.$message.error({message:s,center:!0})}))},handleCurrentChange:function(e){this.page=e,this.getModelList()},handleAdd:function(){this.addFormVisible=!0},addSubmit:function(){var e=this;this.$refs.addForm.validate((function(t){if(t){var s=e;e.$confirm("确认提交吗？","提示",{}).then((function(){s.addLoading=!0;var e=JSON.stringify({name:s.addForm.name,description:s.addForm.description,user:JSON.parse(sessionStorage.getItem("name"))}),t={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(d["a"])(t,e).then((function(e){var t=e.msg,a=e.code;s.addLoading=!1,"999999"===a?(s.$message({message:"模型注册成功",center:!0,type:"success"}),s.$refs["addForm"].resetFields(),s.addFormVisible=!1,s.getModelList()):"999997"===a?s.$message.error({message:t,center:!0}):(s.$message.error({message:t,center:!0}),s.$refs["addForm"].resetFields(),s.addFormVisible=!1,s.getModelList())}))}))}}))},batchRemove:function(){var e=this,t=this.sels.map((function(e){return e.name}));this.$confirm("确认删除选中模型吗？","提示",{type:"warning"}).then((function(){e.listLoading=!0;var s=e,a={names:t,user_key:JSON.parse(sessionStorage.getItem("name"))},n={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(d["delModelExperiment"])(n,a).then((function(e){var t=e.msg,a=e.code;"999999"===a?s.$message({message:"模型批量删除成功",center:!0,type:"success"}):s.$message.error({message:t,center:!0}),s.getModelList()}))}))},handleDel:function(e,t){var s=this;this.$confirm("确认删除该模型吗?","提示",{type:"warning"}).then((function(){s.listLoading=!0;var e=s,a={names:[t.name],user_key:JSON.parse(sessionStorage.getItem("name"))},n={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(d["delModelExperiment"])(n,a).then((function(t){var s=t.msg,a=t.code;"999999"===a?e.$message({message:"删除成功",center:!0,type:"success"}):e.$message.error({message:s,center:!0}),e.getModelList()}))}))},selsChange:function(e){this.sels=e}},mounted:function(){this.getModelList()}},c=m,u=s("2877"),g=Object(u["a"])(c,a,n,!1,null,null,null);t["default"]=g.exports}}]);
//# sourceMappingURL=chunk-2d210315.86d9cf93.js.map