(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14656f67"],{"320d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("br"),a("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[a("el-form",{attrs:{inline:!0,model:e.filters},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getModelExperimentList.apply(null,arguments)}},model:{value:e.filters.name,callback:function(t){e.$set(e.filters,"name",t)},expression:"filters.name"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.getModelExperimentList}},[e._v("查询")])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("模型项目")])],1)],1)],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.modelexperiments,"highlight-current-row":"","show-header":!1},on:{"selection-change":e.selsChange}},[a("el-table-column",{attrs:{prop:"name",label:"模型项目名称","min-width":"20%",sortable:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("router-link",{staticStyle:{cursor:"pointer",color:"#0000ff","text-decoration":"none"},attrs:{to:{name:"模型实验跟踪",params:{experiment_id:t.row.experiment_id}}}},[e._v("\n              "+e._s(t.row.name)+"\n            ")]),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"}},[e._v("私有")])],1),a("el-descriptions",{staticClass:"margin-top",staticStyle:{"margin-top":"0px"},attrs:{title:"",column:3,size:e.size}},[a("el-descriptions-item",{attrs:{label:"lifecycle_stage"}},[a("el-tag",{attrs:{size:"small",type:"warning"}},[e._v(e._s(t.row.lifecycle_stage))])],1),a("el-descriptions-item",{attrs:{label:"项目编号"}},[a("el-tag",{attrs:{size:"small",type:"info"}},[e._v(e._s(t.row.experiment_id))])],1),a("el-descriptions-item",{attrs:{label:"创建人"}},[e._v("暂无")])],1),e._l(1,(function(n){return a("div",{key:n,staticClass:"text item"},[e._v("\n            "+e._s("工件地址："+t.row.artifact_location)+"\n          ")])}))],2)]}}])})],1),a("el-col",{staticClass:"toolbar",attrs:{span:24}},[a("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"prev, pager, next","page-size":10,"page-count":e.total},on:{"current-change":e.handleCurrentChange}})],1),a("el-dialog",{staticStyle:{width:"75%",left:"12.5%"},attrs:{title:"创建模型项目",visible:e.addFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addFormVisible=t}}},[a("el-form",{ref:"addForm",attrs:{model:e.addForm,"label-width":"80px",rules:e.addFormRules}},[a("el-form-item",{attrs:{label:"模型项目",prop:"name"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name",t)},expression:"addForm.name"}})],1),a("el-form-item",{attrs:{label:"工件路径",prop:"artifact_location"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.artifact_location,callback:function(t){e.$set(e.addForm,"artifact_location",t)},expression:"addForm.artifact_location"}})],1),a("el-form-item",{attrs:{label:"标签",prop:"tag"}},[a("el-input",{attrs:{type:"textarea",rows:2},model:{value:e.addForm.tag,callback:function(t){e.$set(e.addForm,"tag",t)},expression:"addForm.tag"}}),a("span",[e._v("创建后，您可以将模型参数和工件注册到该实验下。"),a("el-link",{attrs:{href:"https://www.zhihu.com/people/leepand",target:"_blank",type:"primary"}},[e._v("了解更多。")])],1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{nativeOn:{click:function(t){e.addFormVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary",loading:e.addLoading},nativeOn:{click:function(t){return e.addSubmit.apply(null,arguments)}}},[e._v("提交")])],1)],1)],1)},s=[],o=a("7618"),r=(a("7f7f"),a("1157")),i=a.n(r),l=a("c1df"),d=a.n(l),m=a("4ec3"),c={data:function(){return{forked:-1,users:{},filters:{name:""},modelexperiments:[],total:0,page:1,listLoading:!1,sels:[],addFormVisible:!1,addLoading:!1,addFormRules:{name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}],description:[{required:!1,message:"请输入版本号",trigger:"blur"},{max:1024,message:"不能超过1024个字符",trigger:"blur"}]},addForm:{name:"",description:""}}},methods:{handleFork:function(e){this.forked=e},formatTime2:function(e,t){var a=new Date(e[t.property]);return a.getFullYear()+"-"+a.getMonth()+"-"+a.getDate()+" "+a.getHours()+":"+a.getMinutes()+":"+a.getSeconds()},formatTime:function(e,t){var a=e[t.property];return"undefined"===typeof a?"":d()(a).format("YYYY-MM-DD HH:mm:ss")},getUserInfo:function(){var e=this,t={experiment_id:e.$route.params.experiment_id};i.a.ajax({type:"get",url:m["s"]+"/api/user/get_user_meta",async:!0,data:t,headers:{Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(t){"999999"===t.code?(e.users=t.data.users,console.log(e.users,"self.users")):e.$message.error({message:t.msg,center:!0})}})},getModelExperimentList:function(){this.listLoading=!0;var e=this,t={page:e.page,user_key:JSON.parse(sessionStorage.getItem("name")),name:e.filters.name},a={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(m["m"])(a,t).then((function(t){e.listLoading=!1;var a=t.msg,n=t.code,s=t.data;"999999"===n?(e.total=s.total,e.modelexperiments=s.data["experiments"],console.log("self.modelexperiments",e.modelexperiments,Object(o["a"])(e.modelexperiments))):e.$message.error({message:a,center:!0})}))},handleCurrentChange:function(e){this.page=e,this.getModelExperimentList()},handleAdd:function(){this.addFormVisible=!0},addSubmit:function(){var e=this;this.$refs.addForm.validate((function(t){if(t){var a=e;e.$confirm("确认提交吗？","提示",{}).then((function(){a.addLoading=!0;var e=JSON.stringify({name:a.addForm.name,tag:a.addForm.tag,artifact_location:a.addForm.artifact_location,user:JSON.parse(sessionStorage.getItem("name"))}),t={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(m["e"])(t,e).then((function(e){var t=e.msg,n=e.code;a.addLoading=!1,"999999"===n?(a.$message({message:"模型项目添加成功",center:!0,type:"success"}),a.$refs["addForm"].resetFields(),a.addFormVisible=!1,a.getModelExperimentList()):"999997"===n?a.$message.error({message:t,center:!0}):(a.$message.error({message:t,center:!0}),a.$refs["addForm"].resetFields(),a.addFormVisible=!1,a.getModelExperimentList())}))}))}}))},batchRemove:function(){var e=this,t=this.sels.map((function(e){return e.name}));this.$confirm("确认删除选中模型吗？","提示",{type:"warning"}).then((function(){e.listLoading=!0;var a=e,n={names:t,user_key:JSON.parse(sessionStorage.getItem("name"))},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(m["delModelExperiment"])(s,n).then((function(e){var t=e.msg,n=e.code;"999999"===n?a.$message({message:"模型批量删除成功",center:!0,type:"success"}):a.$message.error({message:t,center:!0}),a.getModelExperimentList()}))}))},handleDel:function(e,t){var a=this;this.$confirm("确认删除该模型吗?","提示",{type:"warning"}).then((function(){a.listLoading=!0;var e=a,n={names:[t.name],user_key:JSON.parse(sessionStorage.getItem("name"))},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(m["delModelExperiment"])(s,n).then((function(t){var a=t.msg,n=t.code;"999999"===n?e.$message({message:"删除成功",center:!0,type:"success"}):e.$message.error({message:a,center:!0}),e.getModelExperimentList()}))}))},selsChange:function(e){this.sels=e}},mounted:function(){this.getModelExperimentList()}},p=c,u=a("2877"),g=Object(u["a"])(p,n,s,!1,null,null,null);t["default"]=g.exports},"5d58":function(e,t,a){e.exports=a("d8d6")},"67bb":function(e,t,a){e.exports=a("f921")},7618:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("67bb"),s=a.n(n),o=a("5d58"),r=a.n(o);function i(e){return i="function"==typeof s.a&&"symbol"==typeof r.a?function(e){return typeof e}:function(e){return e&&"function"==typeof s.a&&e.constructor===s.a&&e!==s.a.prototype?"symbol":typeof e},i(e)}}}]);
//# sourceMappingURL=chunk-14656f67.175c41d4.js.map