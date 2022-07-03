(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38d702c4"],{4928:function(e,t,s){e.exports=s.p+"img/icon-yes.d2f9f035.svg"},"60be":function(e,t,s){e.exports=s.p+"img/icon-no.439e8214.svg"},8909:function(e,t,s){"use strict";s("d96a")},"8e33":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{margin:"30px"}},[i("el-divider"),i("el-descriptions",{staticClass:"margin-top",staticStyle:{"margin-top":"25px"},attrs:{title:"模型实验信息",column:3,size:e.size}},[i("template",{slot:"extra"},[i("router-link",{staticStyle:{"text-decoration":"none",color:"aliceblue"},attrs:{to:{name:"模型实验",params:{}},align:"right"}},[i("el-button",[i("i",{staticClass:"el-icon-arrow-left",staticStyle:{"margin-right":"10px"}}),e._v("\n            返回模型实验")])],1)],1),i("el-descriptions-item",{attrs:{label:"实验名称"}},[e._v("\n        "+e._s(e.ExperimentbaseInfo.name)+"\n    ")]),i("el-descriptions-item",{attrs:{label:"所处阶段"}},[e._v("\n        "+e._s(e.ExperimentbaseInfo.lifecycle_stage)+"\n    ")]),i("el-descriptions-item",{attrs:{label:"工件路径"}},[e._v("\n        "+e._s(e.ExperimentbaseInfo.artifact_location)+"\n    ")])],2),i("el-divider"),i("el-collapse",{model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[i("el-collapse-item",{attrs:{title:"描述",name:"1"}},[i("div",[e._t("default",(function(){return[i("span",{directives:[{name:"show",rawName:"v-show",value:!e.editModelTaskVisible,expression:"!editModelTaskVisible"}]},[e._v(e._s(e.ExperimentbaseInfo.tags[0].value))]),i("el-input",{directives:[{name:"show",rawName:"v-show",value:e.editModelTaskVisible,expression:"editModelTaskVisible"}],staticClass:"modelDescStyle",attrs:{type:"textarea",autosize:{minRows:4,maxRows:6}},model:{value:e.editModelForm.description,callback:function(t){e.$set(e.editModelForm,"description",t)},expression:"editModelForm.description"}}),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.editModelTaskVisible,expression:"!editModelTaskVisible"}],staticClass:"inline",staticStyle:{padding:"0px","margin-right":"10px"},attrs:{icon:"el-icon-edit",type:"text"},on:{click:function(t){return e.handleModelDescEdit("index",{description:"description"})}}}),i("br"),i("span",{directives:[{name:"show",rawName:"v-show",value:e.editModelTaskVisible,expression:"editModelTaskVisible"}]},[i("el-button",{attrs:{type:"text",icon:"el-icon-back"},nativeOn:{click:function(t){e.editModelTaskVisible=!1}}},[e._v("取消")]),i("el-button",{attrs:{type:"text",loading:e.editLoading,icon:"el-icon-check"},nativeOn:{click:function(t){return e.editSubmit.apply(null,arguments)}}},[e._v("保存")])],1)]}),{description:e.description})],2)]),i("el-collapse-item",{attrs:{title:"实验列表",name:"2"}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.modelRunsList,"highlight-current-row":""},on:{"selection-change":e.selsChangeVersionTracking}},[i("el-table-column",{attrs:{type:"selection","min-width":"5%"}}),i("el-table-column",{attrs:{prop:"version",label:"版本","min-width":"20%"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("img",{directives:[{name:"show",rawName:"v-show",value:"READY"===t.row.status,expression:"scope.row.status==='READY'"}],attrs:{src:s("4928")}}),i("img",{directives:[{name:"show",rawName:"v-show",value:"READY"!=t.row.status,expression:"scope.row.status!='READY'"}],attrs:{src:s("60be")}}),e._v("\n                         \n                        "),i("el-icon",{attrs:{name:"version"}}),i("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"模型版本详情",params:{version_id:t.row.version}}}},[e._v(e._s("Version "+t.row.version)+"\n                        ")])]}}])}),i("el-table-column",{attrs:{prop:"creation_timestamp",label:"注册时间","min-width":"20%",sortable:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                      "+e._s(e._f("formatDate")(t.row.creation_timestamp))+"\n                    ")]}}])}),i("el-table-column",{attrs:{prop:"user_id",label:"责任人","min-width":"10%"}}),i("el-table-column",{attrs:{prop:"current_stage",label:"所处阶段","min-width":"15%"},scopedSlots:e._u([{key:"default",fn:function(t){return["Staging"===t.row.current_stage?i("el-tag",{attrs:{type:"warning"}},[i("strong",[e._v(e._s(t.row.current_stage))])]):e._e(),"Production"===t.row.current_stage?i("el-tag",{attrs:{type:"success"}},[i("strong",[e._v(e._s(t.row.current_stage))])]):e._e(),"None"===t.row.current_stage?i("el-tag",{attrs:{type:"info"}},[i("strong",[e._v(e._s(t.row.current_stage))])]):e._e(),"Archived"===t.row.current_stage?i("el-tag",{attrs:{type:"info"}},[i("strong",[e._v(e._s(t.row.current_stage))])]):e._e()]}}])}),i("el-table-column",{attrs:{prop:"description",label:"版本描述","min-width":"30%"}})],1),i("el-col",{staticClass:"toolbar",attrs:{span:24}},[i("el-button",{attrs:{type:"success",disabled:0===this.selsVersionCompare.length},on:{click:e.compareVersion}},[e._v("Compare")]),i("el-pagination",{staticStyle:{float:"right"},attrs:{background:"",layout:"prev, pager, next","page-size":20,"page-count":e.total},on:{"current-change":e.handleCurrentChange}})],1)],1)],1)],1)},n=[],a=(s("c5f6"),s("4ec3")),o=s("1157"),r=s.n(o),l={data:function(){return{_filters:{name:""},selsVersionCompare:[],modelRunsList:[],editLoading:!1,ExperimentbaseInfo:{},editModelTaskVisible:!1,activeNames:["2"],sels:[],total:0,page:1,listLoading:!1,editModelForm:{description:""}}},created:function(){},filters:{formatDate:function(e){var t=new Date(e),s=t.getFullYear(),i=t.getMonth()+1;i=i<10?"0"+i:i;var n=t.getDate();n=n<10?"0"+n:n;var a=t.getHours();a=a<10?"0"+a:a;var o=t.getMinutes();o=o<10?"0"+o:o;var r=t.getSeconds();return r=r<10?"0"+r:r,s+"-"+i+"-"+n+" "+a+":"+o+":"+r}},methods:{getModelRunList:function(){this.listLoading=!0;var e=this,t={experiment_id:this.$route.params.experiment_id,user_key:JSON.parse(sessionStorage.getItem("name"))},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(a["o"])(s,t).then((function(t){var s=t.msg,i=t.code,n=t.data;e.listLoading=!1,"999999"===i?(e.modelRunsList=n,console.log(e.modelRunsList,"self.modelRunsList")):e.$message.error({message:s,center:!0})}))},handleModelDescEdit:function(e,t){this.editModelTaskVisible=!0;var s=this.ExperimentbaseInfo.tags[0].value;this.editModelForm=Object.assign({},{description:s})},disabledCheckBox:function(e,t){return!1===e.is_dir},handleModelOps:function(e){console.log(e,"command"),this.$router.push({name:"模型即服务",params:{project_id:this.$route.params.project_id,task_id:this.$route.params.task_id,model_id:e}}),this.$message("click on item "+e)},_getExperimentbaseInfo:function(){this.listLoading=!0;var e=this,t={experiment_id:this.$route.params.experiment_id,user_key:JSON.parse(sessionStorage.getItem("name"))},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(a["l"])(s,t).then((function(t){var s=t.msg,i=t.code,n=t.data;e.listLoading=!1,"999999"===i?e.ExperimentbaseInfo=n:e.$message.error({message:s,center:!0})}))},editSubmit:function(){var e=this;this.editLoading=!0;var t=JSON.stringify({experiment_id:this.$route.params.experiment_id,description:this.editModelForm.description,user_key:JSON.parse(sessionStorage.getItem("name"))});console.log(t,"dsdds"),r.a.ajax({type:"post",url:a["u"]+"/api/experiments/edit_experiment_description",async:!0,data:t,headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(t){e.editLoading=!1,e.editModelTaskVisible=!1,e._getExperimentbaseInfo()}})},handleDel:function(e,t){var s=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then((function(){s.listLoading=!0;var e=s,i={project_id:Number(s.$route.params.project_id),table_name:t.tableName,ids:[t.id]},n={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};console.log(i,"paramsparamsparamslplp"),delSampleTable(n,i).then((function(t){var s=t.msg,i=t.code;"999999"===i?e.$message({message:"删除成功",center:!0,type:"success"}):e.$message.error({message:s,center:!0}),e.getSampleList()}))}))},handleCurrentChange:function(e){this.page=e,this.getModelRunList()},selsChangeVersionTracking:function(e){this.selsVersionCompare=e},compareVersion:function(){var e=this,t=this.selsVersionCompare.map((function(e){return e.id})),s=this;this.$confirm("确认比较选中记录吗？","提示",{type:"warning"}).then((function(){s.listLoading=!0;Number(e.$route.params.project_id),JSON.parse(sessionStorage.getItem("token"));e.$router.push({name:"模型实验跟踪详情",params:{project_id:e.$route.params.project_id,task_id:e.$route.params.task_id,exp_id:t[0]},query:{exp_id_list:t}})}))}},mounted:function(){this.getModelRunList(),this._getExperimentbaseInfo()}},c=l,d=(s("8909"),s("2877")),p=Object(d["a"])(c,i,n,!1,null,"8a3c35f6",null);t["default"]=p.exports},d96a:function(e,t,s){}}]);
//# sourceMappingURL=chunk-38d702c4.317bc58b.js.map