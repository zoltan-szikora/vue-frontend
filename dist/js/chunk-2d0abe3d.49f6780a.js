(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0abe3d"],{"16ce":function(e,t,s){"use strict";s.r(t);var r=s("7a23"),a={key:0},o={class:"container my-3 pb-5 content"},i={class:"pt-3"},c={class:"display-5 fw-bold"},n=Object(r["f"])("Delete Your Profile"),d=Object(r["g"])("hr",{class:"my-4"},null,-1),l={class:"px-4"},u={key:0,class:"alert alert-success rounded-0"},b={key:1,class:"alert alert-danger rounded-0",role:"alert"},p={key:2},O={key:0,class:"alert alert-info rounded-0"},j={key:1},w=Object(r["g"])("h2",{class:"col-md-8 fs-4"},"Submit a request",-1),f=Object(r["g"])("p",null,[Object(r["g"])("strong",null,"Please Note: "),Object(r["f"])(" If you delete your profile, you won't be able to reactivate it later.")],-1),g={class:"mx-auto border form-bg px-5 py-3"},h={class:"mb-3"},v=Object(r["g"])("label",{for:"password"},"Password",-1),m=Object(r["g"])("span",{class:"invalid-feedback"},"Password is required!",-1),y={key:0,class:"err-msg"};function P(e,t,s,P,k,M){var S=Object(r["w"])("font-awesome-icon");return e.user?(Object(r["p"])(),Object(r["d"])("div",a,[Object(r["g"])("div",o,[Object(r["g"])("div",i,[Object(r["g"])("h1",c,[Object(r["g"])(S,{icon:"trash",class:"me-1"}),n]),d]),Object(r["g"])("div",l,[k.success?(Object(r["p"])(),Object(r["d"])("div",u,"Your request is accepted!")):Object(r["e"])("",!0),k.errorMessage?(Object(r["p"])(),Object(r["d"])("div",b,Object(r["y"])(k.errorMessage),1)):Object(r["e"])("",!0),k.success?Object(r["e"])("",!0):(Object(r["p"])(),Object(r["d"])("div",p,["P"==e.user.status?(Object(r["p"])(),Object(r["d"])("div",O,"You have already sent the request!")):Object(r["e"])("",!0),"A"==e.user.status?(Object(r["p"])(),Object(r["d"])("div",j,[w,f,Object(r["g"])("form",{name:"update",onSubmit:t[3]||(t[3]=Object(r["E"])((function(){return M.submitUpdateStatus&&M.submitUpdateStatus.apply(M,arguments)}),["prevent"])),class:"row g-3","accept-charset":"utf-8"},[Object(r["g"])("div",g,[Object(r["g"])("div",h,[v,Object(r["D"])(Object(r["g"])("input",{type:"password",class:["form-control",{invalid:"invalid"===k.passwordValidity}],name:"password","onUpdate:modelValue":t[1]||(t[1]=function(e){return k.currentPassword=e}),placeholder:"Password",id:"password",required:""},null,2),[[r["A"],k.currentPassword,void 0,{trim:!0}]]),m,"invalid"==k.passwordValidity?(Object(r["p"])(),Object(r["d"])("span",y,"Your password is invalid!")):Object(r["e"])("",!0)]),Object(r["g"])("button",{type:"button",class:"btn btn-danger rounded-0",onClick:t[2]||(t[2]=function(){return M.handleProfileDelete&&M.handleProfileDelete.apply(M,arguments)})},"Delete Profile")])],32)])):Object(r["e"])("",!0)]))])])])):Object(r["e"])("",!0)}var k=s("5530"),M=s("5502"),S=s("1f57"),U=s("279c"),V=s.n(U),q={data:function(){return{loading:!1,success:!1,errorMessage:"",passwordValidity:"pending",currentPassword:""}},computed:Object(k["a"])({},M["b"].mapGetters(["user"])),methods:Object(k["a"])(Object(k["a"])({},M["b"].mapActions(["updateUser"])),{},{handleProfileDelete:function(){var e=this;this.$swal({title:"Are you sure?",text:"Are you really want to delete your profile?",icon:"question",showCancelButton:!0,confirmButtonColor:"#dc3545",cancelButtonColor:"#20c997",confirmButtonText:"Yes, delete it!"}).then((function(t){t.isConfirmed&&e.submitUpdateStatus()}))},submitUpdateStatus:function(){var e=this;return this.loading=!0,this.currentPassword?this.currentPassword==this.user.password||V.a.compareSync(this.currentPassword,this.user.password)?(this.passwordValidity="valid",void S["a"].updateStatus(this.user,this.currentPassword,"P").then((function(t){var s=t.data;e.updateUser(s),e.success=!0,e.errorMessage="",e.$swal({icon:"success",title:"Ok!",showConfirmButton:!1,timer:1500})}),(function(t){t.response?401===t.response.status?e.errorMessage="Password is not valid!":e.errorMessage="Error: "+t.response.data.errors[0].defaultMessage:e.errorMessage="Unexpected error: "+(t&&t.errorMessage||t)})).then((function(){e.loading=!1}))):(this.passwordValidity="invalid",this.loading=!1,void this.$swal({icon:"error",title:"Your password is invalid!"})):(this.passwordValidity="invalid",this.loading=!1,void this.$swal({icon:"info",title:"Password fied is empty!"}))}})};q.render=P;t["default"]=q}}]);
//# sourceMappingURL=chunk-2d0abe3d.49f6780a.js.map