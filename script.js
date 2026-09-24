gsap.registerPlugin(ScrollTrigger);

// CURSOR
const cur=document.getElementById('cur'),cur2=document.getElementById('cur2');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function f(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;cur2.style.left=rx+'px';cur2.style.top=ry+'px';requestAnimationFrame(f);})();
document.querySelectorAll('a,button,.feat-card,.gal-item,.svc-card,.val-card,.p6-card,.cat-tab,.nav-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>cur2.classList.add('h'));
  el.addEventListener('mouseleave',()=>cur2.classList.remove('h'));
});

// LOADER
window.addEventListener("error",function(e){console.warn("SBB Error:",e.message);});
function initLoader(){
  const loader=document.getElementById('loader');
  const fill=document.getElementById('ldFill');
  const num=document.getElementById('ldNum');
  const txt=document.getElementById('ldTxt');
  const sub=document.getElementById('ldSub');
  const bar=document.getElementById('ldBar');
  const panels=document.querySelectorAll('.ld-panel');
  let p=0;
  gsap.to(txt,{y:0,duration:1,ease:'expo.out',delay:.2});
  gsap.to([sub,bar,num],{opacity:1,stagger:.12,duration:.6,delay:.55});
  const iv=setInterval(()=>{
    p+=Math.random()*7+2;
    if(p>=100){p=100;clearInterval(iv);}
    num.textContent=String(Math.floor(p)).padStart(3,'0');
    fill.style.width=p+'%';
    if(p>=100){setTimeout(()=>{
      gsap.to(panels,{scaleY:1,transformOrigin:'top',duration:.65,stagger:.06,ease:'power4.in',onComplete:()=>{
        loader.style.display='none';document.body.classList.remove('is-loading');
        introAnim();
      }});
    },400);}
  },55);
}

// INTRO
function introAnim(){
  const nav=document.getElementById('nav');
  const eye=document.querySelector('.hero-eye-in');
  const words=document.querySelectorAll('.hw');
  const sub=document.querySelector('.hero-sub');
  const btns=document.querySelector('.hero-btns');
  const meta=document.getElementById('hMeta');
  const scroll=document.getElementById('hScroll');
  const wa=document.getElementById('wa');
  const tl=gsap.timeline({defaults:{ease:'expo.out'}});
  tl.to(nav,{opacity:1,duration:.8},0)
    .to(eye,{y:0,duration:.9},.15)
    .to(words,{y:0,stagger:.07,duration:1.1},.3)
    .to(sub,{opacity:1,y:0,duration:.9},.9)
    .to(btns,{opacity:1,y:0,duration:.8},1.05)
    .to(meta,{opacity:1,duration:.8},1.1)
    .to(scroll,{opacity:1,duration:.8},1.2)
    .to(wa,{opacity:1,duration:.6},1.4);
  initScrollAnims();
}

// NAV
window.addEventListener('scroll',()=>{document.getElementById('nav').classList.toggle('sc',window.scrollY>60);},{passive:true});

// HERO PARALLAX
gsap.to('.hero-bg',{yPercent:22,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});

