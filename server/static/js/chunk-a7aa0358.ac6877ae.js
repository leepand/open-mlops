(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a7aa0358"],{"17d1":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{margin:"30px"}},[i("el-divider"),i("el-descriptions",{staticClass:"margin-top",attrs:{title:"A/B在线实验",column:3,size:e.size}},[i("template",{slot:"extra"},[i("router-link",{staticStyle:{"text-decoration":"none",color:"aliceblue"},attrs:{to:{name:"营销集市",params:{campaign_id:this.$route.params.campaign_id}},align:"right"}},[i("el-button",{},[i("i",{staticClass:"el-icon-arrow-left",staticStyle:{"margin-right":"10px"}}),e._v("返回营销集市")])],1)],1),i("el-descriptions-item",{attrs:{label:"实验所属活动"}},[e._v(e._s(e.CampaignMetaData.campaign.name))]),i("el-descriptions-item",{attrs:{label:"创建人"}},[e._v(e._s(e.CampaignMetaData.campaign.author))]),i("el-descriptions-item",{attrs:{label:"创建时间"}},[i("timeago",{attrs:{datetime:e.CampaignMetaData.campaign.creation_date,locale:"zh-CN"}})],1),i("el-descriptions-item",{attrs:{label:"已创建的实验数"}},[e._v("\n            "+e._s(e.CampaignMetaData.strategy_cnt)+"\n        ")]),i("el-descriptions-item",{attrs:{label:"是否公开"}},[i("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}})],1),i("el-descriptions-item",{attrs:{label:"活动来源"}},[i("el-tag",{attrs:{size:"small",type:"warning"}},[e._v("我的活动")])],1)],2),i("el-collapse",{model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[i("el-collapse-item",{attrs:{title:"活动描述",name:"1"}},[i("div",[e._t("default",(function(){return[i("span",{directives:[{name:"show",rawName:"v-show",value:!e.editModelTaskVisible,expression:"!editModelTaskVisible"}]},[e._v(e._s(e.CampaignMetaData.campaign.description))]),i("el-input",{directives:[{name:"show",rawName:"v-show",value:e.editModelTaskVisible,expression:"editModelTaskVisible"}],staticClass:"modelDescStyle",attrs:{type:"textarea",autosize:{minRows:4,maxRows:6}},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.editModelTaskVisible,expression:"!editModelTaskVisible"}],staticClass:"inline",staticStyle:{padding:"0px","margin-right":"10px"},attrs:{icon:"el-icon-edit",type:"text"},on:{click:function(t){return e.handleTaskInfoEdit("index",{description:"description"})}}}),i("br"),i("span",{directives:[{name:"show",rawName:"v-show",value:e.editModelTaskVisible,expression:"editModelTaskVisible"}]},[i("el-button",{attrs:{type:"text",icon:"el-icon-back"},nativeOn:{click:function(t){e.editModelTaskVisible=!1}}},[e._v("取消")]),i("el-button",{attrs:{type:"text",loading:e.editLoading,icon:"el-icon-check"},nativeOn:{click:function(t){return e.editSubmit.apply(null,arguments)}}},[e._v("保存")])],1)]}),{description:e.description})],2)]),i("el-collapse-item",{attrs:{title:"实验列表",name:"2"}},[i("el-col",{staticClass:"toolbar",staticStyle:{"padding-bottom":"10px"},attrs:{span:24}},[i("el-form",{attrs:{inline:!0,model:e.filters},nativeOn:{submit:function(e){e.preventDefault()}}},[i("el-form-item",[i("el-input",{attrs:{placeholder:"名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getModelTaskList.apply(null,arguments)}},model:{value:e.filters.name,callback:function(t){e.$set(e.filters,"name","string"===typeof t?t.trim():t)},expression:"filters.name"}})],1),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:e.getModelTaskList}},[e._v("查询")])],1),i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("A/B实验")])],1)],1)],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.abexpList,"highlight-current-row":""},on:{"selection-change":e.selsChange}},[i("el-table-column",{attrs:{type:"selection","min-width":"5%"}}),i("el-table-column",{attrs:{prop:"name",label:"实验名称","min-width":"20%",sortable:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[i("img",{directives:[{name:"show",rawName:"v-show",value:!t.row.status,expression:"!scope.row.status"}],attrs:{src:a("4928")}}),i("img",{directives:[{name:"show",rawName:"v-show",value:t.row.status,expression:"scope.row.status"}],attrs:{src:a("60be")}}),e._v("\n                       \n                      "),i("el-icon",{attrs:{name:"name"}}),i("router-link",{staticStyle:{"text-decoration":"none"},attrs:{to:{name:"实验组信息",params:{ab_id:t.row.id,campaign_id:e.CampaignMetaData.campaign.id}}}},[e._v(e._s(t.row.name)+"\n                      ")])]}}])}),i("el-table-column",{attrs:{prop:"id",label:"实验编号","min-width":"15%",sortable:"","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{prop:"abalt_cnt",label:"实验组数","min-width":"15%",sortable:""}}),i("el-table-column",{attrs:{prop:"creation_date",formatter:e.formatTime,label:"创建时间","min-width":"15%",sortable:"","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(e){return[i("timeago",{attrs:{datetime:e.row.creation_date,locale:"zh-CN"}})]}}])}),i("el-table-column",{attrs:{prop:"abalt_cnt",label:"曝光数","min-width":"15%",sortable:"","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{prop:"description",label:"实验描述","min-width":"30%",sortable:"","show-overflow-tooltip":""}}),i("el-table-column",{attrs:{label:"操作","min-width":"25%"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.abalt_cnt?i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(a){return e.addAltList(t.$index,t.row)}}},[e._v("+ 实验组")]):e._e(),t.row.abalt_cnt>0?i("el-button",{attrs:{size:"small",type:"info"},on:{click:function(a){return e.addAltList(t.$index,t.row)}}},[e._v("+ 实验组")]):e._e(),i("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){return e.handleJupyter(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),i("el-col",{staticClass:"toolbar",attrs:{span:24}},[i("el-button",{attrs:{type:"danger",disabled:0===this.sels.length},on:{click:e.batchRemove}},[e._v("删除实验")]),i("el-pagination",{staticStyle:{float:"right"},attrs:{background:"",layout:"prev, pager, next","page-size":20,"page-count":e.total},on:{"current-change":e.handleCurrentChange}})],1)],1)],1),i("el-dialog",{staticStyle:{width:"60%",left:"20%"},attrs:{title:"选择环境",visible:e.regFormVisible,"close-on-click-modal":!1,inline:"true"},on:{"update:visible":function(t){e.regFormVisible=t}}},[i("el-form",{ref:"regForm",attrs:{model:e.regForm,rules:e.regFormRules,"label-width":"80px"}},[i("el-form-item",{attrs:{label:"环境名称",prop:"workspace_id"}},[i("el-select",{staticStyle:{width:"90%"},attrs:{filterable:"",remote:"","remote-method":e.selectWorkspaces,loading:e.getJupterByTaskidLoading,placeholder:"请选择环境"},model:{value:e.regForm.workspace_id,callback:function(t){e.$set(e.regForm,"workspace_id",t)},expression:"regForm.workspace_id"}},e._l(e.workspaces,(function(e){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(t){e.regFormVisible=!1}}},[e._v("取消")]),i("el-button",{attrs:{type:"primary",loading:e.regLoading},nativeOn:{click:function(t){return e.linkworkspaceSubmit.apply(null,arguments)}}},[e._v("提交")])],1)],1),i("el-dialog",{staticStyle:{width:"60%",left:"20%"},attrs:{title:"创建新实验",inline:"true",visible:e.addFormVisible,"close-on-click-modal":!1},on:{"update:visible":function(t){e.addFormVisible=t}}},[i("el-form",{ref:"addForm",attrs:{model:e.addForm,"label-width":"80px",rules:e.addFormRules}},[i("el-form-item",{attrs:{label:"实验名称",prop:"name"}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.addForm.name,callback:function(t){e.$set(e.addForm,"name","string"===typeof t?t.trim():t)},expression:"addForm.name"}})],1),i("el-form-item",{attrs:{label:"实验描述",prop:"description"}},[i("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.addForm.description,callback:function(t){e.$set(e.addForm,"description",t)},expression:"addForm.description"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{nativeOn:{click:function(t){e.addFormVisible=!1}}},[e._v("取消")]),i("el-button",{attrs:{type:"primary",loading:e.addLoading},nativeOn:{click:function(t){return e.addSubmit.apply(null,arguments)}}},[e._v("提交")])],1)],1)],1)},s=[],o=(a("c5f6"),a("7f7f"),a("4ec3")),n=a("c1df"),r=a.n(n),l=a("1157"),c=a.n(l),d={data:function(){return{value22:[],is_public:!0,value1:!0,CampaignMetaData:{},linked_msg:"",task_id:0,workspace_id:1,getJupterByTaskidLoading:!1,filters:{name:""},active:0,size:"medium",getCreatedTasksLoading:!1,CreatedTasks:[],workspaces:[],workspaceList:[],activeNames:["2"],description:"策略库存储策略类别，具体的策略在子策略页面配置",abexpList:[],sche_index:3,total:0,page:1,listLoading:!1,sels:[],editModelTaskVisible:!1,regFormVisible:!1,regLoading:!1,regFormRules:{workspace_id:[{required:!0,message:"请选择环境",trigger:"blur"}]},regForm:{model_id:"",model_name:"",description:""},editModelForm:{description:""},addFormVisible:!1,addLoading:!1,addFormRules:{strategys:[{required:!0,message:"请输入策略名称",trigger:"blur"},{min:1,max:50,message:"长度在 1 到 50 个字符",trigger:"blur"}],description:[{required:!1,message:"请输入策略描述",trigger:"blur"},{max:1024,message:"不能超过1024个字符",trigger:"blur"}]},addForm:{name:"",strategys:[],description:""}}},created:function(){},methods:{handleAdd:function(){this.addFormVisible=!0},next:function(){this.active++>3&&(this.active=0)},getCampaignMetaData:function(){var e=this;c.a.ajax({type:"get",url:o["s"]+"/api/campaigns/get_campaign_metadata",async:!0,data:{campaign_id:this.$route.params.campaign_id},headers:{Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(t){"999999"===t.code?(e.CampaignMetaData=t.data.data,console.log(e.CampaignMetaData,"self.CampaignMetaData")):e.$message.error({message:t.msg,center:!0})}})},getJupterByTaskid:function(e){var t=this;c.a.ajax({type:"get",url:o["s"]+"/api/workspaces/get_workspace_list",async:!0,data:{project_id:this.$route.params.project_id,user_key:JSON.parse(sessionStorage.getItem("name"))},headers:{Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(e){"999999"===e.code?(t.workspaceList=e.data.data,console.log(t.workspaceList,"self.getJupterByTaskid")):t.$message.error({message:e.msg,center:!0})}})},selectWorkspaces:function(e){var t=this;""!==e?(this.getJupterByTaskidLoading=!0,setTimeout((function(){t.getJupterByTaskidLoading=!1,t.workspaces=t.workspaceList.filter((function(t){return t.name.toLowerCase().indexOf(e.toLowerCase())>-1}))}),200)):this.workspaces=[]},getCreatedModels:function(e){var t=this;this.getCreatedModelsLoading=!0;var a=this,i={project_id:this.$route.params.project_id,task_id:e,user_key:JSON.parse(sessionStorage.getItem("name"))},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(o["getCreatedModels4queryAPI"])(s,i).then((function(e){var i=e.msg,s=e.code,o=e.data;a.getCreatedModelsLoading=!1,"999999"===s?(t.getCreatedModelList=o.map((function(e){return{value:"".concat(e.value),label:"".concat(e.key)}})),t.getCreatedModelList.length<1?t.CreatedTasks=[]:t.CreatedTasks=t.getCreatedModelList):a.$message.error({message:i,center:!0})}))},handleTaskInfoEdit:function(e,t){this.editModelTaskVisible=!0;var a=this.description;this.editModelForm=Object.assign({},{description:a})},formatTime:function(e,t){var a=e[t.property];return"undefined"===typeof a?"":r()(a).format("YYYY-MM-DD HH:mm:ss")},getAbExpList:function(){this.listLoading=!0;var e=this,t={campaign_id:this.$route.params.campaign_id,page:e.page,user_key:JSON.parse(sessionStorage.getItem("name")),name:e.filters.name},a={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(o["h"])(a,t).then((function(t){var a=t.msg,i=t.code,s=t.data;e.listLoading=!1,"999999"===i?(e.total=s.total,e.abexpList=s.data):e.$message.error({message:a,center:!0})}))},handleDel:function(e,t){var a=this;this.$confirm("确认删除该记录吗?","提示",{type:"warning"}).then((function(){a.listLoading=!0;var e=a,i={project_id:Number(a.$route.params.project_id),table_name:t.tableName,ids:[t.id]},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};console.log(i,"paramsparamsparamslplp"),delSampleTable(s,i).then((function(t){var a=t.msg,i=t.code;"999999"===i?e.$message({message:"删除成功",center:!0,type:"success"}):e.$message.error({message:a,center:!0}),e.getSampleList()}))}))},handleCurrentChange:function(e){this.page=e,this.getSampleList()},linkJupyter:function(e,t){this.regFormVisible=!0,this.regForm=Object.assign({},t),this.getJupterByTaskid(t.id),this.task_id=t.id},findWorkspaceByTask:function(e){var t=this;c.a.ajax({type:"get",url:o["s"]+"/api/workspaces/get_workspace_bytask",async:!0,data:{task_id:e,user_key:JSON.parse(sessionStorage.getItem("name"))},headers:{Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3}).then((function(e){"999998"===e.code&&t.$notify({title:"提示",message:"请先连接环境",type:"warning"}),t.workspace_id=e.data.data,t.$router.push({name:"研究空间",params:{workspace_id:t.workspace_id}})}),(function(e){console.log(e)}))},handleJupyter:function(e,t){this.findWorkspaceByTask(t.id),console.log(this.workspace_id,"this.workspace_idthis.workspace_id")},addAltList:function(e,t){console.log(t,"rowrowrow"),t.abalt_cnt>0?this.$notify({title:"提示",message:"实验组已建立",type:"warning"}):this.$router.push({name:"创建实验服务",params:{ab_id:t.id,campaign_id:this.$route.params.campaign_id}})},getModelTaskStatus:function(e){return e},linkworkspaceSubmit:function(){var e=this,t=this;this.loadworkspace=!0;var a=JSON.stringify({project_id:this.$route.params.project_id,task_id:this.task_id,workspace_id:this.regForm.workspace_id,user_key:JSON.parse(sessionStorage.getItem("name"))});console.log(a,"ffffsf"),c.a.ajax({type:"POST",url:o["s"]+"/api/models/link_task_to_workspace",async:!0,data:a,headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(a){t.$refs["regForm"].resetFields(),t.regFormVisible=!1,"999999"===a.code?("1"===a.data.data.linked?e.linked_msg="环境已存在":e.linked_msg="连接成功",console.log(a.data.data.linked,"ddff"),t.$message({message:e.linked_msg,center:!0,type:"success"})):t.$message.error({message:a.msg,center:!0})}})},addSubmit:function(){var e=this;this.$refs.addForm.validate((function(t){if(console.log(t),t){var a=e;e.$confirm("确认创建实验吗？","提示",{}).then((function(){a.addLoading=!0;var t={campaign_id:Number(e.$route.params.campaign_id),name:a.addForm.name,description:a.addForm.description,user_key:JSON.parse(sessionStorage.getItem("name"))};console.log(t,"paramsparamsparamsparamsparamsparams");var i={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(o["c"])(i,t).then((function(e){var t=e.msg,i=e.code;a.addLoading=!1,"999999"===i?(a.$message({message:"实验创建成功",center:!0,type:"success"}),a.$refs["addForm"].resetFields(),a.addFormVisible=!1,a.getAbExpList()):"999997"===i?a.$message.error({message:t,center:!0}):(a.$message.error({message:t,center:!0}),a.$refs["addForm"].resetFields(),a.addFormVisible=!1,a.getAbExpList())}))}))}}))},selsChange:function(e){this.sels=e},batchRemove:function(){var e=this,t=this.sels.map((function(e){return e.id})),a=this;this.$confirm("确认删除选中记录吗？","提示",{type:"warning"}).then((function(){a.listLoading=!0;var i={project_id:Number(e.$route.params.project_id),ids:t},s={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};delHost(s,i).then((function(e){var t=e.msg,i=e.code;a.listLoading=!1,"999999"===i?a.$message({message:"删除成功",center:!0,type:"success"}):a.$message.error({message:t,center:!0}),a.getBaseTaskJob()}))}))},handlePublic:function(){this.is_public=this.value1,console.log("valye",this.is_public)}},watch:{value1:function(){this.handlePublic()}},mounted:function(){this.getCampaignMetaData(),this.getAbExpList()}},m=d,p=(a("db294"),a("2877")),u=Object(p["a"])(m,i,s,!1,null,"ae6c18c6",null);t["default"]=u.exports},4928:function(e,t,a){e.exports=a.p+"img/icon-yes.d2f9f035.svg"},"60be":function(e,t,a){e.exports=a.p+"img/icon-no.439e8214.svg"},"99a4":function(e,t,a){},db294:function(e,t,a){"use strict";a("99a4")}}]);
//# sourceMappingURL=chunk-a7aa0358.ac6877ae.js.map