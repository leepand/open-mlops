(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7b0f3fd0"],{"1a40":function(t,e,i){"use strict";i("595b")},"280e":function(t,e,i){"use strict";i("585d")},"585d":function(t,e,i){},"595b":function(t,e,i){},f415:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",[i("el-divider"),i("router-link",{staticStyle:{"text-decoration":"none",color:"aliceblue"},attrs:{to:{name:"模型版本详情",params:{model_name:this.$route.params.model_name,version_id:this.$route.params.version_id}}}},[i("el-button",{staticClass:"return-list"},[i("i",{staticClass:"el-icon-d-arrow-left",staticStyle:{"margin-right":"5px"}}),t._v("模型版本详情")])],1),i("router-link",{staticStyle:{"text-decoration":"none",color:"aliceblue"},attrs:{to:{name:"模型版本详情",params:{model_name:this.$route.params.model_name,version_id:this.$route.params.version_id}}}},[i("el-button",{staticClass:"return-list",staticStyle:{float:"right"}},[t._v("取消")])],1),i("br"),i("br"),[i("el-card",{staticClass:"box-card"},[i("textarea",{staticStyle:{width:"1650px",height:"740px",display:"none"},attrs:{id:"div1",readonly:""}}),i("pre",{staticClass:"code"},[t._v(t._s(t.file_content))]),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.file_content,expression:"!file_content"}],staticClass:"raw"},[t._v("暂无数据！")])])]],2)},o=[],a=i("4ec3"),s=i("1157"),r=i.n(s),l={data:function(){return{file_content:"",listLoading:!1}},methods:{getFileContent:function(){var t=this,e=JSON.stringify({model_name:this.$route.params.model_name,filepath:this.$route.params.filepath,fileToView:this.$route.params.fileToView,version_id:this.$route.params.version_id});console.log(e,"dsdds"),r.a.ajax({type:"POST",url:a["v"]+"/api/models/cat_file_contents",async:!0,data:e,headers:{"Content-Type":"application/json",Authorization:"Token "+JSON.parse(sessionStorage.getItem("token"))},timeout:5e3,success:function(e){document.getElementById("div1").innerHTML="读取中...",t.file_content=e}})}},mounted:function(){this.getFileContent(),document.getElementById("div1").innerHTML="读取中...",r()(document).ready((function(){r()("#div1").html(this.file_content)})),console.log(this.$route.params,this.file_content,"dldldl")}},c=l,d=(i("1a40"),i("280e"),i("2877")),u=Object(d["a"])(c,n,o,!1,null,"64de27c0",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-7b0f3fd0.5d964067.js.map