// SCROLL ANIMS
function initScrollAnims(){
  document.querySelectorAll('.sr').forEach(el=>{
    ScrollTrigger.create({trigger:el,start:'top 88%',onEnter:()=>el.classList.add('vis'),once:true});
  });
  document.querySelectorAll('.about-body').forEach(el=>{
    gsap.to(el,{opacity:1,y:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}});
  });
  document.querySelectorAll('.stat-card').forEach((c,i)=>{
    gsap.to(c,{opacity:1,y:0,delay:i*.1,duration:.9,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 88%',once:true,onEnter:()=>c.classList.add('vis')}});
  });
  document.querySelectorAll('.feat-card').forEach((c,i)=>{
    gsap.to(c,{opacity:1,y:0,delay:i*.12,duration:1,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 90%',once:true}});
  });
  document.querySelectorAll('.svc-card').forEach((c,i)=>{
    gsap.to(c,{opacity:1,y:0,delay:i*.08,duration:.9,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 90%',once:true}});
  });
  document.querySelectorAll('.proc-step').forEach((c,i)=>{
    gsap.to(c,{opacity:1,y:0,delay:i*.1,duration:.85,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 88%',once:true,onEnter:()=>setTimeout(()=>c.classList.add('vis'),i*100)}});
  });
  gsap.to('.testi-text',{opacity:1,y:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.testi-text',start:'top 82%',once:true}});
  // Counters
  document.querySelectorAll('.ctr').forEach(el=>{
    const target=parseInt(el.dataset.t);
    ScrollTrigger.create({trigger:el,start:'top 85%',once:true,onEnter:()=>{
      gsap.to({v:0},{v:target,duration:2.2,ease:'power2.out',onUpdate:function(){el.textContent=Math.floor(this.targets()[0].v);},onComplete:()=>{el.textContent=target;}});
    }});
  });
}

// PAGE NAV
function go(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const t=document.getElementById('page-'+page);
  if(!t)return;
  t.classList.add('active');
  window.scrollTo(0,0);
  setTimeout(()=>{
    // SR elements
    t.querySelectorAll('.sr').forEach(el=>{
      el.classList.remove('vis');
      ScrollTrigger.create({trigger:el,start:'top 88%',onEnter:()=>el.classList.add('vis'),once:true});
    });
    // Gallery items
    t.querySelectorAll('.gal-item,.val-card,.p6-card,.svc-card,.proc-step').forEach((c,i)=>{
      c.style.opacity='0';c.style.transform='translateY(28px)';
      gsap.to(c,{opacity:1,y:0,delay:(i%4)*.09,duration:.85,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 92%',once:true}});
    });
    t.querySelectorAll('.stat-card').forEach((c,i)=>{
      c.style.opacity='0';c.style.transform='translateY(28px)';
      gsap.to(c,{opacity:1,y:0,delay:i*.1,duration:.9,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 88%',once:true,onEnter:()=>c.classList.add('vis')}});
    });
    // Contact map
    const mw=t.querySelector('.map-wrap');
    if(mw){
      setTimeout(()=>{gsap.to(mw,{clipPath:'inset(0% 0 0 0)',duration:1.4,ease:'expo.out'});},200);
      t.querySelectorAll('.ci,.c-cta').forEach((el,i)=>{
        gsap.to(el,{opacity:1,y:0,delay:i*.12,duration:.8,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}});
      });
    }
    // About body
    t.querySelectorAll('.about-body').forEach(el=>{
      el.style.opacity='0';el.style.transform='translateY(28px)';
      gsap.to(el,{opacity:1,y:0,duration:1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}});
    });
  },50);
}

// MENU
let mo=false;
function tm(){mo=!mo;document.getElementById('menu').classList.toggle('open',mo);const btn=document.getElementById('menuBtn');btn.classList.toggle('open',mo);btn.setAttribute('aria-expanded',mo);document.body.style.overflow=mo?'hidden':'';}
function cm(){mo=false;document.getElementById('menu').classList.remove('open');const btn=document.getElementById('menuBtn');btn.classList.remove('open');btn.setAttribute('aria-expanded','false');document.body.style.overflow='';}

// MAGNETIC
document.querySelectorAll('.btn-gold,.btn-dark,.c-cta').forEach(btn=>{
  btn.addEventListener('mousemove',function(e){
    const r=this.getBoundingClientRect();
    gsap.to(this,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.25,duration:.4,ease:'power2.out'});
  });
  btn.addEventListener('mouseleave',function(){gsap.to(this,{x:0,y:0,duration:.6,ease:'elastic.out(1,.5)'});});
});

// CAT TABS
document.querySelectorAll('.cat-tab').forEach(tab=>{
  tab.addEventListener('click',function(){
    this.closest('.proj-cats').querySelectorAll('.cat-tab').forEach(t=>t.classList.remove('active'));
    this.classList.add('active');
  });
});


// Keyboard navigation for menu links
document.querySelectorAll('.menu-link').forEach((link,i,arr)=>{
  link.setAttribute('tabindex','-1');
  link.addEventListener('keydown',e=>{
    if(e.key==='ArrowDown') arr[(i+1)%arr.length].focus();
    if(e.key==='ArrowUp') arr[(i-1+arr.length)%arr.length].focus();
    if(e.key==='Escape') cm();
  });
});
// Keyboard support for cat-tabs
document.querySelectorAll('.cat-tab').forEach(tab=>{
  tab.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tab.click();}});
});
// Close menu on Escape
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mo) cm();});
initLoader();