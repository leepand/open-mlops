(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e03ac36"],{"0646":function(e,t,s){"use strict";s("511d")},4928:function(e,t,s){e.exports=s.p+"img/icon-yes.d2f9f035.svg"},"4ce3":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{margin:"30px"}},[i("el-divider"),i("el-descriptions",{staticClass:"margin-top",staticStyle:{"margin-top":"25px"},attrs:{title:"模型信息",column:3,size:e.size}},[i("template",{slot:"extra"},[i("router-link",{staticStyle:{"text-decoration":"none",color:"aliceblue"},attrs:{to:{name:"模型中心",params:{}},align:"right"}},[i("el-button",{},[i("i",{staticClass:"el-icon-arrow-left",staticStyle:{"margin-right":"10px"}}),e._v("返回模型中心")])],1)],1),i("el-descriptions-item",{attrs:{label:"模型名称"}},[e._v("\n        "+e._s(e.ModelbaseInfo.name)+"\n    ")]),i("el-descriptions-item",{attrs:{label:"创建时间"}},[e._v("\n        "+e._s(e._f("formatDate")(e.ModelbaseInfo.creation_timestamp))+"\n    ")]),i("el-descriptions-item",{attrs:{label:"最近修改时间"}},[e._v("\n        "+e._s(e._f("formatDate")(e.ModelbaseInfo.last_updated_timestamp))+"\n    ")])],2),i("el-divider"),i("el-collapse",{model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[i("el-collapse-item",{attrs:{title:"描述",name:"1"}},[i("div",[e._t("default",(function(){return[i("span",{directives:[{name:"show",rawName:"v-show",value:!e.editModelTaskVisible,expression:"!editModelTaskVisible"}]},[e._v(e._s(e.ModelbaseInfo.description))]),i("el-input",{directives:[{name:"show",rawName:"v-show",value:e.editModelTaskVisible,expression:"editModelTaskVisible"}],staticClass:"modelDescStyle",attrs:{type:"textarea",autosize:{minRows:4,maxRows:6}},model:{value:e.editModelForm.description,callback:function(t){e.$set(e.editModelForm,"description",t)},expression:"editModelForm.description"}}),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.editModelTaskVisible,expression:"!editModelTaskVisible"}],staticClass:"inline",staticStyle:{padding:"0px","margin-right":"10px"},attrs:{icon:"el-icon-edit",type:"text"},on:{click:function(t){return e.handleModelDescEdit("index",{description:"description"})}}}),i("br"),i("span",{directives:[{name:"show",rawName:"v-show",value:e.editModelTaskVisible,expression:"editModelTaskVisible"}]},[i("el-button",{attrs:{type:"text",icon:"el-icon-back"},nativeOn:{click:function(t){e.editModelTaskVisible=!1}}},[e._v("取消")]),i("el-button",{attrs:{type:"text",loading:e.editLoading,icon:"el-icon-check"},nativeOn:{click:function(t){return e.editSubmit.apply(null,arguments)}}},[e._v("保存")])],1)]}),{description:e.description})],2)]),i("el-collapse-item",{attrs:{title:"模型版本列表",name:"2"}},[i("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"10px"},attrs:{span:24}},[i("div",[i("el-radio-group",{model:{value:e.stageStatus,callback:function(t){e.stageStatus=t},expression:"stageStatus"}},[i("el-radio-button",{attrs:{label:"All"},nativeOn:{click:function(t){return e.clickBar(1)}}}),i("el-radio-button",{attrs:{label:"Active"},nativeOn:{click:function(t){return e.clickBar(2)}}})],1)],1)]),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.versionList,"highlight-current-row":""},on:{"selection-change":e.selsChangeVersionTracking}},[i("el-table-column",{attrs:{type:"selection","min-width":"5%"}}),i("el-table-column",{attrs:{prop:"version",label:"版本","min-width":"20%"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("img",{directives:[{name:"show",rawName:"v-show",value:"READY"===t.row.status,expression:"scope.row.status==='READY'"}],attrs:{src:s("4928")}}),i("img",{directives:[{name:"show",rawName:"v-show",value:"READY"!=t.row.status,expression:"scope.row.status!='READY'"}],attrs:{src:s("60be")}}),e._v("\n                         \n                        "),i("el-icon",{attrs:{name:"version"}}),i("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"模型版本详情",params:{version_id:t.row.version}}}},[e._v(e._s("Version "+t.row.version)+"\n                        ")])]}}])}),i("el-table-column",{attrs:{prop:"creation_timestamp",label:"注册时间","min-width":"20%",sortable:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                      "+e._s(e._f("formatDate")(t.row.creation_timestamp))+"\n                    ")]}}])}),i("el-table-column",{attrs:{prop:"user_id",label:"责任人","min-width":"10%"}}),i("el-table-column",{attrs:{prop:"current_stage",label:"所处阶段","min-width":"15%"},scopedSlots:e._u([{key:"default",fn:function(t){return["Staging"===t.row.current_stage?i("el-tag",{attrs:{type:"warning"}},[i("strong",[e._v(e._s(t.row.current_stage))])]):e._e(),"Production"===t.row.current_stage?i("el-tag",{attrs:{type:"success"}},[i("strong",[e._v(e._s(t.row.current_stage))])]):e._e(),"None"===t.row.current_stage?i("el-tag",{attrs:{type:"info"}},[i("strong",[e._v(e._s(t.row.current_stage))])]):e._e(),"Archived"===t.row.current_stage?i("el-tag",{attrs:{type:"info"}},[i("strong",[e._v(e._s(t.row.current_stage))])]):e._e()]}}])}),i("el-table-column",{attrs:{prop:"description",label:"版本描述","min-width":"30%"}})],1),i("el-col",{staticClass:"toolbar",attrs:{span:24}},[i("el-button",{attrs:{type:"success",disabled:0===this.selsVersionCompare.length},on:{click:e.compareVersion}},[e._v("Compare")]),i("el-pagination",{staticStyle:{float:"right"},attrs:{background:"",layout:"prev, pager, next","page-size":20,"page-count":e.total},on:{"current-change":e.handleCurrentChange}})],1)],1)],1)],1)},a=[],o=(s("c5f6"),s("4ec3")),n=s("1157"),r=s.n(n),l={data:function(){return{selsVersionCompare:[],versionList:[],stageStatus:"All",editLoading:!1,ModelbaseInfo:{},editModelTaskVisible:!1,activeNames:["2"],sels:[],total:0,page:1,listLoading:!1,editModelForm:{description:""}}},created:function(){},filters:{formatDate:function(e){var t=new Date(e),s=t.getFullYear(),i=t.getMonth()+1;i=i<10?"0"+i:i;var a=t.getDate();a=a<10?"0"+a:a;var o=t.getHours();o=o<10?"0"+o:o;var n=t.getMinutes();n=n<10?"0"+n:n;var r=t.getSeconds();return r=r<10?"0"+r:r,s+"-"+i+"-"+a+" "+o+":"+n+":"+r}},methods:{getVersionList:function(e){this.listLoading=!0;var t=this,s={model_name:this.$route.params.model_name,page:t.page,stage_btn:e,user_key:JSON.parse(sessionStorage.getItem("name"))},i={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(o["p"])(i,s).then((function(e){var s=e.msg,i=e.code,a=e.data;t.listLoading=!1,"999999"===i?(t.total=a.total,t.versionList=a.data,console.log(t.versionList,"self.versionList")):t.$message.error({message:s,center:!0})}))},clickBar:function(e){1===e?this.getVersionList("all"):this.getVersionList("active")},handleModelDescEdit:function(e,t){this.editModelTaskVisible=!0;var s=this.ModelbaseInfo.description;this.editModelForm=Object.assign({},{description:s})},disabledCheckBox:function(e,t){return!1===e.is_dir},handleModelOps:function(e){console.log(e,"command"),this.$router.push({name:"模型即服务",params:{project_id:this.$route.params.project_id,task_id:this.$route.params.task_id,model_id:e}}),this.$message("click on item "+e)},_getModelBaseinfo:function(){this.listLoading=!0;var e=this,t={name:this.$route.params.model_name,user_key:JSON.parse(sessionStorage.getItem("name"))},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(o["m"])(s,t).then((function(t){var s=t.msg,i=t.code,a=t.data;e.listLoading=!1,"999999"===i?e.ModelbaseInfo=a:e.$message.error({message:s,center:!0})}))},editSubmit:function(){var e=this;this.editLoading=!0;var t=JSON.stringify({model_name:this.$route.params.model_name,description:this.editModelForm.description,user_key:JSON.parse(sessionStorage.getItem("name"))});console.log(t,"dsdds"),r.a.ajax({type:"POST",url:o["t"]+"/api/models/edit_model_description",async:!0,data:t,headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(t){e.editLoading=!1,e.editModelTaskVisible=!1,e._getModelBaseinfo()}})},handleDel:function(e,t){var s=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then((function(){s.listLoading=!0;var e=s,i={project_id:Number(s.$route.params.project_id),table_name:t.tableName,ids:[t.id]},a={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};console.log(i,"paramsparamsparamslplp"),delSampleTable(a,i).then((function(t){var s=t.msg,i=t.code;"999999"===i?e.$message({message:"删除成功",center:!0,type:"success"}):e.$message.error({message:s,center:!0}),e.getSampleList()}))}))},handleCurrentChange:function(e){this.page=e,this.getVersionList("all")},selsChangeVersionTracking:function(e){this.selsVersionCompare=e},compareVersion:function(){var e=this,t=this.selsVersionCompare.map((function(e){return e.id})),s=this;this.$confirm("确认比较选中记录吗？","提示",{type:"warning"}).then((function(){s.listLoading=!0;Number(e.$route.params.project_id),JSON.parse(sessionStorage.getItem("token"));e.$router.push({name:"模型实验跟踪详情",params:{project_id:e.$route.params.project_id,task_id:e.$route.params.task_id,exp_id:t[0]},query:{exp_id_list:t}})}))}},mounted:function(){this.getVersionList("all"),this._getModelBaseinfo()}},c=l,d=(s("0646"),s("2877")),p=Object(d["a"])(c,i,a,!1,null,"ca0f9968",null);t["default"]=p.exports},"511d":function(e,t,s){},"60be":function(e,t,s){e.exports=s.p+"img/icon-no.439e8214.svg"}}]);
//# sourceMappingURL=chunk-6e03ac36.01d84850.js.map