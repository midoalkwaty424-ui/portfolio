(function(){
var root=document.documentElement,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
// theme toggle
try{var t=localStorage.getItem("th");if(t)root.setAttribute("data-theme",t)}catch(e){}
document.getElementById("th").onclick=function(){var dark=root.getAttribute("data-theme")?root.getAttribute("data-theme")==="dark":matchMedia("(prefers-color-scheme:dark)").matches;var n=dark?"light":"dark";root.setAttribute("data-theme",n);try{localStorage.setItem("th",n)}catch(e){}};
// scroll progress
var bar=document.getElementById("bar");
addEventListener("scroll",function(){var h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"},{passive:true});
// cursor glow
var g=document.getElementById("glow");
addEventListener("pointermove",function(e){g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
// typing
var words=window.__words=["Junior Legal Advisor","Legal Associate","Business-minded Law Graduate","Front-End Learner"],wi=0,ci=0,del=false,el=document.getElementById("ty");
function type(){var w=words[wi];if(rm){el.textContent=w;return}
el.textContent=w.slice(0,ci);if(!del&&ci===w.length){del=true;return setTimeout(type,1500)}
if(del&&ci===0){del=false;wi=(wi+1)%words.length}
ci+=del?-1:1;setTimeout(type,del?40:80)}type();
// reveal + counters
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".rv").forEach(function(n,i){n.style.transitionDelay=(i%4)*90+"ms";io.observe(n)});
document.querySelectorAll("[data-n]").forEach(function(b){var n=+b.dataset.n,s=b.dataset.s||"",k=0;
function up(){k+=1;var t=k+s;if(document.documentElement.lang==="ar"){t=(window.__AR&&window.__AR[t])||String(k)}b.textContent=t;if(k<n)setTimeout(up,rm?0:350)}setTimeout(up,600)});
// 3D tilt
if(!window.VanillaTilt&&!rm&&matchMedia("(hover:hover)").matches)document.querySelectorAll(".card").forEach(function(c){
c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="perspective(800px) rotateY("+x*6+"deg) rotateX("+(-y*6)+"deg) translateY(-4px)"});
c.addEventListener("pointerleave",function(){c.style.transform=""})});
// particle network
var cv=document.getElementById("cv"),cx=cv.getContext("2d"),P=[],W,H;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;P=[];var n=Math.min(60,Math.floor(W*H/22000));for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35})}
function col(){return getComputedStyle(root).getPropertyValue("--gold").trim()||"#c8a45c"}
function draw(){cx.clearRect(0,0,W,H);var c=col();cx.fillStyle=c;cx.strokeStyle=c;
P.forEach(function(p,i){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
cx.globalAlpha=.5;cx.beginPath();cx.arc(p.x,p.y,1.8,0,6.28);cx.fill();
for(var j=i+1;j<P.length;j++){var q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<130){cx.globalAlpha=(1-d/130)*.22;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}});
if(!rm)requestAnimationFrame(draw)}
rs();draw();addEventListener("resize",rs);
})();
/* ---- v3 additions ---- */
(function(){
var rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
// loader
var ld=document.getElementById("ld");
function hide(){ld.classList.add("out");setTimeout(function(){ld.remove()},1000)}
setTimeout(hide,rm?0:1300);
// delay hero reveals until loader finishes
document.querySelectorAll(".hero .rv").forEach(function(n,i){n.style.transitionDelay=(rm?0:1.25+i*.14)+"s"});
// marquee
var items=["Egyptian Law","Legal Research","Contract Support","Compliance Mindset","Negotiation","Client Relations","B2B Sales","Edara ERP","HTML · CSS · JavaScript"];
var mt=document.getElementById("mt");mt.innerHTML=items.concat(items).map(function(t){return"<span>"+t+"</span>"}).join("");
// photo parallax
var pf=document.getElementById("pf"),hp=document.querySelector(".hp");
if(!rm&&matchMedia("(hover:hover)").matches){addEventListener("pointermove",function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;pf.style.transform="translate("+x*14+"px,"+y*14+"px) scale(1.04)";hp.querySelectorAll(".chip").forEach(function(c,i){c.style.marginLeft=(x*(i+1)*-14)+"px"})})}
// magnetic buttons
if(!rm)document.querySelectorAll(".btn").forEach(function(b){
b.addEventListener("pointermove",function(e){var r=b.getBoundingClientRect();b.style.transform="translate("+(e.clientX-r.left-r.width/2)*.2+"px,"+(e.clientY-r.top-r.height/2)*.3+"px)"});
b.addEventListener("pointerleave",function(){b.style.transform=""})});
// card spotlight
document.querySelectorAll(".card").forEach(function(c){c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-r.left)+"px");c.style.setProperty("--my",(e.clientY-r.top)+"px")})});
// active nav link
var links={};document.querySelectorAll("nav .l a").forEach(function(a){links[a.getAttribute("href").slice(1)]=a});
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){Object.keys(links).forEach(function(k){links[k].classList.toggle("on",k===e.target.id)})}})},{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("section[id]").forEach(function(s){so.observe(s)});
// back to top
var tt=document.createElement("button");tt.id="tt";tt.setAttribute("aria-label","Back to top");tt.textContent="↑";document.body.appendChild(tt);
tt.onclick=function(){scrollTo({top:0})};
addEventListener("scroll",function(){tt.classList.toggle("on",scrollY>700)},{passive:true});
})();

