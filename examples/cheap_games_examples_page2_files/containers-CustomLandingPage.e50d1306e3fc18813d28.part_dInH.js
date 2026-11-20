(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([[9215],{43932(e,s,t){"use strict";t.d(s,{A:()=>d});var a=t(28298),n=t(22722),i=t(78454),r=t(68591),o=t(58895),l=t(6405),c=t(34656);const d=({accessRule:e})=>{const s=(0,i.useLocation)(),t=(0,c.RF)(),d=e?.location?.includes("https://www.eneba.com");if((0,n.useEffect)((()=>{d||"undefined"===typeof window||(window.location.href=`${e?.location??"https://www.eneba.com"}${s.search}`)}),[]),d){const t=e?.location?.replace("https://www.eneba.com","")??"";return(0,a.jsx)(r.A,{to:{pathname:(0,o.Jw)(t,l.Xn),search:s.search},replace:!0,redirect:!0,redirectStatusCode:e?.statusCode})}return t.status=e?.statusCode,t.url=`${e?.location??"https://www.eneba.com"}${s.search}`,null}},28653(e,s,t){"use strict";t.d(s,{A:()=>_});var a=t(28298),n=t(78623),i=t(22722),r=t(45541),o=t.n(r),l=t(48055),c=t(68591),d=t(60935),u=t(58895),m=t(6405),g=t(81390),h=t(65869);const p="zJlxpI",x="l5_Fk_",y="hWhvZw",f="M4piye",j="mCgi8q",v="F2VUft",C="JCz7Ap",A="L1hhEX",w="jrlEk5",b="v_WLW8",k="XJcFB9",N="tm0jOe",L="hAgVmG",S="uokL4F",P=({question:e,answer:s,variant:t="default"})=>{const[n,r]=(0,i.useState)(!1),{currentLocale:x}=(0,h.Ym)(),P=o()(y,{[f]:n,[v]:"snakzy"===t,[C]:"packs"===t,[A]:"skins"===t}),$={replace(e){const s=e;if("a"!==s.name||!s.attribs?.href)return e;const{href:t}=s.attribs,n=t?.startsWith("https://www.eneba.com");if(!n)return e;const i=t.split("https://www.eneba.com")[1];if(i&&(0,g.FQ)(i))return s.attribs.href=(0,g.Oe)(i,x),e;const r=i&&(0,u.Jw)(i,m.Xn);return r?(0,a.jsx)(c.A,{to:r,children:s.childNodes.map((e=>e instanceof l.EY?e.data:null))}):e}};return(0,a.jsxs)("li",{className:P,children:[(0,a.jsxs)("button",{type:"button",className:o()(w,{[b]:"snakzy"===t,[k]:"skins"===t}),onClick:()=>{r(!n)},children:[(0,a.jsx)("h3",{className:N,children:e}),(0,a.jsx)(d.A,{className:j,width:"16px"})]}),(0,a.jsx)("div",{className:o()(p,{[L]:"snakzy"===t,[S]:"skins"===t,[f]:n}),children:s&&"string"===typeof s?(0,l.Ay)(s,$):s})]})},$=e=>e?e.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim():"",_=({variant:e="default",withSchema:s,questions:t})=>{let i=null;if(s){const e=(t||[]).map((e=>{const s=$(e.q),t=$(e.a);return s&&t?{"@type":"Question",name:s,acceptedAnswer:{"@type":"Answer",text:t}}:null})).filter(Boolean);e.length>0&&(i=(0,a.jsx)(n.mg,{children:(0,a.jsx)("script",{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:e})})}))}return(0,a.jsxs)(a.Fragment,{children:[i,(0,a.jsx)("ul",{className:x,children:t?.map(((s,t)=>(0,a.jsx)(P,{question:s.q,answer:s.a,variant:e},t)))})]})}},44444(e,s,t){"use strict";t.d(s,{A:()=>S});var a=t(28298),n=t(22722),i=t(68377),r=t(1919),o=t.n(r),l=t(69951),c=t.n(l),d=t(91941),u=t(32757),m=t(44731),g=t(65869),h=t(45541),p=t.n(h);const x="lWrLdt",y="v65trF",f="Goe8T9",j="Dl61jH",v="j8kMxU",C="gCMWus",A="Jd3RU1",w="GWiHJw",b="oikuIr",k="fInhBY",N=({nextSlide:e,slideCount:s,currentSlide:t})=>{const n=p()(w,{[k]:s-1===t});return(0,a.jsx)("button",{type:"button",onClick:e,className:n})},L=({previousSlide:e,currentSlide:s})=>{const t=p()(w,b,{[k]:0===s});return(0,a.jsx)("button",{type:"button",onClick:e,className:t})},S=({initial:e,onClose:s,gallery:t,isOpen:r,single:l=!1})=>{"undefined"!==typeof window&&c().setAppElement("#app");const{isRtl:h}=(0,g.Ym)(),p=h?[...t].reverse():t,[w,b]=(0,n.useState)(h?p.length-1:0),k=(0,n.useRef)({x:0,y:0}),S=(0,n.useRef)(null),P=e=>{k.current={x:e.pageX,y:e.pageY}},$=e=>{const t=k.current.x,a=e.pageX,n=k.current.y,i=e.pageY,r=Math.sqrt((t-a)**2+(n-i)**2);"button"!==e.target.nodeName.toLowerCase()&&"img"!==e.target.nodeName.toLowerCase()&&r<10&&(k.current={x:e.pageX,y:e.pageY},s())},_=()=>{window.removeEventListener("mousedown",P,!1),window.removeEventListener("touchstart",P,!1),window.removeEventListener("mouseup",$,!1),window.removeEventListener("touchend",$,!1)};(0,n.useEffect)((()=>{let s;return r?(s=window.setTimeout((()=>{S.current?.focus()}),100),window.addEventListener("mousedown",P,!1),window.addEventListener("touchstart",P,{passive:!0}),window.addEventListener("mouseup",$,!1),window.addEventListener("touchend",$,!1),b(h?p.length-1-e:e)):_(),()=>{_(),window.clearTimeout(s)}}),[r]);if(!r)return null;const E={withoutControls:l,renderCenterLeftControls:L,renderCenterRightControls:N,enableKeyboardControls:!l,autoplay:!1,dragging:!l,beforeSlide:(e,s)=>{b(s)},renderBottomCenterControls:null,slideIndex:w,dragThreshold:.1};return(0,a.jsxs)(c(),{isOpen:r,onRequestClose:s,className:y,overlayClassName:x,children:[(0,a.jsx)("div",{className:f,children:(0,a.jsx)(o(),{...E,ref:S,children:p.map(((e,s)=>e.id?(0,a.jsxs)("div",{className:j,children:[(0,a.jsx)(u.Ay,{className:C}),(0,a.jsx)("div",{className:v,children:w===s&&(0,a.jsx)("iframe",{sandbox:"allow-scripts allow-same-origin allow-presentation allow-popups",title:" ",width:"100%",height:"auto",src:`https://www.youtube-nocookie.com/embed/${e.id}?autoplay=1${e.start?`&start=${e.start}`:""}`,frameBorder:"0",allowFullScreen:!0})})]},e.id):(0,a.jsx)("div",{className:j,children:(0,a.jsx)(i.A,{className:A,image:e})},e.src)))})}),(0,a.jsx)(d.A,{type:"button",close:!0,onClick:s,children:(0,a.jsx)(m.A,{height:"15px"})})]})}},38909(e,s,t){"use strict";t.d(s,{A:()=>n});var a=t(28298);const n=(0,t(3253).A)((e=>(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:9,height:15,viewBox:"0 0 9 15",...e,children:(0,a.jsx)("path",{fill:"currentColor",fillRule:"nonzero",d:"M8.35 14.36c.2-.2.2-.51 0-.7L1.76 7.5l6.59-6.17c.2-.19.2-.5 0-.7a.55.55 0 0 0-.75 0L.65 7.14c-.1.1-.15.22-.15.35 0 .13.05.26.15.35l6.95 6.5c.2.21.54.21.75.02z"})})))},23169(e,s,t){"use strict";t.d(s,{E:()=>c,A:()=>d});var a=t(28298),n=t(45541),i=t.n(n);const r="bYSjL9",o="xC0HwJ",l="K_wbyK",c=({minHeight:e,minWidth:s,noMargin:t,width:n,hideOnMobile:c})=>(0,a.jsx)("div",{className:i()(r,{[l]:t,[o]:c}),style:{minHeight:e,minWidth:s,width:n}}),d=c},1231(e,s,t){"use strict";t.d(s,{A:()=>C});var a=t(28298),n=t(22722),i=t(91667),r=t(38909),o=t(40409),l=t(83922),c=t(65869),d=t(45541),u=t.n(d);const m="K_8bXx",g="DwCH2a",h="ASDtNl",p="zT0RhZ",x="Vo1EUL",y="YG9sPy",f="riegom",j="ky9vbl",v="RrMNHk",C=({items:e,isStartAligned:s,isMobileSlider:t=!0,isMarginBottom:d,arrowAlignment:C})=>{const{isRtl:A}=(0,c.Ym)(),[w,b]=(0,l.A)({isScrollRightDisabled:!1,isScrollLeftDisabled:!0}),k=(0,n.useRef)(null),N=()=>{k.current&&b({isScrollLeftDisabled:0===k.current.scrollLeft,isScrollRightDisabled:Math.abs(k.current.scrollLeft)+k.current.offsetWidth>=k.current.scrollWidth})},L=(0,i._)(N,200);(0,n.useEffect)((()=>(N(),window.addEventListener("resize",L),()=>{window.removeEventListener("resize",L),L.cancel?.()})),[]);const S=s=>()=>{if(k.current){const t=k.current.clientWidth,a=k.current.scrollWidth/e.length,n=Math.floor(t/a),i=Math.ceil(k.current.scrollLeft/a),r=a*i+a*n,o=a*i-a*n;k.current.scrollLeft=A?"previous"===s?r:o:"previous"===s?o:r,N()}},P=u()(g,{[v]:!t,[j]:s,[h]:w.isScrollLeftDisabled&&w.isScrollRightDisabled}),$=u()(m,{[y]:d}),_=u()({[f]:"center"===C});return(0,a.jsxs)("div",{className:$,children:[(0,a.jsx)("section",{className:P,ref:k,onScroll:L,children:e}),(!w.isScrollLeftDisabled||!w.isScrollRightDisabled)&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("button",{type:"button",className:u()(_,p),onClick:S("previous"),disabled:w.isScrollLeftDisabled,children:(0,a.jsx)(r.A,{})}),(0,a.jsx)("button",{type:"button",className:u()(_,x),onClick:S("next"),disabled:w.isScrollRightDisabled,children:(0,a.jsx)(o.A,{})})]})]})}},20247(e,s,t){"use strict";t.r(s),t.d(s,{default:()=>It});var a=t(28298),n=t(22722),i=t(78454),r=t(45541),o=t.n(r),l=t(91831),c=t(68591),d=t(79341),u=t(91331),m=t(67091),g=t(83922),h=t(65869),p=t(22917),x=t(32757),y=t(90846),f=t(8222);const j=y.Ay`
  query CustomLandingPageData(
    $slug: String!
    $context: Content_ContextInput
    $contextCommon: ContextInput
    $currency: String
  ) {
    Content_customLandingPage(
      slug: $slug
      context: $context
      currency: $currency
    ) {
      slug
      name
      availableVariants {
        id
        name
        priority
        translation {
          metaTitle
          metaDescription
          title
        }
        blocks {
          id
          position
          ... on Content_CLPVariantBlockContent {
            id
            contentStyle: style
            translation {
              description
            }
          }
          ... on Content_CLPVariantBlockInterlink {
            id
            colorScheme
            translation {
              title
            }
            paths {
              path
              translation {
                title
              }
            }
          }
          ... on Content_CLPVariantBlockMedia {
            id
            imageUrl
            altTag
            videoUrl
            translation {
              title
              description
            }
          }
          ... on Content_CLPVariantBlockPLP {
            id
            count
            productsLandingPageSlug
            style
            translation {
              title
            }
          }
          ... on Content_CLPVariantBlockTrustpilot {
            id
            widget
          }
          ... on Content_CLPVariantBlockUSP {
            id
            translation {
              title
            }
            items {
              id
              imagePath
              imageUrl
              translation {
                title
                description
                path
              }
            }
          }
          ... on Content_CLPVariantBlockSeoCategory {
            count
            style
            seoCategory {
              slug
              searchParameters
            }
            translation {
              title
            }
          }
          ... on Content_CLPVariantBlockSLP {
            id
            count
            style
            weeklyLandingPageId
            itmSource
            itmMedium
            itmCampaign
            itmContent
            translation {
              title
            }
          }
          ... on Content_CLPVariantBlockCountdown {
            secondsLeft
            translation {
              title
              subTitle
            }
          }
        }
      }
    }
    regions(context: $contextCommon, current: true) {
      code
      subregions {
        code
      }
    }
  }
`,v=y.Ay`
  query GetCustomPageCollection(
    $slug: String!
    $context: ContextInput
    $currency: AvailableCurrencyType
    $first: Int!
  ) {
    productsLandingPage(slug: $slug, context: $context) {
      products(first: $first) {
        edges {
          node {
            ...BasicProduct
          }
        }
      }
    }
  }
  ${f.qZ}
`,C=y.Ay`
  query GetSeoCategoryBlockProducts(
    $first: Int
    $text: String
    $genres: [String]
    $os: [OS]
    $price: Range
    $drms: [String]
    $regions: [String]
    $countries: [String]
    $tags: [String]
    $types: [ProductType]
    $digitalCurrency: [String]
    $preorder: Boolean
    $currency: AvailableCurrencyType
    $context: ContextInput
    $parentShortId: String
    $categories: [ProductCategoryEnum]
    $sortBy: SearchSortEnum
    $preferredProducts: [String]
    $valueTypes: [String]
  ) {
    search(
      first: $first
      text: $text
      genres: $genres
      os: $os
      price: $price
      drms: $drms
      regions: $regions
      countries: $countries
      tags: $tags
      types: $types
      sortBy: $sortBy
      searchType: DEFAULT
      digitalCurrency: $digitalCurrency
      preorder: $preorder
      context: $context
      categories: $categories
      parentShortId: $parentShortId
      preferredProducts: $preferredProducts
      valueTypes: $valueTypes
    ) {
      results {
        edges {
          node {
            ...BasicProduct
          }
        }
      }
    }
  }
  ${f.qZ}
`,A=y.Ay`
  query GetSlpBlockProducts(
    $id: String!
    $context: ContextInput
    $currency: AvailableCurrencyType
    $first: Int
  ) {
    weeklyLandingPage(id: $id, context: $context) {
      slug
      mainProducts(first: $first) {
        edges {
          node {
            ...BasicProduct
          }
        }
      }
    }
  }
  ${f.qZ}
`,w=y.Ay`
  query CLPSnakzyFaq($context: FAQ_ContextInput) {
    faqHow: FAQ_article(
      slug: "how-do-i-earn-rewards-snakzy"
      context: $context
    ) {
      title
      description
    }
    faqSee: FAQ_article(slug: "amount-rewards-snakzy", context: $context) {
      title
      description
    }
    faqMin: FAQ_article(slug: "minimum-amount-snakzy", context: $context) {
      title
      description
    }
  }
`;var b=t(42404),k=t(21461),N=t(9541),L=t(68377),S=t(66004),P=t(28835),$=t(19420),_=t.n($);const E="app.containers.CustomLandingPage",M=(0,P.YK)({showAll:{id:`${E}.showAll`,defaultMessage:"Show all"},countdownDays:{id:`${E}.countdownDays`,defaultMessage:"Days"},countdownHours:{id:`${E}.countdownHours`,defaultMessage:"Hours"},countdownMinutes:{id:`${E}.countdownMinutes`,defaultMessage:"Minutes"},countdownSeconds:{id:`${E}.countdownSeconds`,defaultMessage:"Seconds"},cheapGamesSections:{id:`${E}.cheapGamesSections`,defaultMessage:"Cheap games sections"},readMore:{id:`${E}.readMore`,defaultMessage:"Read more"},faqBySnazky:{id:`${E}.faqBySnazky`,defaultMessage:"<mark>FAQ</mark> by Snakzy"},readMoreAbout:{id:`${E}.readMoreAbout`,defaultMessage:"Read more about Snakzy"},usersHaveEarned:{id:`${E}.usersHaveEarned`,defaultMessage:"Users have earned over\n<mark>{earnings}</mark>"},cantBelieveEarned:{id:`${E}.cantBelieveEarned`,defaultMessage:"Can't believe I earned {earnings} in Paypal, just in {weeks} {weeks, plural, one {week} other {weeks}}!"},averagePayout:{id:`${E}.averagePayout`,defaultMessage:"Average first payout"},averageEarnings:{id:`${E}.averageEarnings`,defaultMessage:"Average user earnings"},gameOffersEarn:{id:`${E}.gameOffersEarn`,defaultMessage:"Game offers to earn from"},cashOutAsLow:{id:`${E}.cashOutAsLow`,defaultMessage:"Cash out as low as"},amountADay:{id:`${E}.amountADay`,defaultMessage:"{amount} a day"},sectionStatsDurationHS:{id:`${E}.sectionStatsDurationHS`,defaultMessage:"{hours}h {seconds}s"},playAndEarn:{id:`${E}.playAndEarn`,defaultMessage:"Play and Earn"},scanQrCode:{id:`${E}.scanQrCode`,defaultMessage:"Scan QR code to get Snakzy"},amountInstallsPerDay:{id:`${E}.amountInstallsPerDay`,defaultMessage:"{amount} installs in the past {hours} hours"},placeholder:{id:`${E}.placeholder`,defaultMessage:"Enter your email"},subscribe:{id:`${E}.subscribe`,defaultMessage:"Subscribe"},successSubscribe:{id:`${E}.successSubscribe`,defaultMessage:"Subscribed successfully"},youCanUnsubscribe:{id:`${E}.youCanUnsubscribe`,defaultMessage:"You can unsubscribe at any time. Visit <link>Privacy notice</link> for more information"},snakzyUspTitle:{id:`${E}.snakzyUspTitle`,defaultMessage:"How it works"},snakzyDownload:{id:`${E}.snakzyDownload`,defaultMessage:"Step 1: Download Snakzy"},snakzyLetsYouEarn:{id:`${E}.snakzyLetsYouEarn`,defaultMessage:"Snakzy lets you earn real rewards by simply playing your favorite mobile games. Accumulate points, redeem them for cash or Steam credits, and get premium games at zero cost."},snakzyPlayAndEarn:{id:`${E}.snakzyPlayAndEarn`,defaultMessage:"Step 2: Play and Earn Rewards"},snakzyMorePlayMoreEarn:{id:`${E}.snakzyMorePlayMoreEarn`,defaultMessage:"The more you play, the more you earn! Complete exciting milestones and daily missions to rack up coins even faster."},snakzyRedeemGiftCards:{id:`${E}.snakzyRedeemGiftCards`,defaultMessage:"Step 3: Redeem your coins for gift cards"},snakzyTradeCoins:{id:`${E}.snakzyTradeCoins`,defaultMessage:"Trade your coins for top gift cards or transfer them to your Eneba wallet. Use them to grab games, subscriptions, and more at eneba.com"}}),B="YzY6ik",I="_8D5hu",T="nlOZrb",R="EEgg6J",D="pZRKAe",z="TBHWLN",O="I7d7FY",H="r3xAmw",F="EXsZBj",V="IEXbjL",U="WSd8yS",Y="H5RdGc",q="ka0gx6",W="L3sYAd",G="m0_UVq",K="DZMfMc",X="rJD595",J="XygQ6g",Q="N3n015",Z="OLpAzr",ee="XkoIyV",se="b8wCkb",te="S1y6wj",ae="RTczWC",ne="Q6Tbdj",ie="Z5WE4B",re="BmXBJL",oe="xUvIlb",le="IcOyag",ce="Yl453s",de="NVgyCq",ue="l0ZlLv",me="cVWXAc",ge="HkY517",he="oMpz9v",pe="EydheP",xe="Tadekl",ye="MU7IMi",fe="tVyoUF",je="KAQIl9",ve="_Y27Z0",Ce="NRqBK6",Ae="TtH75F",we="CELZuK",be="jtmwm8",ke="OHk3a7",Ne="a39Ssn",Le="Ru1yAe",Se="XpEfhf",Pe="DuGARF",$e="kzIHnw",_e="auanYQ",Ee="HeMnGX",Me="KmkUW4",Be="x5ehv8",Ie="Tm_ozX",Te="uEMFfp",Re="leOyXB",De="__Etx5",ze="EammsJ",Oe="NhDAKc",He="o4k9Vf",Fe="NyTH4P",Ve="RJGoJK",Ue="EzvNTF",Ye="PrpGvY",qe="BFsALH",We="xrwY58",Ge="LB8fLx",Ke="iHGmYc",Xe="TFvw7R",Je="qPtWb8",Qe="dv8jfx",Ze="upsM0A",es="KgLmDd",ss="i2ka52",ts="j7ACoZ",as="xmnufo",ns="HGotEm",is="Oog749",rs="BPphpZ",os="MH5s9x",ls="tVOSTW",cs="Y9Pspy",ds="m4YvZd",us="njArTW",ms="V9q9_8",gs="y6LK8N",hs="uCt3WX",ps="JOjptZ",xs="wgcxAR",ys="Midf04",fs="Y8f6v7",js="Wpg31b",vs="qTz7Cw",Cs="oZwDgu",As="PLht65",ws="bKDAfQ",bs="UoNsKb",ks="kyoRe0",Ns="NcnZnj",Ls="FMkvAb",Ss=t.p+"25cee8aaca9f6b7dd6ad.png",Ps=t.p+"3358335041079868f7e9.png",$s=()=>{const{formatMessage:e}=(0,P.tz)(),s=[{key:"1",value:(0,a.jsx)(S.A,{message:M.sectionStatsDurationHS,values:{hours:10,seconds:12}}),description:e(M.averagePayout)},{key:"2",value:(0,a.jsx)(S.A,{message:M.amountADay,values:{amount:(0,a.jsx)(N.A,{price:{amount:1529,currency:"USD"}})}}),description:e(M.averageEarnings)},{key:"3",value:"120+",description:e(M.gameOffersEarn)},{key:"4",value:(0,a.jsx)(N.A,{dynamicFractionDigits:!0,price:{amount:500,currency:"USD"}}),description:e(M.cashOutAsLow)}];return(0,a.jsxs)("div",{className:ss,children:[(0,a.jsxs)("div",{className:ts,children:[(0,a.jsxs)("div",{className:as,children:[(0,a.jsx)("h2",{className:ns,children:(0,a.jsx)(S.A,{message:M.usersHaveEarned,values:{mark:e=>(0,a.jsx)("mark",{children:e}),earnings:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(N.A,{dynamicFractionDigits:!0,price:{amount:1e8,currency:"USD"}}),"+"]})}})}),(0,a.jsxs)("div",{className:is,children:[(0,a.jsx)("span",{children:(0,a.jsx)(S.A,{message:M.cantBelieveEarned,values:{earnings:(0,a.jsx)(N.A,{dynamicFractionDigits:!0,price:{amount:8900,currency:"USD"}}),weeks:1}})}),(0,a.jsxs)("div",{className:gs,children:[(0,a.jsx)(L.A,{image:{src:"https://www.eneba.com/avatars/enebian-1"},className:hs}),(0,a.jsxs)("span",{className:ps,children:["\u2014 ","Tracy Hill"]})]})]})]}),(0,a.jsxs)("div",{className:rs,children:[(0,a.jsx)(_(),{className:os}),(0,a.jsx)("div",{className:ls,children:(0,a.jsx)(L.A,{image:{src:Ss,src2x:Ps},className:cs})})]})]}),s.map((e=>(0,a.jsxs)("div",{className:ds,children:[(0,a.jsx)("h3",{className:us,children:e.value}),(0,a.jsx)("span",{className:ms,children:e.description})]},e.key)))]})};var _s=t(57670),Es=t.n(_s),Ms=t(2661),Bs=t(32434);const Is=e=>{const s=e?.startsWith("https://www.eneba.com")&&!e?.startsWith("https://www.eneba.com/blog")?e.split("https://www.eneba.com")[1]:void 0;return{href:s?void 0:e,path:s}};var Ts=t(44444),Rs=t(48055),Ds=t(91941);const zs=({hideFade:e,content:s,variant:t="CENTRED"})=>{const[n,i]=(0,g.A)({isReadMoreOpen:!1}),r={replace(e){const s=e,{path:t,href:n}=Is(s.attribs?.href);if(e instanceof Rs.Hg&&"a"===s.name&&"button"===s.attribs.class)return(0,a.jsx)(Ds.A,{primary:!0,to:t,externalLink:n,className:T,children:s.childNodes.map((e=>e instanceof Rs.EY?e.data:null))});if("a"===s.name&&t)return(0,a.jsx)(c.A,{to:t,className:s.attribs.class,children:s.childNodes.map((e=>e instanceof Rs.EY?e.data:null))});const i=s.childNodes?.some((e=>e instanceof Rs.Hg&&"img"===e.name&&"img"===e.name));return"a"===s.name&&n&&i?(0,a.jsx)(Ds.A,{className:We,externalLink:s.attribs.href,children:s.childNodes.map((e=>{if(e instanceof Rs.Hg&&"img"===e.name&&e.attribs.src){const t=e.attribs.style?(s=e.attribs.style)?s.split(";").filter(Boolean).map((e=>{const[s,t]=e.split(":").map((e=>e.trim()));return{property:s,value:t}})).filter((({property:e,value:s})=>e&&s)).reduce(((e,{property:s,value:t})=>({...e,[s.replace(/-([a-z])/g,((e,s)=>s.toUpperCase()))]:t})),{}):{}:{};return(0,a.jsx)("img",{alt:e.attribs.alt,style:t,src:e.attribs.src,height:e.attribs.height,width:e.attribs.width})}var s;return null}))}):"a"!==s.name||t?e:(0,a.jsx)(Ds.A,{className:"link",externalLink:s.attribs.href,children:s.childNodes.map((e=>e instanceof Rs.EY?e.data:null))})}},l="EXTENDED_READMORE"===t;return(0,a.jsxs)("div",{className:o()(I,{[Fe]:"heroSection"===t,[Ve]:"CENTRED"===t,[Ue]:l}),children:[(0,a.jsx)("div",{className:o()({[H]:e,[O]:l&&!n.isReadMoreOpen,[Ye]:l&&n.isReadMoreOpen}),children:(0,Rs.Ay)(s,r)}),l&&!n.isReadMoreOpen&&(0,a.jsx)("div",{className:qe,children:(0,a.jsx)(Ds.A,{hollow:!0,onClick:()=>{i({isReadMoreOpen:!n.isReadMoreOpen})},children:(0,a.jsx)(S.A,{message:M.readMore})})})]})},Os=t.p+"6a5467742912315c2d9e.png",Hs=t.p+"e2a75a68cab1d60fff30.png",Fs=t.p+"fa9312b69ce537c15422.png",Vs=t.p+"32a49a03bd14ab14ffc0.png";var Us=t(11212);const Ys=t.p+"5ddf489e08e278aadff1.png",qs=()=>{const[e,s]=(0,n.useState)(!1);return(0,n.useEffect)((()=>{s(!(0,Us.ek)())}),[]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(Ds.A,{primary:!0,className:As,externalLink:"https://snakzy.onelink.me/VJVU/al1q0z01",children:(0,a.jsx)(S.A,{message:M.playAndEarn})}),(0,a.jsx)("div",{className:ws,children:e&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(L.A,{className:Ls,image:{src:Ys}}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h2",{className:bs,children:(0,a.jsx)(S.A,{message:M.scanQrCode})}),(0,a.jsx)("p",{className:ks,children:(0,a.jsx)(S.A,{message:M.amountInstallsPerDay,values:{amount:(0,a.jsx)("span",{className:Ns,children:"45674+"}),hours:24}})})]})]})})]})};var Ws=t(16786);const Gs=y.Ay`
  mutation PromoSubscribeNewsletter(
    $input: Mail_SubscribeNewsletterInput!
    $context: Mail_ContextInput
  ) {
    Mail_subscribeNewsletter(input: $input, context: $context) {
      success
    }
  }
`;var Ks=t(30349),Xs=t(10875);const Js=()=>{const{formatMessage:e}=(0,P.tz)(),[s,t]=(0,Ws.A)(Gs),[i,r]=(0,g.A)({isSuccessful:!1,interactedWithInput:!1}),o=(0,n.useRef)(null),l=(0,Xs.A)({action:"newsletter",isLoad:!1});return(0,a.jsxs)("div",{className:xs,children:[(0,a.jsxs)("form",{className:ys,onSubmit:async e=>{e.preventDefault();(({token:e,fingerprint:t})=>{s({variables:{input:{email:o?.current?.value,location:"POP_UP",anonymousId:(0,k.Ny)(),captchaResponse:e,fingerprint:t}},update:()=>{r({isSuccessful:!0}),o.current.value=""}})})(await l.executeCaptcha())},children:[(0,a.jsx)("input",{className:fs,"aria-label":e(M.placeholder),required:!0,onChange:()=>{i.interactedWithInput||l.initCaptcha(),r({isSuccessful:!1,interactedWithInput:!0})},type:"email",name:"email",ref:o,placeholder:e(M.placeholder),autoCorrect:"off"}),(0,a.jsx)(Ds.A,{className:js,type:"submit",loading:t.loading||l.loading,hollow:!0,children:(0,a.jsx)(S.A,{message:M.subscribe})}),(0,a.jsx)("div",{className:vs,children:(0,a.jsx)(p.A,{errors:t.error||l.error,noMargin:!0})}),(0,a.jsx)("div",{className:vs,children:(0,a.jsx)(Ks.A,{show:i.isSuccessful,success:!0,message:M.successSubscribe,noMargin:!0})})]}),(0,a.jsx)("p",{className:Cs,children:(0,a.jsx)(S.A,{message:M.youCanUnsubscribe,values:{link:e=>(0,a.jsx)(c.A,{to:(0,d.c$)("PRIVACY_POLICY"),className:B,children:e})}})})]})},Qs=({mediaBlockData:e,isSnakzy:s,isSubscribeForm:t,isHighPriorityImage:n,hideBackground:i})=>{const[r,l]=(0,g.X)({isVideoModalOpen:!1}),{translation:c,altTag:d,videoUrl:u,imageUrl:m}=e,h=!!m||!!u,p=!!u,x=d||c?.title,y=u?.split("/")[3],f=Number(u?.split("t=")[1]);return(0,a.jsxs)("section",{className:o()(F,z,{[H]:i}),children:[h&&!i&&(0,a.jsx)(L.A,{className:V,image:{src:Os,src2x:Hs}}),(0,a.jsxs)("div",{className:o()(U,{[Y]:!h,[Ke]:p}),children:[(0,a.jsxs)("div",{className:q,children:[c?.title&&(0,a.jsx)("h1",{className:W,children:c?.title}),c?.description&&(0,a.jsx)(zs,{variant:"heroSection",content:c.description}),s&&(0,a.jsx)(qs,{}),t&&(0,a.jsx)(Js,{})]}),h&&(0,a.jsxs)(a.Fragment,{children:[p&&(0,a.jsxs)("button",{type:"button",className:K,onClick:()=>{l({isVideoModalOpen:!0})},children:[(0,a.jsx)("img",{src:m,alt:x,className:X,fetchpriority:n?"high":void 0}),(0,a.jsx)(L.A,{className:J,image:{src:Fs,src2x:Vs}})]}),!p&&(0,a.jsx)(L.A,{alt:x,image:{src:m},className:G,isHighPriority:n})]})]}),(0,a.jsx)(Ts.A,{single:!0,initial:0,onClose:()=>{l({isVideoModalOpen:!1})},isOpen:r.isVideoModalOpen,gallery:[{id:y,start:f}]})]})};var Zs=t(1231);const et=({hideBackground:e,title:s,links:t,colorScheme:n="COLORFUL"})=>(0,a.jsxs)("section",{className:o()(Me,z,{[H]:e}),children:[(0,a.jsx)("h2",{className:te,children:s}),(0,a.jsx)(Zs.A,{isStartAligned:!0,items:t.map((e=>{const{path:s,translation:t}=e;return s&&t?.title?(0,a.jsx)(c.A,{to:s,className:o()(Be,{[Ie]:"COLORFUL"===n,[De]:"RED"===n,[Te]:"VIOLET"===n,[ze]:"YELLOW"===n,[Re]:"BLUE"===n,[Oe]:"GREEN"===n,[He]:"GREY"===n}),children:t?.title},s):null}))})]});var st=t(23169),tt=t(42568);const at=({position:e,products:s})=>(0,a.jsx)("div",{className:ye,children:s?.edges?.map(((s,t)=>{const n=s?.node;return n&&"Product"===n.__typename?(0,a.jsx)(tt.A,{item:n,loadAboveTheFold:(e??0)<=3&&t<=5},n.slug):null}))}),nt=({listName:e,products:s,position:t})=>(0,a.jsx)("div",{className:he,children:(0,a.jsx)(Zs.A,{isMobileSlider:!1,items:s?.edges?.map(((s,n)=>{const i=s?.node;return i&&"Product"===i.__typename?(0,a.jsx)("div",{className:fe,children:(0,a.jsx)(tt.A,{item:i,listName:e,listPosition:n+1,loadAboveTheFold:(t??0)<=3&&n<=5})},i.slug):null}))||[]})}),it=({hideBackground:e,slug:s,listName:t,layout:i,position:r,productCount:l,sectionId:c,onVisibilityChange:u})=>{const{loading:g,data:h}=(0,m.A)(v,{skip:!s,variables:{first:l||15,slug:s}}),p=(h?.productsLandingPage?.products?.edges?.length??0)>0;if((0,n.useEffect)((()=>{c&&!g&&u?.(c,p)}),[p,g,u,c]),!s)return null;if(g){const s="CAROUSEL"===i?5:l||15;return(0,a.jsxs)("section",{className:o()(se,z,{[H]:e,[ge]:c}),id:c,children:[(0,a.jsx)(st.A,{minHeight:40,width:"200px"}),(0,a.jsx)("div",{className:ye,children:Array.from({length:s}).map(((e,s)=>(0,a.jsx)("div",{className:Xe,children:(0,a.jsx)(st.A,{minHeight:375,width:"100%",noMargin:!0})},s)))}),(0,a.jsx)("div",{className:ae,children:(0,a.jsx)(st.A,{minHeight:40,width:"200px"})})]})}return p?(0,a.jsxs)("section",{className:o()(se,z,{[H]:e,[ge]:c}),id:c,children:[(0,a.jsx)("h2",{className:te,children:t}),"CAROUSEL"===i&&(0,a.jsx)(nt,{listName:t,position:r,products:h?.productsLandingPage?.products}),"LIST"===i&&(0,a.jsx)(at,{position:r,products:h?.productsLandingPage?.products}),(0,a.jsx)("div",{className:ae,children:(0,a.jsx)(Ds.A,{className:pe,hollow:!0,to:(0,d.c$)("COLLECTION",{slug:s}),children:(0,a.jsx)(S.A,{message:M.showAll})})})]}):null};var rt=t(15186);const ot=({layout:e,hideBackground:s})=>(0,a.jsxs)("section",{className:o()(Le,z,{[H]:s,[Se]:"COMPACT"===e,[$e]:"FULL"===e}),children:["COMPACT"===e&&(0,a.jsx)("div",{className:Pe,children:(0,a.jsx)(rt.A,{templateId:"5613c9cde69ddc09340c6beb",height:"100%",width:"100%",scaleUp:!0})}),"FULL"===e&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(rt.A,{className:_e,templateId:"53aa8912dec7e10d38f59f36",height:"140px",width:"100%"}),(0,a.jsx)(rt.A,{className:Ee,templateId:"53aa8912dec7e10d38f59f36",height:"292px",width:"100%"})]})]}),lt=t.p+"1d5c4bc976028a468857.png",ct=t.p+"cb4dbdb78685a2f12c79.png",dt=t.p+"4ad93fe353d3ab7ddee5.png",ut=[{image:lt,title:M.snakzyDownload,description:M.snakzyLetsYouEarn},{image:dt,title:M.snakzyPlayAndEarn,description:M.snakzyMorePlayMoreEarn},{image:ct,title:M.snakzyRedeemGiftCards,description:M.snakzyTradeCoins}],mt=({title:e,usps:s,isSnakzy:t=!1,hideBackground:n})=>t?(0,a.jsxs)("section",{className:o()(je,z,{[H]:n}),children:[(0,a.jsx)("h2",{className:o()(te,ve),children:(0,a.jsx)(S.A,{message:M.snakzyUspTitle})}),(0,a.jsx)("div",{className:Ce,children:ut.map((e=>(0,a.jsxs)("article",{className:Ae,children:[(0,a.jsx)(L.A,{image:{src:e.image},className:be}),(0,a.jsx)("h3",{className:ke,children:(0,a.jsx)(S.A,{message:e.title})}),(0,a.jsx)("p",{className:Ne,children:(0,a.jsx)(S.A,{message:e.description})})]},e.title.id)))})]}):(0,a.jsxs)("section",{className:o()(je,z,{[H]:n}),children:[(0,a.jsx)("h2",{className:te,children:e}),(0,a.jsx)("div",{className:Ce,children:s?.map((e=>{const{path:s,href:t}=Is(e?.translation?.path),n=(0,a.jsxs)(a.Fragment,{children:[e.imageUrl&&(0,a.jsx)(L.A,{image:{src:e.imageUrl},className:be}),(0,a.jsx)("h3",{className:ke,children:e.translation?.title}),(0,a.jsx)("p",{className:Ne,children:e.translation?.description})]});return(0,a.jsxs)("article",{className:Ae,children:[e?.translation?.path&&(0,a.jsx)(Ds.A,{to:s,externalLink:t,className:we,children:n}),!e?.translation?.path&&n]},e.translation?.title)}))})]});var gt=t(4125);const ht=({hideBackground:e,slug:s,listName:t,layout:i,position:r,searchParameters:l,productCount:c,fallbackRegions:u,sectionId:g,onVisibilityChange:h})=>{const{currentCurrency:x}=(0,gt.H2)(),y=((e,s)=>{const t=e??{};return t.regions||t.countries||!s?.length?t:{...t,regions:s}})((e=>{if(!e)return null;try{const s=JSON.parse(e);return Object.keys(s).forEach((e=>{"object"===typeof s[e]&&void 0===s[e].length&&"price"!==e?(void 0!==s[e].from&&(s[`${e}From`]=s[e].from),void 0!==s[e].to&&(s[`${e}To`]=s[e].to),delete s[e]):"price"===e&&(void 0!==s[e].from&&(s.rangeFrom=s[e].from/(0,Ms.N)(Bs.OS)),void 0!==s[e].to&&(s.rangeTo=s[e].to/(0,Ms.N)(Bs.OS)),delete s.price)})),s}catch{return null}})(l),u),f=((e,s)=>{const t=["PRICE_ASC","PRICE_DESC","DATE_DESC","DATE_ASC","POPULARITY_DESC","ALPHABETICALLY_ASC","ALPHABETICALLY_DESC"].some((e=>e===s.sortBy)),a=s.rangeFrom?Math.abs(s.rangeFrom):void 0,n=s.rangeTo?Math.abs(s.rangeTo):void 0;return{text:s.text?s.text:void 0,parentShortId:s.parentShortId?s.parentShortId:void 0,preorder:(i=s.preorder,"true"===i||"false"!==i&&(!0===i||!1===i?i:void 0)),types:s.types?s.types:void 0,genres:s.genres?s.genres:void 0,tags:s.tags?s.tags:void 0,drms:s.drms?s.drms:void 0,countries:s.countries?s.countries:void 0,digitalCurrency:s.digitalCurrency?s.digitalCurrency:void 0,os:s.os?s.os:void 0,regions:s.regions?s.regions:void 0,sortBy:t?s.sortBy:"POPULARITY_DESC",categories:s.categories?s.categories:void 0,preferredProducts:s.preferredProductShortIds?s.preferredProductShortIds:void 0,valueTypes:s.valueTypes?s.valueTypes:void 0,price:{from:(0,Ms.v)(a,e),to:(0,Ms.v)(n,e),currency:e}};var i})(x,y),{data:j,loading:v,error:A}=(0,m.A)(C,{variables:{...f,first:c},skip:!s}),w=(j?.search?.results?.edges?.length??0)>0;if((0,n.useEffect)((()=>{g&&!v&&h?.(g,w)}),[w,v,h,g]),A)return(0,a.jsx)(p.A,{errors:A});if(v){const s="CAROUSEL"===i?5:c||15;return(0,a.jsxs)("section",{className:o()(se,z,{[H]:e,[ge]:g}),id:g,children:[(0,a.jsx)(st.A,{minHeight:40,width:"200px"}),(0,a.jsx)("div",{className:ye,children:Array.from({length:s}).map(((e,s)=>(0,a.jsx)("div",{className:Xe,children:(0,a.jsx)(st.A,{minHeight:375,width:"100%",noMargin:!0})},s)))}),(0,a.jsx)("div",{className:ae,children:(0,a.jsx)(st.A,{minHeight:40,width:"200px"})})]})}return w||v?(0,a.jsxs)("section",{className:o()(se,z,{[H]:e,[ge]:g}),id:g,children:[(0,a.jsx)("h2",{className:te,children:t}),"CAROUSEL"===i&&(0,a.jsx)(nt,{listName:t,position:r,products:j?.search?.results}),"LIST"===i&&(0,a.jsx)(at,{position:r,products:j?.search?.results}),(0,a.jsx)("div",{className:ae,children:(0,a.jsx)(Ds.A,{className:pe,hollow:!0,to:(0,d.c$)("STORE",{initialSelection:s}),children:(0,a.jsx)(S.A,{message:M.showAll})})})]}):null};var pt=t(67783);const xt=({hideBackground:e,weeklyLandingPageId:s,itmSource:t,itmMedium:n,itmCampaign:i,itmContent:r,listName:l,layout:c,position:u,productCount:g})=>{const h=g||15,{data:p,loading:x,error:y}=(0,m.A)(A,{variables:{id:s,first:h},skip:!s}),f=p?.weeklyLandingPage?.slug,j=p?.weeklyLandingPage?.mainProducts,v=!!j?.edges?.some((e=>e?.node)),C=!!f&&v;if(y)return null;if(x){const s="CAROUSEL"===c?5:h,t=Array.from({length:s},((e,s)=>s));return(0,a.jsxs)("section",{className:o()(ne,z,{[H]:e}),children:[(0,a.jsx)(st.A,{minHeight:40,width:"200px"}),(0,a.jsx)("div",{className:ye,children:t.map((e=>(0,a.jsx)("div",{className:Xe,children:(0,a.jsx)(st.A,{minHeight:375,width:"100%",noMargin:!0})},e)))}),(0,a.jsx)("div",{className:ae,children:(0,a.jsx)(st.A,{minHeight:40,width:"200px"})})]})}if(!C)return null;const w=pt.stringify({itm_source:t||void 0,itm_medium:n||void 0,itm_campaign:i||void 0,itm_content:r||void 0});return(0,a.jsxs)("section",{className:o()(ne,z,{[H]:e}),children:[(0,a.jsx)("h2",{className:te,children:l}),"CAROUSEL"===c&&(0,a.jsx)(nt,{listName:l,position:u,products:j}),"LIST"===c&&(0,a.jsx)(at,{position:u,products:j}),(0,a.jsx)("div",{className:ae,children:(0,a.jsx)(Ds.A,{className:pe,hollow:!0,to:{pathname:(0,d.c$)("SALES",{slug:f}),search:w},children:(0,a.jsx)(S.A,{message:M.showAll})})})]})};var yt=t(48780);const ft=({secondsLeft:e,title:s,subTitle:t,hideBackground:i,isMainHeading:r})=>{const{days:l,hours:c,minutes:d,seconds:u,startTimer:m}=(0,yt.A)(),[h,p]=(0,g.A)({isFinished:!1});if((0,n.useEffect)((()=>{m({initTime:e,onEnd:()=>p({isFinished:!0})})}),[]),h.isFinished)return null;const x=r?"h1":"h2",y=[{value:l.padStart(2,"0"),message:M.countdownDays},{value:c,message:M.countdownHours},{value:d,message:M.countdownMinutes},{value:u,message:M.countdownSeconds}].map((({value:e,message:s})=>({message:s,digits:e.split("").map(((s,t)=>({digit:s,placeValue:e.length-t})))})));return(0,a.jsxs)("section",{className:o()(ie,z,{[H]:i}),children:[s&&(0,a.jsx)(x,{className:re,children:s}),t&&(0,a.jsx)("p",{className:oe,children:t}),(0,a.jsx)("div",{className:le,role:"timer",children:y.map((({message:e,digits:s})=>(0,a.jsxs)("div",{className:ce,children:[(0,a.jsx)("div",{className:de,children:s.map((({digit:e,placeValue:s})=>(0,a.jsx)("span",{className:ue,children:e},s)))}),(0,a.jsx)(S.A,{message:e,className:me})]},e.id)))})]})};var jt=t(28653);const vt=()=>{const{loading:e,error:s,data:t}=(0,m.A)(w);if(s)return(0,a.jsx)(p.A,{errors:s});if(e)return(0,a.jsxs)("section",{className:Je,children:[(0,a.jsx)("h2",{className:Qe,children:(0,a.jsx)(S.A,{message:M.faqBySnazky,values:{mark:e=>(0,a.jsx)("mark",{children:e})}})}),(0,a.jsxs)("div",{children:[(0,a.jsx)(st.A,{minHeight:60}),(0,a.jsx)(st.A,{minHeight:60}),(0,a.jsx)(st.A,{minHeight:60})]}),(0,a.jsx)(Ds.A,{hollow:!0,to:(0,d.c$)("SUPPORT_SECTION",{slug:"faq-snakzy"}),className:es,children:(0,a.jsx)(S.A,{message:M.readMoreAbout})})]});const n=[t?.faqHow,t?.faqMin,t?.faqSee].filter((e=>!!e)).map((e=>({q:e?.title,a:e?.description})));return(0,a.jsxs)("section",{className:Je,children:[(0,a.jsx)("h2",{className:Qe,children:(0,a.jsx)(S.A,{message:M.faqBySnazky,values:{mark:e=>(0,a.jsx)("mark",{children:e})}})}),(0,a.jsxs)("div",{className:Ze,children:[(0,a.jsx)(jt.A,{variant:"snakzy",questions:n}),(0,a.jsx)(Ds.A,{hollow:!0,to:(0,d.c$)("SUPPORT_SECTION",{slug:"faq-snakzy"}),className:es,children:(0,a.jsx)(S.A,{message:M.readMoreAbout})})]})]})},Ct=["1","2","3","4","5"],At=({isLoading:e,items:s})=>{const{formatMessage:t}=(0,P.tz)();return e||0!==s.length?(0,a.jsxs)("nav",{className:Q,"aria-label":t(M.cheapGamesSections),children:[e&&Ct.map((e=>(0,a.jsx)("div",{className:ee,children:(0,a.jsx)(st.A,{minHeight:40,width:"100%",noMargin:!0})},e))),!e&&s.map((e=>(0,a.jsx)("a",{className:Z,href:`#${e.id}`,children:e.title},e.id)))]}):null};var wt=t(78623);const bt="ld-json-seo-faq",kt=e=>e.replace(/\s+/g," ").trim(),Nt=e=>e instanceof Rs.EY?e.data:e instanceof Rs.Hg?e.children.filter((e=>e instanceof Rs.Hg||e instanceof Rs.EY)).map(Nt).join(""):"",Lt=(e,s)=>e.reduce(((e,t)=>{if(t instanceof Rs.Hg){t.name===s&&e.push(t);const a=t.children.filter((e=>e instanceof Rs.Hg));e.push(...Lt(a,s))}return e}),[]),St=e=>(e.attribs.class??"").toLowerCase().split(/\s+/).includes(bt)||(e.attribs.id??"").toLowerCase()===bt,Pt=(e,s)=>e.children.filter((e=>e instanceof Rs.Hg&&s.includes(e.name))),$t=e=>{if(!e)return[];let s;try{s=(0,Rs.Nj)(e)}catch{return[]}const t=Lt(s,"table");if(!t.length)return[];const a=t.find(St);return a?(n=a,[...Pt(n,["tr"]),...Pt(n,["thead","tbody","tfoot"]).flatMap((e=>Pt(e,["tr"])))]).reduce(((e,s)=>{const t=Pt(s,["td"]);if(t.length<2)return e;const a=kt(Nt(t[0])),n=kt(Nt(t[1]));return a&&n&&e.push({question:a,answer:n}),e}),[]):[];var n},_t=e=>{try{return JSON.stringify(e)}catch{return null}},Et=({title:e,description:s,faqHtml:t})=>{const{pathname:n}=(0,i.useLocation)(),{localePrefix:r,currentLocale:o}=(0,h.Ym)(),l=`https://www.eneba.com${n}`,c=`https://www.eneba.com${r}/`,d=`${l}#breadcrumb`,u={"@context":"https://schema.org","@type":"AboutPage",name:e,description:s,url:l,inLanguage:o,isPartOf:{"@type":"WebSite",name:"ENEBA",url:c},about:{"@id":"https://www.eneba.com/#organization"},breadcrumb:{"@id":d}},m={"@context":"https://schema.org","@type":"BreadcrumbList","@id":d,itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:c},{"@type":"ListItem",position:2,name:e,item:l}]},g=(p=$t(t)).length?{"@context":"https://schema.org","@type":"FAQPage",mainEntity:p.map((e=>({"@type":"Question",name:e.question,acceptedAnswer:{"@type":"Answer",text:e.answer}})))}:null;var p;return(0,a.jsxs)(wt.mg,{children:[(0,a.jsx)("script",{children:"\x3c!--sse--\x3e"}),(0,a.jsx)("script",{type:"application/ld+json",children:_t(u)}),(0,a.jsx)("script",{type:"application/ld+json",children:_t(m)}),g&&(0,a.jsx)("script",{type:"application/ld+json",children:_t(g)}),(0,a.jsx)("script",{children:"\x3c!--/sse--\x3e"})]})},Mt="is-eneba-legit",Bt=e=>`cheap-games-block-${e.toLowerCase().replace(/[^a-z0-9_-]+/g,"-")}`,It=({slug:e})=>{const{slug:s}=(0,i.useParams)(),t=e??s,r="gta-6-keys"===t,y=!e&&s===Mt,f=(0,i.useLocation)(),{context:v}=(0,h.Ym)(),[C]=(0,b.Ay)(["userId"]),[A,w]=(0,g.A)({resolvedTargetIds:[],targetsKey:"",visibility:{}}),{loading:N,error:L,data:S}=(0,m.A)(j,{variables:{slug:t,contextCommon:v},skip:y}),P=S?.Content_customLandingPage?.name?.includes("snakzy"),$=((e,s)=>{const t=(e||"")?.split("").map((e=>Number.isInteger(e)?e:e.charCodeAt(0))),a=(s?.slug||"").split("").map((e=>e.charCodeAt(0))),n=new(Es())([...t,...a]),i=(s?.availableVariants?.length??0)>1?Math.floor(n.random()*(s?.availableVariants.length??0)):0;return s?.availableVariants[i]})(C.userId,S?.Content_customLandingPage),_=(E=$?.blocks??[],M=((e,s)=>"cheap-games"===e&&"Cheap Games - test"===s?.name)(t,$),M?E.map((e=>"Content_CLPVariantBlockPLP"===e.__typename&&e.id&&e.productsLandingPageSlug&&e.translation?.title||"Content_CLPVariantBlockSeoCategory"===e.__typename&&e.id&&e.seoCategory?.slug&&e.translation?.title?{blockId:e.id,id:Bt(e.id),title:e.translation.title}:null)).filter((e=>!!e)):[]);var E,M;const B=_.map((({id:e})=>e)),I=B.join("|"),T=A.targetsKey===I?A.visibility:{},O=A.targetsKey===I?A.resolvedTargetIds:[],F=_.filter((({id:e})=>T[e])),V=B.filter((e=>O.includes(e))).length,U=_.length>V,Y=(0,n.useCallback)(((e,s)=>{w((t=>{const a=t.targetsKey===I,n=a?t.resolvedTargetIds:[],i=a?t.visibility:{},r=n.includes(e)?n:[...n,e];return r===n&&i[e]===s?{}:{resolvedTargetIds:r,targetsKey:I,visibility:{...i,[e]:s}}}))}),[I]);if((0,n.useEffect)((()=>{if(!$)return;const e=(S?.Content_customLandingPage?.availableVariants?.length??0)>1,s=$?.blocks.filter((e=>"Content_CLPVariantBlockInterlink"===e.__typename)),t=s?.flatMap((({paths:e})=>e)).map((({path:e})=>e)),a=$?.blocks.find((e=>"Content_CLPVariantBlockMedia"===e?.__typename));var n;e&&$?.name&&S?.Content_customLandingPage?.slug&&(0,k.VN)(`CLP-${S?.Content_customLandingPage?.slug}`,(n=$.name,n?.split(/[_ ]/).join("-").toLowerCase())),(0,k.Wd)({clpSlug:S?.Content_customLandingPage?.slug,clpVariantId:$?.id,clpVariantName:$?.name,internalLinkCount:t?.length,internalLinkSlugs:t,isImage:!!a?.imageUrl,isVideo:!!a?.videoUrl})}),[$]),y)return(0,a.jsx)(c.A,{to:`${(0,d.c$)("IS_ENEBA_LEGIT")}${f.search}`,redirect:!0,redirectStatusCode:301,replace:!0});if(N)return(0,a.jsx)(x.Ay,{});if(L)return(0,a.jsx)(p.A,{errors:L});if(!$)return(0,a.jsx)(u.default,{checkRedirectRules:!0});const q=$.blocks.some((e=>"Content_CLPVariantBlockUSP"===e.__typename)),W={__typename:"Content_CLPVariantBlockUSP",translation:void 0,items:[]},G=P&&!q?[...$.blocks.slice(0,1),W,...$.blocks.slice(1)]:$.blocks,K=$.blocks.some((e=>"Content_CLPVariantBlockMedia"===e.__typename&&e.translation?.title)),X=G.findIndex((e=>"Content_CLPVariantBlockCountdown"===e.__typename&&!!e.secondsLeft)),J=S?.regions?.[0]?.subregions?.map((e=>e?.code)).filter((e=>!!e)),Q=$.blocks.map((e=>"Content_CLPVariantBlockContent"===e.__typename?e.translation?.description:null)).filter((e=>Boolean(e))).join("\n");return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.A,{title:$?.translation?.metaTitle||$?.translation?.title,description:$?.translation?.metaDescription}),t===Mt&&(0,a.jsx)(Et,{title:$?.translation?.metaTitle||$?.translation?.title,description:$?.translation?.metaDescription,faqHtml:Q}),(0,a.jsxs)("div",{className:o()(R,{[D]:r}),children:[G?.map(((e,s)=>{const i=`${e.__typename}_${s}`,l=$.blocks.length-1===s,c=0===s&&_.length>0;let d=null;if("Content_CLPVariantBlockMedia"===e.__typename&&(d=(0,a.jsx)(Qs,{isSnakzy:P,isSubscribeForm:t?.includes("eneba-discount"),isHighPriorityImage:0===s,hideBackground:r,mediaBlockData:e})),"Content_CLPVariantBlockPLP"===e.__typename){const t=_.find((s=>s.blockId===e.id));d=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(it,{hideBackground:r,position:s+1,layout:e.style,productCount:e.count,listName:e.translation?.title,slug:e.productsLandingPageSlug,sectionId:t?.id,onVisibilityChange:t?Y:void 0}),l&&(0,a.jsx)("div",{className:xe})]})}if("Content_CLPVariantBlockTrustpilot"===e.__typename&&(d=(0,a.jsx)(ot,{layout:e.widget,hideBackground:r})),"Content_CLPVariantBlockUSP"===e.__typename&&(d=(0,a.jsx)(mt,{hideBackground:r,title:e.translation?.title,usps:e.items??[],isSnakzy:P})),"Content_CLPVariantBlockInterlink"===e.__typename&&(d=(0,a.jsx)(et,{hideBackground:r,links:e.paths,colorScheme:e.colorScheme,title:e.translation?.title})),"Content_CLPVariantBlockContent"===e.__typename&&e.translation?.description&&(d=(0,a.jsx)("section",{className:o()(Ge,z,{[H]:r}),children:(0,a.jsx)(zs,{hideFade:r,content:e.translation.description,variant:e.contentStyle})})),"Content_CLPVariantBlockSeoCategory"===e.__typename){const t=_.find((s=>s.blockId===e.id));d=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(ht,{hideBackground:r,position:s+1,layout:e.style,productCount:e.count,listName:e.translation?.title,slug:e.seoCategory?.slug,searchParameters:e.seoCategory?.searchParameters,fallbackRegions:J,sectionId:t?.id,onVisibilityChange:t?Y:void 0}),l&&(0,a.jsx)("div",{className:xe})]})}return"Content_CLPVariantBlockSLP"===e.__typename&&(d=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(xt,{hideBackground:r,position:s+1,layout:e.style,productCount:e.count,listName:e.translation?.title,weeklyLandingPageId:e.weeklyLandingPageId,itmSource:e.itmSource,itmMedium:e.itmMedium,itmCampaign:e.itmCampaign,itmContent:e.itmContent}),l&&(0,a.jsx)("div",{className:xe})]})),"Content_CLPVariantBlockCountdown"===e.__typename&&e.secondsLeft&&(d=(0,a.jsx)(ft,{hideBackground:r,isMainHeading:!K&&s===X,secondsLeft:e.secondsLeft,title:e.translation?.title,subTitle:e.translation?.subTitle})),(0,a.jsxs)(n.Fragment,{children:[d,c&&(0,a.jsx)(At,{isLoading:U,items:F})]},i)})),P&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)($s,{}),(0,a.jsx)(vt,{})]})]})]})}},91331(e,s,t){"use strict";t.r(s),t.d(s,{NotFoundPage:()=>b,default:()=>k});var a=t(28298),n=t(91831),i=t(66004),r=t(91941),o=t(34656),l=t(79341),c=t(67091);const d=t(90846).Ay`
  query NotFoundRedirect($redirectUrl: String!) {
    Content_accessRule(url: $redirectUrl) {
      statusCode
      location
    }
  }
`;var u=t(32757),m=t(22917),g=t(43932),h=t(78454);const p="app.containers.NotFoundPage",x=(0,t(28835).YK)({title:{id:`${p}.title`,defaultMessage:"Page not found"},highscore:{id:`${p}.highscore`,defaultMessage:"Highscore"},somethingWentWrong:{id:`${p}.somethingWentWrong`,defaultMessage:"We're pretty sure something went horribly wrong"},continueBrowsing:{id:`${p}.continueBrowsing`,defaultMessage:"Continue browsing"}}),y="fse1J0",f="wJyFm2",j="gKw6T_",v="lCzaWL",C="ZSwMiY",A="gQxG5z",w=t.p+"712d2d2079070e1fdf37.png",b=({checkRedirectRules:e})=>{const s=(0,h.useLocation)();(0,o.RF)().status=404;const{loading:t,error:p,data:b}=(0,c.A)(d,{variables:{redirectUrl:"https://www.eneba.com"+s.pathname},skip:!e});return t?(0,a.jsx)(u.Ay,{}):p?(0,a.jsx)(m.A,{errors:p}):b&&null!==b.Content_accessRule?(0,a.jsx)(g.A,{accessRule:b.Content_accessRule}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.A,{title:x.title,children:[(0,a.jsx)("meta",{name:"robots",content:"noindex, nofollow"}),(0,a.jsx)("body",{className:A})]}),(0,a.jsxs)("div",{className:y,children:[(0,a.jsxs)("h1",{className:f,children:[(0,a.jsx)(i.A,{message:x.highscore}),"! 404"]}),(0,a.jsx)(i.A,{message:x.somethingWentWrong,className:j}),(0,a.jsx)(r.A,{to:(0,l.c$)("HOMEPAGE"),hollow:!0,className:v,children:(0,a.jsx)(i.A,{message:x.continueBrowsing})}),(0,a.jsx)("img",{src:w,alt:"",className:C})]})]})},k=b},11212(e,s,t){"use strict";t.d(s,{ek:()=>i,md:()=>r,zA:()=>n});const a=e=>{if("undefined"===typeof window||!window?.navigator)return!1;try{return e.test(window.navigator.userAgent)}catch{return!1}},n=()=>a(/Safari\//)&&!a(/Chrome\//)&&!a(/Chromium\//),i=()=>a(/iPad|iPhone|iPod/)||a(/Macintosh/)&&window.navigator.maxTouchPoints>0,r=()=>a(/Android/)},81390(e,s,t){"use strict";t.d(s,{FQ:()=>r,Oe:()=>o});var a=t(6405);const n="/bro-packs",i=["en","br","de","es","latam","fr","it","hu","ro","gb","us"],r=e=>e===n||e.startsWith(`${n}/`),o=(e,s)=>{const t=e.search(/[?#]/),n=-1===t?e:e.slice(0,t),r=-1===t?"":e.slice(t),o=n.split("/").filter(Boolean).slice(1);i.includes(o[0])&&o.shift();const l=o.length?`/${o.join("/")}`:"";return`https://www.eneba.com/bro-packs${(e=>e!==a.Xn&&i.includes(e)?`/${e}`:"")(s)}${l}${r}`}},19420(e,s,t){var a=t(22722);function n(e){return a.createElement("svg",e,a.createElement("path",{d:"M1335.49 -102.331L1370.99 439.468C1371.41 445.923 1362.56 448.142 1359.89 442.251L1078.24 -178.588C1075.3 -185.079 1065.51 -181.596 1067.32 -174.704L1299.39 705.974C1301.14 712.631 1291.92 716.277 1288.65 710.219L902.201 -5.54653C899.084 -11.32 890.283 -8.31768 891.344 -1.84284L969.119 472.666C970.094 478.617 962.483 481.936 958.785 477.172L730.523 183.096C727.196 178.81 720.333 181.01 720.117 186.431L708.933 467.823C708.764 472.073 704.239 474.71 700.458 472.762L448.202 342.773C445.233 341.243 441.588 342.523 440.227 345.573L339.948 570.344C338.843 572.819 336.175 574.204 333.515 573.681L97.1311 527.214",stroke:"#FDEB96",strokeWidth:"193.389",strokeLinecap:"round"}))}n.defaultProps={width:"589",height:"326",viewBox:"340 0 589 326",fill:"none",preserveAspectRatio:"none"},e.exports=n,n.default=n}}]);