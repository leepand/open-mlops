(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a4a082a"],{3918:function(e,t,i){},"3d5f":function(e,t,i){"use strict";i("3918")},"6ceb":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{margin:"30px"}},[i("el-divider"),i("div",[i("el-descriptions",{staticClass:"margin-top",staticStyle:{"margin-top":"25px"},attrs:{title:"模型版本信息",column:3,size:e.size}},[i("template",{slot:"extra"},[i("router-link",{staticStyle:{"text-decoration":"none",color:"aliceblue"},attrs:{to:{name:"模型版本管理",params:{model_name:this.$route.params.model_name}},align:"right"}},[i("el-button",{},[i("i",{staticClass:"el-icon-arrow-left",staticStyle:{"margin-right":"10px"}}),e._v("返回模型版本管理")])],1)],1),i("el-descriptions-item",{attrs:{label:"模型名称"}},[e._v("\n          "+e._s(e.ModelVersionbaseInfo.name)+"\n      ")]),i("el-descriptions-item",{attrs:{label:"模型版本"}},[e._v("\n          "+e._s(e.ModelVersionbaseInfo.version)+"\n      ")]),i("el-descriptions-item",{attrs:{label:"创建时间"}},[e._v("\n          "+e._s(e._f("formatDate")(e.ModelVersionbaseInfo.creation_timestamp))+"\n      ")]),i("el-descriptions-item",{attrs:{label:"最近修改时间"}},[e._v("\n          "+e._s(e._f("formatDate")(e.ModelVersionbaseInfo.last_updated_timestamp))+"\n      ")]),i("el-descriptions-item",{attrs:{label:"Stage"}},[i("span",[i("el-dropdown",{on:{command:e.handleModelStage}},[i("span",{staticClass:"el-dropdown-link"},[i("el-tag",{attrs:{size:"small",type:e.stage_status1}},[e._v(e._s(e.ModelVersionbaseInfo.current_stage))]),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})],1),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{attrs:{command:"a"}},[e._v("转换为    "),i("i",{staticClass:"el-icon-right"}),i("el-tag",{attrs:{size:"small",type:e.stage_status2}},[e._v(e._s(e.to_be_stage2))])],1),i("el-dropdown-item",{attrs:{command:"b"}},[e._v("转换为    "),i("i",{staticClass:"el-icon-right"}),i("el-tag",{attrs:{size:"small",type:e.stage_status3}},[e._v(e._s(e.to_be_stage3))])],1),i("el-dropdown-item",{attrs:{command:"c"}},[e._v("转换为    "),i("i",{staticClass:"el-icon-right"}),i("el-tag",{attrs:{size:"small",type:e.stage_status4}},[e._v(e._s(e.to_be_stage4))])],1)],1)],1)],1)])],2),i("div",{staticClass:"text item"},[e._v("\n        Source Run："),i("el-link",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.linktomodelrun.apply(null,arguments)}}},[e._v(e._s(e.ModelVersionbaseInfo.run_id))])],1)],1),i("br"),i("el-divider"),i("el-collapse",{model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[i("el-collapse-item",{attrs:{title:"描述",name:"1"}},[i("div",[e._t("default",(function(){return[i("span",{directives:[{name:"show",rawName:"v-show",value:!e.editModelVersionVisible,expression:"!editModelVersionVisible"}]},[e._v(e._s(e.ModelVersionbaseInfo.description||"无"))]),i("el-input",{directives:[{name:"show",rawName:"v-show",value:e.editModelVersionVisible,expression:"editModelVersionVisible"}],staticClass:"modelDescStyle",attrs:{type:"textarea",autosize:{minRows:4,maxRows:6}},model:{value:e.editModelForm.description,callback:function(t){e.$set(e.editModelForm,"description",t)},expression:"editModelForm.description"}}),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.editModelVersionVisible,expression:"!editModelVersionVisible"}],staticClass:"inline",staticStyle:{padding:"0px","margin-right":"10px"},attrs:{icon:"el-icon-edit",type:"text"},on:{click:function(t){return e.handleModelVersionDescEdit("index",{description:"description"})}}}),i("br"),i("span",{directives:[{name:"show",rawName:"v-show",value:e.editModelVersionVisible,expression:"editModelVersionVisible"}]},[i("el-button",{attrs:{type:"text",icon:"el-icon-back"},nativeOn:{click:function(t){e.editModelVersionVisible=!1}}},[e._v("取消")]),i("el-button",{attrs:{type:"text",loading:e.editLoading,icon:"el-icon-check"},nativeOn:{click:function(t){return e.editSubmit.apply(null,arguments)}}},[e._v("保存")])],1)]}),{description:e.description})],2)]),i("el-collapse-item",{attrs:{title:"模型版本信息",name:"2"}},[i("el-tabs",[i("el-tab-pane",{attrs:{label:"版本详情"}},[i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loadworkspace,expression:"loadworkspace"}],staticStyle:{"margin-top":"30px",height:"750px"},attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",align:"center"}},[i("iframe",{ref:"iframeContain",attrs:{id:"iframeContain",name:"iframeContain",scrolling:"auto",title:"Inline Frame Example",width:"98%",height:"700",srcdoc:e.file_content}})])]),i("el-tab-pane",{attrs:{label:"模型工件管理"}},[[i("el-card",{staticClass:"box-card",staticStyle:{height:"90%"}},[i("el-container",[i("el-header",{staticStyle:{"text-align":"right","font-size":"12px"}},[i("el-button",{style:e.back_display,attrs:{size:"small"},on:{click:e._back}},[i("i",{staticClass:"el-icon-d-arrow-left",staticStyle:{"margin-left":"5px"}}),e._v("返回\n                ")])],1),i("span",[e._v("lsldlsflfslfllsf")]),i("el-main",[i("el-row",{staticClass:"dynamic-manage"},[i("el-col",{attrs:{span:24}},[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.model_files,stripe:"","cell-style":{"text-align":"left"}}},[i("el-table-column",{attrs:{type:"index",label:"#","min-width":"10%"}}),i("el-table-column",{attrs:{prop:"name",label:"文件名称","min-width":"18%"},scopedSlots:e._u([{key:"default",fn:function(t){return[!0===t.row.is_dir?i("el-button",{attrs:{icon:"fa fa-folder-o",type:"text",size:"big"},on:{click:function(i){return e.handleFileDir(t.$index,t.row)}}},[e._v(" "+e._s(t.row.name)+"/\n                                ")]):e._e(),!1===t.row.is_dir?i("el-button",{attrs:{icon:"fa fa-file-o",type:"text",size:"big"},on:{click:function(i){return e.handleFileDir(t.$index,t.row)}}},[e._v("\n                                     "+e._s(t.row.name)+"\n                                ")]):e._e()]}}])}),i("el-table-column",{attrs:{prop:"size",label:"大小","min-width":"10%"}}),i("el-table-column",{attrs:{prop:"last_modified",label:"上次修改时间","min-width":"10%"},scopedSlots:e._u([{key:"default",fn:function(e){return[i("timeago",{attrs:{datetime:e.row.last_modified,locale:"zh-CN"}})]}}])}),i("el-table-column",{staticStyle:{float:"right"},attrs:{prop:"description",label:"","min-width":"10%"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-dropdown",{staticClass:"editGroup",staticStyle:{"margin-right":"1%"},attrs:{trigger:"hover"}},[i("i",{staticClass:"el-icon-more"}),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{nativeOn:{click:function(i){return e.handleDelFileDir(t.row.is_dir,t.row.name)}}},[e._v("删除")]),i("el-dropdown-item",{nativeOn:{click:function(i){return e.handleEditFileName(t.row.is_dir,t.row.name)}}},[e._v("重命名")]),!1===t.row.is_dir?i("el-dropdown-item",[i("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"查看文件",params:{filepath:e.directory,fileToView:t.row.name}}}},[e._v("\n                                            查看\n                                           ")])],1):e._e()],1)],1)]}}])})],1),i("el-pagination",{staticStyle:{float:"right"},attrs:{layout:"prev, pager, next","page-size":20,"page-count":e.total},on:{"current-change":e.handleCurrentChange}})],1)],1)],1)],1)],1)]],2)],1)],1)],1),i("el-dialog",{attrs:{title:"Stage Transition",visible:e.StageTranVisible,width:"30%"},on:{"update:visible":function(t){e.StageTranVisible=t}}},[i("span",[e._v("Transition to     "),i("i",{staticClass:"el-icon-right"}),e._v("    "),i("el-tag",{attrs:{size:"small",type:e.stage_status0}},[e._v("\n            "+e._s(e.status_msg))])],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.StageTranVisible=!1}}},[e._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.StageTranSubmit}},[e._v("确 定")])],1)]),i("el-dialog",{attrs:{title:e.delTitle,width:"30%",visible:e.delFileDirVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.delFileDirVisible=t}}},[i("el-divider"),i("div",{staticStyle:{"font-size":"15px"}},[i("el-row",{staticStyle:{margin:"10px"},attrs:{gutter:20}},[i("span",[e._v(e._s(e.tobeDelFileDir))])])],1),i("el-divider"),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(t){e.delFileDirVisible=!1}}},[e._v("取消")]),i("el-button",{attrs:{type:"primary",loading:e.delFileDirLoading},nativeOn:{click:function(t){return e.delFileDirSubmit.apply(null,arguments)}}},[e._v("提交")])],1)],1),i("el-dialog",{staticStyle:{width:"60%",left:"20%"},attrs:{title:e.rename_tile_type,visible:e.editFileNameFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.editFileNameFormVisible=t}}},[i("el-alert",{staticStyle:{"margin-bottom":"20px"},attrs:{title:"重要提示",type:"warning",closable:"flase",description:"重命名文件将切断与其版本历史的联系--版本历史将与旧文件名一起保存，您将无法比较修订","show-icon":""}}),i("el-form",{ref:"editFileNameForm",attrs:{model:e.editFileNameForm,"label-width":"80px",rules:e.editFileNameFormRules}},[i("el-form-item",{attrs:{label:"新名称",prop:"newName"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.editFileNameForm.newName,callback:function(t){e.$set(e.editFileNameForm,"newName","string"===typeof t?t.trim():t)},expression:"editFileNameForm.newName"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(t){e.editFileNameFormVisible=!1}}},[e._v("取消")]),i("el-button",{attrs:{type:"primary",loading:e.editFileNameLoading},nativeOn:{click:function(t){return e.editFileNameSubmit.apply(null,arguments)}}},[e._v("提交")])],1)],1)],1)},s=[],o=(i("c5f6"),i("7f7f"),i("4ec3")),n=i("1157"),r=i.n(n),l={data:function(){return{toolbar:"toolbar",cur_path:"",editFileNameLoading:!1,editFileNameFormVisible:!1,editFileNameFormRules:{newName:[{required:!0,message:"请输入名称",trigger:"blur"}]},editFileNameForm:{newName:""},rename_tile_type:"",model_files:[],file_content:"",loadworkspace:!1,status_msg:"",StageTranVisible:!1,to_be_stage2:"None",to_be_stage3:"None",to_be_stage4:"None",stage_status1:"info",stage_status2:"info",stage_status3:"info",stage_status4:"info",selsVersionCompare:[],versionList:[],stageStatus:"All",editLoading:!1,ModelVersionbaseInfo:{},editModelVersionVisible:!1,activeNames:["1"],sels:[],total:0,page:1,listLoading:!1,editModelForm:{description:""}}},created:function(){},filters:{formatDate:function(e){var t=new Date(e),i=t.getFullYear(),a=t.getMonth()+1;a=a<10?"0"+a:a;var s=t.getDate();s=s<10?"0"+s:s;var o=t.getHours();o=o<10?"0"+o:o;var n=t.getMinutes();n=n<10?"0"+n:n;var r=t.getSeconds();return r=r<10?"0"+r:r,i+"-"+a+"-"+s+" "+o+":"+n+":"+r}},methods:{_back:function(){this.cur_path=this.back,this.getFileDir()},handleFileDir:function(e,t){var i=this;t.is_dir?(this.cur_path=t.rel_path,console.log(this.cur_path,"this.path"),i.getFileDir()):this.$router.push({name:"查看文件",params:{model_name:this.$route.params.model_name,version_id:this.$route.params.version_id,filepath:this.directory,fileToView:t.name}}),console.log(this.cur_path,this.back_display,"this.path")},editFileNameSubmit:function(){var e=this;this.$refs.editFileNameForm.validate((function(t){if(t){var i=e;e.$confirm("确认提交吗？","提示",{}).then((function(){i.editFileNameLoading=!0,r.a.ajax({type:"post",url:o["v"]+"/api/modelfile/rename_file_dir_name",async:!0,data:JSON.stringify({name:e.editFileNameForm.newName,old_name:e.oldName,path:e.directory}),headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(e){i.editFileNameLoading=!1,"999999"===e.code?(i.editFileNameFormVisible=!1,i.$message({message:"修改成功",center:!0,type:"success"}),i.getFileDir()):(i.editFileNameFormVisible=!1,i.$message.error({message:e.msg,center:!0}))}})}))}}))},handleEditFileName:function(e,t){this.rename_tile_type=e?"重命名目录:"+t:"重命名文件:"+t,this.oldName=t,this.editFileNameFormVisible=!0,this.editFileNameForm.newName=t},handleDelFileDir:function(e,t){this.delFileDirVisible=!0,this.delName=t,e?(this.tobeDelFileDirType="dir",this.delTitle="删除目录",this.tobeDelFileDir="您确定要删除目录："+t+"？"):(this.tobeDelFileDirType="file",this.delTitle="删除文件",this.tobeDelFileDir="您确定要删除文件："+t+"？")},getFileDir:function(){this.listLoading=!0;var e=this;r.a.ajax({type:"get",url:o["v"]+"/api/models/get_model_files",async:!0,data:{page:Number(e.page),model_name:this.$route.params.model_name,version_id:this.$route.params.version_id,path:this.cur_path},headers:{Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(t){e.listLoading=!1,"999999"===t.code?(e.total=t.data.total,e.is_subdirectory=t.data.is_subdirectory,e.directory=t.data.directory,e.back=t.data.back,e._code=t.data.code,e.model_files=t.data.files,e.pathParam={pathParam:e.directory},e.is_subdirectory?(e.back_display="float:right",e.toolbar="toolbar"):(e.back_display="display:none",e.toolbar=""),console.log(t,"dataffffff")):e.$message.error({message:"data.msg",center:!0})}})},getJupyterNotebook:function(){var e=this,t=this;this.loadworkspace=!0;var i=JSON.stringify({model_name:this.$route.params.model_name,version_id:this.$route.params.version_id});r.a.ajax({type:"post",url:o["v"]+"/api/models/get_models_markdown",async:!0,data:i,headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(i){"999999"===i.code?t.file_content=i.data:t.file_content=i,e.loadworkspace=!1,console.log(t.file_content,"file_content")}})},StageTranSubmit:function(){var e=this,t=this,i=JSON.stringify({model_name:this.$route.params.model_name,version_id:this.$route.params.version_id,stage:this.status_msg,user_key:JSON.parse(sessionStorage.getItem("name"))});console.log(i,"dsdds"),r.a.ajax({type:"post",url:o["v"]+"/api/models/model_stage_transform",async:!0,data:i,headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(i){t._getModelVersionBaseinfo(),e.StageTranVisible=!1}})},handleModelStage:function(e){this.StageTranVisible=!0,this.status_msg="a"===e?this.to_be_stage2:"b"===e?this.to_be_stage3:this.to_be_stage4,"Production"===this.status_msg?this.stage_status0="success":"Staging"===this.status_msg?this.stage_status0="warning":this.stage_status0="info"},linktomodelrun:function(){var e=this;this.listLoading=!0;var t=this,i={run_id:this.ModelVersionbaseInfo.run_id,user_key:JSON.parse(sessionStorage.getItem("name"))},a={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(o["o"])(a,i).then((function(i){var a=i.msg,s=i.code,o=i.data;t.listLoading=!1,"999999"===s?(t.experiment_id=o.info.experiment_id,t.run_id=o.info.run_id,e.$router.push({name:"模型实验详情",params:{experiment_id:t.experiment_id,run_id:t.run_id}})):t.$message.error({message:a,center:!0})}))},handleModelVersionDescEdit:function(e,t){this.editModelVersionVisible=!0;var i=this.ModelVersionbaseInfo.description;this.editModelForm=Object.assign({},{description:i})},disabledCheckBox:function(e,t){return!1===e.is_dir},handleModelOps:function(e){console.log(e,"command"),this.$router.push({name:"模型即服务",params:{project_id:this.$route.params.project_id,task_id:this.$route.params.task_id,model_id:e}}),this.$message("click on item "+e)},_getModelVersionBaseinfo:function(){this.listLoading=!0;var e=this,t={name:this.$route.params.model_name,version:this.$route.params.version_id,user_key:JSON.parse(sessionStorage.getItem("name"))},i={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(o["q"])(i,t).then((function(t){var i=t.msg,a=t.code,s=t.data;e.listLoading=!1,"999999"===a?(e.ModelVersionbaseInfo=s,"Production"===e.ModelVersionbaseInfo.current_stage?(e.stage_status1="success",e.to_be_stage2="Staging",e.stage_status2="warning",e.to_be_stage3="None",e.stage_status3="info",e.to_be_stage4="Archived",e.stage_status4="info"):"Staging"===e.ModelVersionbaseInfo.current_stage?(e.stage_status1="warning",e.to_be_stage2="Production",e.stage_status2="success",e.to_be_stage3="None",e.stage_status3="info",e.to_be_stage4="Archived",e.stage_status4="info"):"Archived"===e.ModelVersionbaseInfo.current_stage?(e.stage_status1="info",e.to_be_stage2="Production",e.stage_status2="success",e.to_be_stage3="None",e.stage_status3="info",e.to_be_stage4="Staging",e.stage_status4="warning"):(e.stage_status1="info",e.to_be_stage2="Production",e.stage_status2="success",e.to_be_stage3="Archived",e.stage_status3="info",e.to_be_stage4="Staging",e.stage_status4="warning"),console.log(e.ModelVersionbaseInfo,"ModelbaseInfo")):e.$message.error({message:i,center:!0})}))},editSubmit:function(){var e=this;this.editLoading=!0;var t=JSON.stringify({model_name:this.$route.params.model_name,version:this.$route.params.version_id,description:this.editModelForm.description,user_key:JSON.parse(sessionStorage.getItem("name"))});console.log(t,"dsdds"),r.a.ajax({type:"POST",url:o["v"]+"/api/models/edit_model_version_description",async:!0,data:t,headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(t){e.editLoading=!1,e.editModelVersionVisible=!1,e._getModelVersionBaseinfo()}})},handleDel:function(e,t){var i=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then((function(){i.listLoading=!0;var e=i,a={project_id:Number(i.$route.params.project_id),table_name:t.tableName,ids:[t.id]},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};console.log(a,"paramsparamsparamslplp"),delSampleTable(s,a).then((function(t){var i=t.msg,a=t.code;"999999"===a?e.$message({message:"删除成功",center:!0,type:"success"}):e.$message.error({message:i,center:!0}),e.getSampleList()}))}))},handleCurrentChange:function(e){this.page=e,this.getFileDir()},selsChangeVersionTracking:function(e){this.selsVersionCompare=e}},mounted:function(){this._getModelVersionBaseinfo(),this.getJupyterNotebook(),this.getFileDir()}},d=l,c=(i("3d5f"),i("2877")),m=Object(c["a"])(d,a,s,!1,null,"c2a2fe6e",null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-1a4a082a.ca2c46ad.js.map