/* ---- v4 ---- */
document.querySelectorAll(".btn").forEach(function(b){if(!b.querySelector(".ar")){var s=document.createElement("span");s.className="ar";s.textContent=b.href&&b.href.indexOf("mailto")===0?"✉":"↗";b.appendChild(s)}});

/* ---- v5: libraries (GSAP, ScrollTrigger, vanilla-tilt) ---- */
(function(){
var rm=matchMedia("(prefers-reduced-motion:reduce)").matches,hv=matchMedia("(hover:hover)").matches;
document.querySelectorAll("[data-dl] .ar").forEach(function(a){a.textContent="↓"});
document.addEventListener("transitionend",function(e){var t=e.target;if(e.propertyName==="transform"&&t.classList&&t.classList.contains("rv")&&t.classList.contains("in"))t.classList.add("done")});
if(window.VanillaTilt&&!rm&&hv)VanillaTilt.init(document.querySelectorAll(".card:not(#cf)"),{max:6,speed:400,glare:true,"max-glare":.14,scale:1.01});
if(!window.gsap||!window.ScrollTrigger||rm)return;
gsap.registerPlugin(ScrollTrigger);
gsap.to(".hg .ht",{y:-70,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:.6}});
gsap.fromTo(".tl",{"--p":0},{"--p":1,ease:"none",scrollTrigger:{trigger:".tl",start:"top 70%",end:"bottom 70%",scrub:.6}});
ScrollTrigger.batch(".tag",{start:"top 92%",once:true,onEnter:function(b){gsap.from(b,{opacity:0,scale:.6,y:14,stagger:.05,duration:.5,ease:"back.out(2)",clearProps:"transform,opacity"})}});
})();

/* ---- v6: header behavior ---- */
(function(){
var nav=document.getElementById("nav"),pill=document.getElementById("pill"),ind=document.getElementById("ind"),mb=document.getElementById("mb"),mm=document.getElementById("mm");
function to(a){if(!a){ind.style.opacity=0;return}ind.style.opacity=1;ind.style.width=a.offsetWidth+"px";ind.style.transform="translateX("+a.offsetLeft+"px)"}
function active(){to(pill.querySelector("a.on"))}
new MutationObserver(active).observe(pill,{attributes:true,subtree:true,attributeFilter:["class"]});
pill.querySelectorAll("a").forEach(function(a){a.addEventListener("mouseenter",function(){to(a)})});
pill.addEventListener("mouseleave",active);addEventListener("resize",active);
var last=0;addEventListener("scroll",function(){var y=scrollY;nav.classList.toggle("scrolled",y>20);nav.classList.toggle("hide",y>last&&y>320&&!mm.classList.contains("open"));last=y},{passive:true});
function menu(o){mm.classList.toggle("open",o);mb.classList.toggle("open",o);mb.setAttribute("aria-expanded",o);document.body.style.overflow=o?"hidden":""}
mb.onclick=function(){menu(!mm.classList.contains("open"))};
mm.querySelectorAll("a").forEach(function(a){a.onclick=function(){menu(false)}});
addEventListener("keydown",function(e){if(e.key==="Escape")menu(false)});
})();

