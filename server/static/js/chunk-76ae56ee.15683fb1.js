(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76ae56ee"],{"6af0":function(e,t,s){"use strict";s("d97a")},"6ceb":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticStyle:{margin:"30px"}},[s("el-divider"),s("div",[s("el-descriptions",{staticClass:"margin-top",staticStyle:{"margin-top":"25px"},attrs:{title:"模型版本信息",column:3,size:e.size}},[s("template",{slot:"extra"},[s("router-link",{staticStyle:{"text-decoration":"none",color:"aliceblue"},attrs:{to:{name:"模型版本管理",params:{model_name:this.$route.params.model_name}},align:"right"}},[s("el-button",{},[s("i",{staticClass:"el-icon-arrow-left",staticStyle:{"margin-right":"10px"}}),e._v("返回模型版本管理")])],1)],1),s("el-descriptions-item",{attrs:{label:"模型名称"}},[e._v("\n         "+e._s(e.ModelVersionbaseInfo.name)+"\n     ")]),s("el-descriptions-item",{attrs:{label:"模型版本"}},[e._v("\n         "+e._s(e.ModelVersionbaseInfo.version)+"\n     ")]),s("el-descriptions-item",{attrs:{label:"创建时间"}},[e._v("\n         "+e._s(e._f("formatDate")(e.ModelVersionbaseInfo.creation_timestamp))+"\n     ")]),s("el-descriptions-item",{attrs:{label:"最近修改时间"}},[e._v("\n         "+e._s(e._f("formatDate")(e.ModelVersionbaseInfo.last_updated_timestamp))+"\n     ")]),s("el-descriptions-item",{attrs:{label:"Stage"}},[s("span",[s("el-dropdown",{on:{command:e.handleModelStage}},[s("span",{staticClass:"el-dropdown-link"},[s("el-tag",{attrs:{size:"small",type:e.stage_status1}},[e._v(e._s(e.ModelVersionbaseInfo.current_stage))]),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})],1),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"a"}},[e._v("转换为    "),s("i",{staticClass:"el-icon-right"}),s("el-tag",{attrs:{size:"small",type:e.stage_status2}},[e._v(e._s(e.to_be_stage2))])],1),s("el-dropdown-item",{attrs:{command:"b"}},[e._v("转换为    "),s("i",{staticClass:"el-icon-right"}),s("el-tag",{attrs:{size:"small",type:e.stage_status3}},[e._v(e._s(e.to_be_stage3))])],1),s("el-dropdown-item",{attrs:{command:"c"}},[e._v("转换为    "),s("i",{staticClass:"el-icon-right"}),s("el-tag",{attrs:{size:"small",type:e.stage_status4}},[e._v(e._s(e.to_be_stage4))])],1)],1)],1)],1)])],2),s("div",{staticClass:"text item"},[e._v("\n       "+e._s("Source Run："+e.ModelVersionbaseInfo.run_id)+"\n   ")])],1),s("br"),s("el-divider"),s("el-collapse",{model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[s("el-collapse-item",{attrs:{title:"描述",name:"1"}},[s("div",[e._t("default",(function(){return[s("span",{directives:[{name:"show",rawName:"v-show",value:!e.editModelVersionVisible,expression:"!editModelVersionVisible"}]},[e._v(e._s(e.ModelVersionbaseInfo.description||"无"))]),s("el-input",{directives:[{name:"show",rawName:"v-show",value:e.editModelVersionVisible,expression:"editModelVersionVisible"}],staticClass:"modelDescStyle",attrs:{type:"textarea",autosize:{minRows:4,maxRows:6}},model:{value:e.editModelForm.description,callback:function(t){e.$set(e.editModelForm,"description",t)},expression:"editModelForm.description"}}),s("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.editModelVersionVisible,expression:"!editModelVersionVisible"}],staticClass:"inline",staticStyle:{padding:"0px","margin-right":"10px"},attrs:{icon:"el-icon-edit",type:"text"},on:{click:function(t){return e.handleModelVersionDescEdit("index",{description:"description"})}}}),s("br"),s("span",{directives:[{name:"show",rawName:"v-show",value:e.editModelVersionVisible,expression:"editModelVersionVisible"}]},[s("el-button",{attrs:{type:"text",icon:"el-icon-back"},nativeOn:{click:function(t){e.editModelVersionVisible=!1}}},[e._v("取消")]),s("el-button",{attrs:{type:"text",loading:e.editLoading,icon:"el-icon-check"},nativeOn:{click:function(t){return e.editSubmit.apply(null,arguments)}}},[e._v("保存")])],1)]}),{description:e.description})],2)])],1),s("el-dialog",{attrs:{title:"Stage Transition",visible:e.StageTranVisible,width:"30%"},on:{"update:visible":function(t){e.StageTranVisible=t}}},[s("span",[e._v("Transition to     "),s("i",{staticClass:"el-icon-right"}),e._v("    "),s("el-tag",{attrs:{size:"small",type:e.stage_status0}},[e._v("\n           "+e._s(e.status_msg))])],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.StageTranVisible=!1}}},[e._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:e.StageTranSubmit}},[e._v("确 定")])],1)])],1)},a=[],o=(s("c5f6"),s("4ec3")),n=s("1157"),r=s.n(n),l={data:function(){return{status_msg:"",StageTranVisible:!1,to_be_stage2:"None",to_be_stage3:"None",to_be_stage4:"None",stage_status1:"info",stage_status2:"info",stage_status3:"info",stage_status4:"info",selsVersionCompare:[],versionList:[],stageStatus:"All",editLoading:!1,ModelVersionbaseInfo:{},editModelVersionVisible:!1,activeNames:["1"],sels:[],total:0,page:1,listLoading:!1,editModelForm:{description:""}}},created:function(){},filters:{formatDate:function(e){var t=new Date(e),s=t.getFullYear(),i=t.getMonth()+1;i=i<10?"0"+i:i;var a=t.getDate();a=a<10?"0"+a:a;var o=t.getHours();o=o<10?"0"+o:o;var n=t.getMinutes();n=n<10?"0"+n:n;var r=t.getSeconds();return r=r<10?"0"+r:r,s+"-"+i+"-"+a+" "+o+":"+n+":"+r}},methods:{StageTranSubmit:function(){var e=this,t=this,s=JSON.stringify({model_name:this.$route.params.model_name,version_id:this.$route.params.version_id,stage:this.status_msg,user_key:JSON.parse(sessionStorage.getItem("name"))});console.log(s,"dsdds"),r.a.ajax({type:"post",url:o["s"]+"/api/models/model_stage_transform",async:!0,data:s,headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(s){t._getModelVersionBaseinfo(),e.StageTranVisible=!1}})},handleModelStage:function(e){this.StageTranVisible=!0,this.status_msg="a"===e?this.to_be_stage2:"b"===e?this.to_be_stage3:this.to_be_stage4,"Production"===this.status_msg?this.stage_status0="success":"Staging"===this.status_msg?this.stage_status0="warning":this.stage_status0="info"},getVersionList:function(e){this.listLoading=!0;var t=this,s={model_name:this.$route.params.model_name,page:t.page,stage_btn:e,user_key:JSON.parse(sessionStorage.getItem("name"))},i={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(o["o"])(i,s).then((function(e){var s=e.msg,i=e.code,a=e.data;t.listLoading=!1,"999999"===i?(t.total=a.total,t.versionList=a.data,console.log(t.versionList,"self.versionList")):t.$message.error({message:s,center:!0})}))},clickBar:function(e){1==e?this.getVersionList("all"):this.getVersionList("active")},handleModelVersionDescEdit:function(e,t){this.editModelVersionVisible=!0;var s=this.ModelVersionbaseInfo.description;this.editModelForm=Object.assign({},{description:s})},disabledCheckBox:function(e,t){return!1===e.is_dir},handleModelOps:function(e){console.log(e,"command"),this.$router.push({name:"模型即服务",params:{project_id:this.$route.params.project_id,task_id:this.$route.params.task_id,model_id:e}}),this.$message("click on item "+e)},_getModelVersionBaseinfo:function(){this.listLoading=!0;var e=this,t={name:this.$route.params.model_name,version:this.$route.params.version_id,user_key:JSON.parse(sessionStorage.getItem("name"))},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(o["n"])(s,t).then((function(t){var s=t.msg,i=t.code,a=t.data;e.listLoading=!1,"999999"===i?(e.ModelVersionbaseInfo=a,"Production"===e.ModelVersionbaseInfo.current_stage?(e.stage_status1="success",e.to_be_stage2="Staging",e.stage_status2="warning",e.to_be_stage3="None",e.stage_status3="info",e.to_be_stage4="Archived",e.stage_status4="info"):"Staging"===e.ModelVersionbaseInfo.current_stage?(e.stage_status1="warning",e.to_be_stage2="Production",e.stage_status2="success",e.to_be_stage3="None",e.stage_status3="info",e.to_be_stage4="Archived",e.stage_status4="info"):"Archived"===e.ModelVersionbaseInfo.current_stage?(e.stage_status1="info",e.to_be_stage2="Production",e.stage_status2="success",e.to_be_stage3="None",e.stage_status3="info",e.to_be_stage4="Staging",e.stage_status4="warning"):(e.stage_status1="info",e.to_be_stage2="Production",e.stage_status2="success",e.to_be_stage3="Archived",e.stage_status3="info",e.to_be_stage4="Staging",e.stage_status4="warning"),console.log(e.ModelVersionbaseInfo,"ModelbaseInfo")):e.$message.error({message:s,center:!0})}))},editSubmit:function(){var e=this;this.editLoading=!0;var t=JSON.stringify({model_name:this.$route.params.model_name,version:this.$route.params.version_id,description:this.editModelForm.description,user_key:JSON.parse(sessionStorage.getItem("name"))});console.log(t,"dsdds"),r.a.ajax({type:"POST",url:o["s"]+"/api/models/edit_model_version_description",async:!0,data:t,headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(t){e.editLoading=!1,e.editModelVersionVisible=!1,e._getModelVersionBaseinfo()}})},handleDel:function(e,t){var s=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then((function(){s.listLoading=!0;var e=s,i={project_id:Number(s.$route.params.project_id),table_name:t.tableName,ids:[t.id]},a={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};console.log(i,"paramsparamsparamslplp"),delSampleTable(a,i).then((function(t){var s=t.msg,i=t.code;"999999"===i?e.$message({message:"删除成功",center:!0,type:"success"}):e.$message.error({message:s,center:!0}),e.getSampleList()}))}))},handleCurrentChange:function(e){this.page=e,this.getVersionList("all")},selsChangeVersionTracking:function(e){this.selsVersionCompare=e},compareVersion:function(){var e=this,t=this.selsVersionCompare.map((function(e){return e.id})),s=this;this.$confirm("确认比较选中记录吗？","提示",{type:"warning"}).then((function(){s.listLoading=!0;Number(e.$route.params.project_id),JSON.parse(sessionStorage.getItem("token"));e.$router.push({name:"模型实验跟踪详情",params:{project_id:e.$route.params.project_id,task_id:e.$route.params.task_id,exp_id:t[0]},query:{exp_id_list:t}})}))}},mounted:function(){this._getModelVersionBaseinfo()}},d=l,c=(s("6af0"),s("2877")),g=Object(c["a"])(d,i,a,!1,null,"762cd7e7",null);t["default"]=g.exports},d97a:function(e,t,s){}}]);
//# sourceMappingURL=chunk-76ae56ee.15683fb1.js.map