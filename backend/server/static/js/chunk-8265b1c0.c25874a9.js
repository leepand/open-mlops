(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8265b1c0"],{"26f8":function(e,t,a){"use strict";a("9b8c")},"9b8c":function(e,t,a){},b7b4:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"main-a"},[a("div",{staticStyle:{"margin-top":"20px"},attrs:{align:"right"}},[a("el-radio-group",{attrs:{size:"medium"},model:{value:e.radio2,callback:function(t){e.radio2=t},expression:"radio2"}},[a("el-radio-button",{attrs:{label:"所有"}}),a("el-radio-button",{attrs:{label:"近一个月"}}),a("el-radio-button",{attrs:{label:"近14天"}}),a("el-radio-button",{attrs:{label:"近7天"}}),a("el-radio-button",{attrs:{label:"今天"}})],1)],1),a("el-row",{staticStyle:{"margin-top":"20px"},attrs:{span:24,align:"right"}},[a("el-col",{staticClass:"inline",attrs:{span:8}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"always"}},[a("div",{staticClass:"circle",attrs:{align:"center"}},[a("el-progress",{attrs:{type:"circle",percentage:100}}),a("h3",[e._v("已注册的标签数：50")])],1)])],1),a("el-col",{staticClass:"inline",attrs:{span:7}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"always"}},[a("div",{staticClass:"circle",attrs:{align:"center"}},[a("el-progress",{attrs:{type:"circle",percentage:50}}),a("h3",[e._v("已完成的活动数：30")])],1)])],1),a("el-col",{staticStyle:{"margin-right":"0px","margin-top":"10px"},attrs:{span:8}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"always"}},[a("div",{staticClass:"circle",attrs:{align:"center"}},[a("el-progress",{attrs:{type:"circle",percentage:75}}),a("h3",[e._v("正在进行的活动数：18")])],1)])],1)],1),a("div",{staticStyle:{"margin-top":"40px"}},[a("h2",[e._v("快速启动指南")]),a("el-collapse",{on:{change:e.handleChange},model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[a("el-collapse-item",{attrs:{title:"标签创建",name:"1"}},[a("div",[a("pre",{directives:[{name:"highlightA",rawName:"v-highlightA"}],staticStyle:{"word-break":"break-all",overflow:"auto","overflow-x":"hidden"}},[e._v("                             "),a("code",{staticClass:"python"},[e._v("test")]),e._v("\n                         ")])])]),a("el-collapse-item",{attrs:{title:"营销活动管理",name:"2"}},[a("div",{staticClass:"model-code"},[a("pre",{directives:[{name:"highlightA",rawName:"v-highlightA"}],staticStyle:{"word-break":"break-all",overflow:"auto","overflow-x":"hidden"}},[e._v("                             "),a("code",{staticClass:"python"},[e._v("model = algolink.create_model(lr, X[[0]], model_name='lr-model-1')\n\ntask = alink.get_or_create_task('Model-deploy', 'Model-task')\ntask.push_model(model)")]),e._v("\n                         ")])])]),a("el-collapse-item",{attrs:{title:"标签发布与治理",name:"3"}},[a("span",[a("pre",{directives:[{name:"highlightA",rawName:"v-highlightA"}],staticStyle:{"word-break":"break-all",overflow:"auto","overflow-x":"hidden",margin:"0px"}},[e._v("                             "),a("code",{staticClass:"python"},[e._v("from algolink.ext.flask.server import FlaskServer\nimage = alink.create_image(model, 'lr-model-image', server=FlaskServer(), builder_args={'force_overwrite': True})\ninstance = alink.create_instance(image, 'lr-model-instance', port_mapping={9000: 9011}).run(detach=True)\ninstance.is_running()")]),e._v("\n                         ")])])])],1)],1)],1)},i=[],s=a("4ec3"),l=a("c1df"),o=a.n(l),n={data:function(){return{activeNames:["1"],size:"",radio2:"所有",moment:o.a,abceseCount:1,type:"",version:"",updateDate:"",apiCount:0,statusCount:0,dynamicCount:0,memberCount:0,createDate:""}},methods:{getProjectInfo:function(){var e=this,t={project_id:this.$route.params.project_id},a={"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))};Object(s["getProjectDetail"])(a,t).then((function(t){var a=t.msg,r=t.code,i=t.data;console.log(i.dynamicCount,"_data"),e.listLoading=!1,"999999"===r?(e.type=i.proj_type,e.version=i.version,e.updateDate=i.LastUpdateTime,e.apiCount=i.apiCount,e.dynamicCount=i.dynamicCount,e.memberCount=i.memberCount,e.createDate=i.createTime,e.abceseCount=i.abceseCount):e.$message.error({message:a,center:!0})}))}},mounted:function(){this.getProjectInfo()}},c=n,d=(a("26f8"),a("2877")),m=Object(d["a"])(c,r,i,!1,null,"46f0d6e2",null);t["default"]=m.exports}}]);
//# sourceMappingURL=chunk-8265b1c0.c25874a9.js.map