/* ---- v7: contact, toast, cursor ---- */
(function(){
var rm=matchMedia("(prefers-reduced-motion:reduce)").matches,hv=matchMedia("(hover:hover)").matches;
var t=document.createElement("div");t.id="toast";document.body.appendChild(t);var tm;
function toast(m){t.textContent=m;t.classList.add("on");clearTimeout(tm);tm=setTimeout(function(){t.classList.remove("on")},2200)}
document.querySelectorAll("[data-copy]").forEach(function(b){b.onclick=function(){var v=b.dataset.copy;
try{navigator.clipboard.writeText(v).then(function(){toast(document.documentElement.lang==="ar"?"تم نسخ البريد ✓":"Email copied ✓")},function(){location.href="mailto:"+v})}catch(e){location.href="mailto:"+v}}});
var f=document.getElementById("cf");
f.addEventListener("submit",function(e){e.preventDefault();var n=document.getElementById("fn").value,m=document.getElementById("fe").value,b=document.getElementById("fm").value;
location.href="mailto:Midoalkwaty424@gmail.com?subject="+encodeURIComponent("Portfolio inquiry from "+n)+"&body="+encodeURIComponent(b+"\n\n"+n+"\n"+m);toast(document.documentElement.lang==="ar"?"جارٍ فتح تطبيق البريد…":"Opening your email app…")});
if(rm||!hv)return;
var d=document.createElement("div"),r=document.createElement("div");d.id="cd";r.id="cr";document.body.appendChild(r);document.body.appendChild(d);
var x=0,y=0,rx=0,ry=0;
addEventListener("pointermove",function(e){x=e.clientX;y=e.clientY;d.style.opacity=r.style.opacity=1});
document.addEventListener("pointerleave",function(){d.style.opacity=r.style.opacity=0});
document.addEventListener("pointerover",function(e){r.classList.toggle("big",!!e.target.closest("a,button,.card,.tag"))});
(function lp(){rx+=(x-rx)*.18;ry+=(y-ry)*.18;d.style.transform="translate("+x+"px,"+y+"px)";r.style.transform="translate("+rx+"px,"+ry+"px)";requestAnimationFrame(lp)})();
})();

