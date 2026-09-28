const COURSES=[
{id:'web',n:'Web Development',i:'💻',w:'12 weeks',p:'₦45,000',d:'Build modern, responsive websites from scratch.',l:['HTML and CSS','JavaScript','Responsive layouts','Deploy your portfolio']},
{id:'design',n:'Graphic Design',i:'🎨',w:'8 weeks',p:'₦30,000',d:'Create logos, posters and social media graphics.',l:['Design principles','Colour and typography','Logo design','Client-ready files']},
{id:'data',n:'Data Analysis',i:'📊',w:'10 weeks',p:'₦38,000',d:'Turn raw data into clear answers with Excel and SQL.',l:['Excel formulas','Cleaning data','SQL basics','Charts and reports']},
{id:'mkt',n:'Digital Marketing',i:'📣',w:'6 weeks',p:'₦25,000',d:'Grow a business online with social media, SEO and email.',l:['Social media plans','SEO basics','Paid ads','Email campaigns']}];
const NAV={
web:[['home','Home'],['about','About'],['courses','Courses'],['coursedetails','Course Details'],['contact','Contact'],['register','Register'],['login','Login']],
learner:[['dashboard','Dashboard'],['mycourses','My Courses'],['coursedetails','Course Details'],['learning','Learning Page'],['certificates','Certificates'],['profile','Profile'],['messages','Messages'],['settings','Settings']],
admin:[['dashboard','Dashboard'],['users','Users'],['courses','Courses'],['enrollments','Enrollments'],['transactions','Transactions'],['reports','Reports'],['settings','Settings']]};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
let area='web',page='home',adminIn=false;
function cards(){ $$('[data-courses]').forEach(g=>g.innerHTML=COURSES.map(c=>`<div class="card click" tabindex="0" role="link" data-course="${c.id}"><div class="ic">${c.i}</div><h3>${c.n}</h3><p>${c.d}</p><span class="tag">${c.w}</span></div>`).join(''));
 $$('[data-mycourses]').forEach(g=>g.innerHTML=COURSES.slice(0,3).map((c,k)=>`<div class="card click" data-go="learner:coursedetails"><div class="ic">${c.i}</div><h3>${c.n}</h3><div class="bar"><i style="width:${[58,72,55][k]}%"></i></div><p>${[58,72,55][k]}% complete</p></div>`).join(''));
 $('#ct').innerHTML+=COURSES.map(c=>`<tr><td>${c.n}</td><td>${c.p}</td><td>${c.w}</td></tr>`).join('');}
function showCourse(id){const c=COURSES.find(x=>x.id===id);$('#cd-tag').textContent=c.w;$('#cd-title').textContent=c.n;$('#cd-desc').textContent=c.d;$('#cd-list').innerHTML=c.l.map(x=>`<li>${x}</li>`).join('');$('#cd-price').textContent=c.p;$('#cd-meta').textContent='Certificate included · Learn at your own pace';go('web','coursedetails');}
function go(a,p){area=a;page=p;if(a==='admin'&&!adminIn&&p!=='login'){p=page='login'}
 const login=a==='admin'&&p==='login';
 $('#web').style.display=a==='web'?'block':'none';
 $('#learner').classList.toggle('on',a==='learner');
 $('#admin').classList.toggle('on',a==='admin'&&!login);
 $('#adminlogin').style.display=login?'block':'none';
 $$('.pg').forEach(s=>s.classList.remove('on'));
 const id=login?'admin-login':a+'-'+p;$('#'+id).classList.add('on');
 $$('.areas button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.area===a));
 const items=NAV[a];
 const link=(x)=>`<a data-go="${a}:${x[0]}" class="${x[0]===p?'on':''}">${x[1]}</a>`;
 $('#mainnav').innerHTML=a==='web'?items.map(link).join(''):'';
 $('#mainnav').style.display=a==='web'?'flex':'none';
 if(a!=='web')$('#'+a+'-side').innerHTML=items.map(link).join('');
 if(a==='admin'&&!login)$('#admin-side').insertAdjacentHTML('beforeend','<a data-logout>Log out</a>');
 window.scrollTo(0,0);}
function toast(t){const e=$('#toast');e.textContent=t;e.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display='none',2200)}
document.addEventListener('click',e=>{
 const c=e.target.closest('[data-course]');if(c){showCourse(c.dataset.course);return}
 const g=e.target.closest('[data-go]');if(g){e.preventDefault();const[a,p]=g.dataset.go.split(':');go(a,p);}
 const t=e.target.closest('a[data-toast]');if(t)toast(t.dataset.toast);
 if(e.target.closest('[data-logout]')){adminIn=false;go('admin','login')}
 const b=e.target.closest('[data-area]');if(b){const a=b.dataset.area;go(a,a==='web'?'home':'dashboard')}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'){const c=e.target.closest&&e.target.closest('[data-course]');if(c)showCourse(c.dataset.course)}});
document.addEventListener('submit',e=>{e.preventDefault();const f=e.target;if(f.dataset.toast)toast(f.dataset.toast);
 if(f.dataset.goSubmit){const[a,p]=f.dataset.goSubmit.split(':');if(a==='admin')adminIn=true;go(a,p)}});
cards();go('web','home');
