import{g as T,a as U,k as R,s as b,c as p,_ as u,b as B,r as d,u as A,d as E,j as r,e as H,f as I,h as z,A as P,B as K,l as L,i as V,Q as w,m as N}from"./index-6aff812a.js";import{u as F}from"./useDispatch-b40a93b1.js";function W(e){return T("MuiCircularProgress",e)}U("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const Y=["className","color","disableShrink","size","style","thickness","value","variant"];let f=e=>e,$,_,D,M;const o=44,q=R($||($=f`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),G=R(_||(_=f`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),Q=e=>{const{classes:s,variant:t,color:n,disableShrink:c}=e,h={root:["root",t,`color${p(n)}`],svg:["svg"],circle:["circle",`circle${p(t)}`,c&&"circleDisableShrink"]};return I(h,W,s)},Z=b("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,s)=>{const{ownerState:t}=e;return[s.root,s[t.variant],s[`color${p(t.color)}`]]}})(({ownerState:e,theme:s})=>u({display:"inline-block"},e.variant==="determinate"&&{transition:s.transitions.create("transform")},e.color!=="inherit"&&{color:(s.vars||s).palette[e.color].main}),({ownerState:e})=>e.variant==="indeterminate"&&B(D||(D=f`
      animation: ${0} 1.4s linear infinite;
    `),q)),J=b("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,s)=>s.svg})({display:"block"}),X=b("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,s)=>{const{ownerState:t}=e;return[s.circle,s[`circle${p(t.variant)}`],t.disableShrink&&s.circleDisableShrink]}})(({ownerState:e,theme:s})=>u({stroke:"currentColor"},e.variant==="determinate"&&{transition:s.transitions.create("stroke-dashoffset")},e.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink&&B(M||(M=f`
      animation: ${0} 1.4s ease-in-out infinite;
    `),G)),ee=d.forwardRef(function(s,t){const n=A({props:s,name:"MuiCircularProgress"}),{className:c,color:h="primary",disableShrink:x=!1,size:l=40,style:k,thickness:a=3.6,value:i=0,variant:g="indeterminate"}=n,O=E(n,Y),m=u({},n,{color:h,disableShrink:x,size:l,thickness:a,value:i,variant:g}),v=Q(m),y={},C={},j={};if(g==="determinate"){const S=2*Math.PI*((o-a)/2);y.strokeDasharray=S.toFixed(3),j["aria-valuenow"]=Math.round(i),y.strokeDashoffset=`${((100-i)/100*S).toFixed(3)}px`,C.transform="rotate(-90deg)"}return r.jsx(Z,u({className:H(v.root,c),style:u({width:l,height:l},C,k),ownerState:m,ref:t,role:"progressbar"},j,O,{children:r.jsx(J,{className:v.svg,ownerState:m,viewBox:`${o/2} ${o/2} ${o} ${o}`,children:r.jsx(X,{className:v.circle,style:y,ownerState:m,cx:o,cy:o,r:(o-a)/2,fill:"none",strokeWidth:a})})}))}),se=ee;function ae(){const[e,s]=d.useState(""),[t,n]=d.useState(""),[c,h]=d.useState(!1),x=z(),l=F();d.useEffect(()=>{P.init(),P.refresh()},[]);const k=async()=>{const a=L({tentaikhoan:e,matkhau:t});try{const i=await l(a),g=V(i);w.success("Đăng nhập thành công",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"}),N.remove("refreshToken_khaosathailong"),N.set("refreshToken_khaosathailong",g.refreshToken,{expires:7,secure:!0}),x("/dashboard/thong-ke")}catch(i){w.error(i.message,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}};return r.jsx("div",{className:"flex items-center min-h-screen justify-center bg-blue-500",children:r.jsxs("form",{className:"p-8 shadow-xl  rounded-lg  border border-white bg-white","data-aos":"fade-right",children:[r.jsx("div",{className:"flex items-center justify-center space-x-2 mb-2",children:r.jsx("img",{src:"/conganhieu.png",alt:"logo",className:"w-[100px]"})}),r.jsxs("h3",{className:"font-bold text-center text-black",style:{textShadow:"2px 2px 1px #fff"},children:["Khảo sát sự hài lòng của công dân khi thực hiện ",r.jsx("br",{})," dịch vụ công trực tuyến tại Công an tỉnh Hưng Yên"]}),r.jsx("hr",{}),r.jsx("div",{className:"flex flex-col my-2 mt-8",children:r.jsx("input",{defaultValue:e,type:"text",placeholder:"Tài khoản...",className:`w-full outline-none my-2 p-2 rounded-md \r
                     bg-slate-500 text-black`,onChange:a=>s(a.target.value)})}),r.jsx("div",{className:"flex flex-col my-2 mb-4",children:r.jsx("input",{defaultValue:t,type:"password",placeholder:"Mật khẩu...",className:`w-full outline-none my-2 p-2 rounded-md\r
                   bg-slate-500 text-black`,onChange:a=>n(a.target.value)})}),c&&r.jsx("div",{className:"text-center",children:r.jsx(se,{})}),r.jsx(K,{variant:"contained",className:"w-full",color:"primary",onClick:k,disabled:c,children:"Đăng nhập"}),r.jsx("p",{className:"text-sm text-center underline mt-4 underline-offset-4 text-black",children:"Bản quyền thuộc về Đội Công nghệ thông tin - Công an tỉnh Hưng Yên"})]})})}export{ae as default};