/* ---- v8: EN / Arabic ---- */
(function(){
var AR={"Skip to content":"تخطَّ إلى المحتوى","⚖ LL.B.":"⚖ ليسانس الحقوق","About": "نبذة", "Focus": "التركيز", "Experience": "الخبرات", "Projects": "المشاريع", "Skills": "المهارات", "Education": "التعليم", "Contact": "تواصل", "Hire me": "وظّفني", "Law Graduate · Cairo, Egypt": "خريج حقوق · القاهرة، مصر", "Mohamed Mahmoud": "محمد محمود", "Abd Allah": "عبد الله", "I’m a": "أنا", "Law graduate who blends legal knowledge with real commercial, ERP and front-end development experience.": "خريج حقوق يجمع بين المعرفة القانونية وخبرة عملية تجارية وفي أنظمة ERP وتطوير الواجهات الأمامية.", "Get in touch": "تواصل معي", "View my work": "شاهد أعمالي", "Download CV": "تحميل السيرة الذاتية", "2 yrs": "سنتان", "3 tech": "3 تقنيات", "Commercial experience": "خبرة تجارية", "LL.B.": "ليسانس الحقوق", "Helwan University, 2025": "جامعة حلوان، 2025", "ERP experience": "خبرة في أنظمة ERP", "Egyptian Law": "القانون المصري", "Legal Research": "البحث القانوني", "Contract Support": "دعم العقود", "Compliance Mindset": "عقلية الامتثال", "Negotiation": "التفاوض", "Client Relations": "علاقات العملاء", "B2B Sales": "مبيعات B2B", "Law meets business": "القانون يلتقي بالأعمال", "After two years in B2B sales and operations, I understand how companies really run: invoices, client accounts, inventory and negotiation. Now I’m building a career in corporate law, supporting contract review, legal documentation and compliance with accuracy and care.": "بعد سنتين في مبيعات B2B والعمليات، أفهم كيف تعمل الشركات فعلياً: الفواتير وحسابات العملاء والمخزون والتفاوض. وأبني الآن مسيرتي في قانون الشركات، لدعم مراجعة العقود والتوثيق القانوني والامتثال بدقة وعناية.", "Focus areas": "مجالات التركيز", "How I can help": "كيف أستطيع المساعدة", "Contract & Document Support": "دعم العقود والمستندات", "Supporting contract review and legal documentation with accuracy and attention to detail.": "دعم مراجعة العقود والتوثيق القانوني بدقة واهتمام بالتفاصيل.", "Researching Egyptian law and presenting findings in a clear, well-structured way.": "البحث في القانون المصري وعرض النتائج بشكل واضح ومنظم.", "Client Communication": "التواصل مع العملاء", "Two years of negotiating with and maintaining relationships with B2B clients.": "سنتان من التفاوض وبناء علاقات مستمرة مع عملاء B2B.", "Business & Tech Awareness": "وعي بالأعمال والتقنية", "Comfortable with ERP systems and digital workflows, with a growing front-end skill set.": "متمكن من أنظمة ERP وسير العمل الرقمي، مع مهارات متنامية في تطوير الواجهات الأمامية.", "Where I’ve worked": "أين عملت", "Sales & Operations Support Representative": "ممثل مبيعات ودعم عمليات", "General Company, Cairo · Importer of mobile phone spare parts · 2 years": "شركة جنرال، القاهرة · مستورد قطع غيار الهواتف المحمولة · سنتان", "Managed B2B sales to individual retailers and built long-term client relationships through negotiation.": "إدارة مبيعات B2B لتجار التجزئة الأفراد وبناء علاقات طويلة الأمد مع العملاء عبر التفاوض.", "Issued customer invoices and kept accurate billing records using the Edara ERP system.": "إصدار فواتير العملاء والاحتفاظ بسجلات فوترة دقيقة باستخدام نظام Edara ERP.", "Monitored customer accounts and balances to keep financial records current.": "متابعة حسابات العملاء وأرصدتهم للحفاظ على السجلات المالية محدّثة.", "Tracked warehouse inventory and coordinated between sales and warehouse teams.": "متابعة مخزون المستودع والتنسيق بين فريقي المبيعات والمستودع.", "Invoicing": "الفوترة", "Inventory": "المخزون", "Customer Service Trainee": "متدرب خدمة عملاء", "Vodafone Egypt, Cairo · 2-week training program": "فودافون مصر، القاهرة · برنامج تدريبي لمدة أسبوعين", "Completed intensive training in inquiry handling, complaint resolution and professional communication.": "إتمام تدريب مكثف في التعامل مع الاستفسارات وحل الشكاوى والتواصل المهني.", "Selected work": "أعمال مختارة", "IN PROGRESS": "قيد التنفيذ", "Footwear e-commerce website · Arabic (RTL) · HTML, CSS, JavaScript": "موقع تجارة إلكترونية للأحذية · واجهة عربية (RTL) · HTML وCSS وJavaScript", "A bold, dark-themed online sneaker store with an Arabic-first interface and a product-led hero section.": "متجر أحذية رياضية إلكتروني بتصميم داكن جريء وواجهة عربية أولاً وقسم رئيسي يركّز على المنتج.", "Header with cart counter, wishlist and product search.": "شريط علوي يضم عدّاد السلة والمفضلة والبحث عن المنتجات.", "“Picks for you” product cards with prices in EGP.": "بطاقات منتجات «اختياراتنا ليك» مع الأسعار بالجنيه المصري.", "Full navigation: brands, styles, featured, all products, blog, support and contact.": "تنقل كامل: الماركات والستايلات والمختارة وكل المنتجات والمدونة والمساعدة والتواصل.", "RTL / Arabic UI": "واجهة عربية RTL", "More projects coming soon.": "المزيد من المشاريع قريباً.", "What I bring": "ما أقدّمه", "Legal & Business": "القانون والأعمال", "Technical": "التقنية", "Soft Skills": "المهارات الشخصية", "Legal Documentation": "التوثيق القانوني", "Account Management": "إدارة الحسابات", "Microsoft Office": "مايكروسوفت أوفيس", "Communication": "التواصل", "Teamwork": "العمل الجماعي", "Problem Solving": "حل المشكلات", "Works Under Pressure": "العمل تحت الضغط", "Quick Learner": "سرعة التعلّم", "Background": "الخلفية", "Bachelor of Law (LL.B.)": "بكالوريوس الحقوق (ليسانس)", "Faculty of Law, Helwan University · 2025 · Grade: Good": "كلية الحقوق، جامعة حلوان · 2025 · التقدير: جيد", "Languages": "اللغات", "Arabic: Native": "العربية: لغة أم", "English: Good (conversational and professional writing)": "الإنجليزية: جيد (محادثة وكتابة مهنية)", "Let’s work together": "لنعمل معاً", "Open to Junior Legal Advisor and Legal Associate opportunities in Cairo.": "متاح لفرص مستشار قانوني مبتدئ ومساعد قانوني في القاهرة.", "Email": "البريد الإلكتروني", "Click to copy": "اضغط للنسخ", "Phone": "الهاتف", "Tap to call": "اضغط للاتصال", "View profile": "عرض الملف", "Location": "الموقع", "Cairo, Egypt": "القاهرة، مصر", "Send a message": "أرسل رسالة", "Name": "الاسم", "Message": "الرسالة", "Send message": "إرسال الرسالة", "Opens your email app with the message ready to send.": "يفتح تطبيق البريد لديك والرسالة جاهزة للإرسال.", "Junior Legal Advisor · Cairo, Egypt": "مستشار قانوني مبتدئ · القاهرة، مصر", "© 2026 Mohamed Mahmoud Abd Allah. All rights reserved.": "© 2026 محمد محمود عبد الله. جميع الحقوق محفوظة."};
var W={en:["Junior Legal Advisor","Legal Associate","Business-minded Law Graduate","Front-End Learner"],ar:["مستشار قانوني مبتدئ","مساعد قانوني","خريج حقوق بعقلية تجارية","متعلم تطوير واجهات"]};
window.__AR=AR;var lg=document.getElementById("lg"),root=document.documentElement;
function nodes(){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;return(!n.nodeValue.trim()||p.nodeName==="SCRIPT"||p.nodeName==="STYLE"||p.id==="ty"||p.id==="lg")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),a=[],n;while(n=w.nextNode())a.push(n);return a}
function apply(l){var ar=l==="ar";root.lang=l;root.dir=ar?"rtl":"ltr";
nodes().forEach(function(n){if(n.__en===undefined){var k=n.nodeValue.trim();if(AR[k]===undefined)return;n.__en=n.nodeValue;n.__ar=n.nodeValue.replace(k,AR[k])}n.nodeValue=ar?n.__ar:n.__en});
document.querySelectorAll("[data-n]").forEach(function(b){var t=b.dataset.n+(b.dataset.s||"");b.textContent=ar?(AR[t]||b.dataset.n):t});
if(window.__words){var s=W[l];window.__words.splice(0,window.__words.length,s[0],s[1],s[2],s[3])}
lg.textContent=ar?"EN":"عربي";document.title=ar?"محمد محمود | مستشار قانوني مبتدئ":"Mohamed Mahmoud | Junior Legal Advisor";
try{localStorage.setItem("lang",l)}catch(e){}}
lg.onclick=function(){apply(root.lang==="ar"?"en":"ar")};
var s=null;try{s=localStorage.getItem("lang")}catch(e){}
if(!s&&/^ar/i.test(navigator.language||""))s="ar";
if(s==="ar")apply("ar");
})();
