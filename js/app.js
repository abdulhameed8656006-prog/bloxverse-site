
const $=s=>document.querySelector(s);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const show=id=>{document.querySelectorAll('.scr').forEach(e=>e.classList.toggle('on',e.id===id))};
let user=null,coins=0,mode='in';
const users=()=>{try{return JSON.parse(localStorage.getItem('bvu')||'{}')}catch(e){return {}}};
async function hash(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('bv:'+s));return Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')}
const MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
(function(){const Y=new Date().getFullYear();$('#bm').innerHTML='<option value="">Month</option>'+MN.map((m,i)=>'<option value="'+(i+1)+'">'+m+'</option>').join('');let d='<option value="">Day</option>';for(let i=1;i<=31;i++)d+='<option>'+i+'</option>';$('#bd').innerHTML=d;let y='<option value="">Year</option>';for(let i=Y;i>=Y-100;i--)y+='<option>'+i+'</option>';$('#by').innerHTML=y})();
function nameErr(n){if(n.length<3||n.length>20)return 'Username must be 3 to 20 characters.';if(!/^[A-Za-z0-9_]+$/.test(n))return 'Usernames can only use letters, numbers and one underscore. No spaces.';if((n.match(/_/g)||[]).length>1)return 'Usernames can have only one underscore.';if(n[0]==='_'||n[n.length-1]==='_')return 'Usernames cannot start or end with an underscore.';return ''}
function passErr(p,n){if(p.length<8)return 'Password must be at least 8 characters.';if(!/[A-Za-z]/.test(p)||!/[0-9]/.test(p))return 'Password needs at least one letter and one number.';if(p.toLowerCase().indexOf(n.toLowerCase())>=0)return 'Password cannot contain your username.';return ''}
function bdate(){const m=+$('#bm').value,d=+$('#bd').value,y=+$('#by').value;if(!m||!d||!y)return null;const t=new Date(y,m-1,d);if(t.getMonth()!==m-1||t>new Date())return null;return t}
function u13(){const b=bdate(),n=new Date();let a=n.getFullYear()-b.getFullYear();if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate()))a--;return a<13}
function tab(m){mode=m;$('#tl').classList.toggle('on',m==='in');$('#ts2').classList.toggle('on',m==='up');$('#p2w').style.display=m==='up'?'block':'none';$('#go').textContent=m==='in'?'Log in':'Sign up';$('#er').textContent=''}
$('#tl').onclick=()=>tab('in');$('#ts2').onclick=()=>tab('up');
$('#go').onclick=async()=>{
 const n=$('#u').value.trim(),p=$('#p').value,er=$('#er'),all=users(),k=n.toLowerCase();
 if(mode==='up'){const bad=nameErr(n)||passErr(p,n);if(bad)return er.textContent=bad;if(!bdate())return er.textContent='Please choose your birthday.';if(!$('#tc').checked)return er.textContent='Please agree to the Terms to continue.';if(u13()&&!confirm('Players under 13 need a parent or guardian to agree. Is a parent or guardian helping you sign up?'))return er.textContent='Ask a parent or guardian to help you sign up.'}
 else if(!n||!p)return er.textContent='Enter your username and password.';
 
 const h=await hash(k+':'+p);
 if(mode==='up'){if(p!==$('#p2').value)return er.textContent='Passwords do not match.';if(all[k])return er.textContent='That username is taken. Try another.';all[k]=h;try{localStorage.setItem('bvu',JSON.stringify(all));const ag=JSON.parse(localStorage.getItem('bva')||'{}');ag[k]=u13()?1:0;localStorage.setItem('bva',JSON.stringify(ag))}catch(e){return er.textContent='This browser blocked saving. Turn off private mode.'}}
 else if(all[k]!==h)return er.textContent='Wrong username or password.';
 try{localStorage.setItem('bvs',n)}catch(e){}
 enter(n)};
function enter(n){user=n;try{coins=+localStorage.getItem('bvc_'+n.toLowerCase())||0}catch(e){coins=0}
 let ag={};try{ag=JSON.parse(localStorage.getItem('bva')||'{}')}catch(e){}$('#hi').textContent='Welcome, '+n+(ag[n.toLowerCase()]?' (under 13 account)':'');setC(coins);$('#p').value=$('#p2').value='';openHome()}
function setC(n){coins=n;$('#hc').textContent=n;try{localStorage.setItem('bvc_'+user.toLowerCase(),n)}catch(e){}}
$('#lo').onclick=()=>{try{localStorage.removeItem('bvs')}catch(e){}user=null;show('auth')};
let AV=null,fr=[],stat=null,view='home',WIKI=null,pv=null,dq='',dg='All',ds='pop',inv=[],mg=Object.create(null),ST={played:{}},joined=[];
const SKINS=[0xffd23c,0xf5cba7,0xe0ac69,0xc68642,0x8d5524,0x5c3a21],SHIRTS=[0x335fff,0xe8453c,0x2fb35a,0xffc928,0xa24cf0,0xff8a2b,0x222222,0xff7aa8],PANTS=[0x2a8f4a,0x222222,0x335fff,0x6b3e1f,0xe8453c,0xffffff,0x888888,0xa24cf0],HAIRC=[0x222222,0x6b3e1f,0xd9a441,0xe8453c,0xffffff,0x3a6ff0],DEF={skin:1,shirt:0,pants:0,hair:1,hc:0,hat:0,back:0,face:0};
const NAMES={hair:['None','Short','Spiky','Long','Afro'],hat:['None','Cap','Crown','Wizard','Beanie'],back:['None','Backpack','Cape'],face:['Smile','Cool','Happy','Grumpy']};
const hex=c=>'#'+('000000'+c.toString(16)).slice(-6),rnd=n=>Math.floor(Math.random()*n);
const rcfg=()=>({skin:rnd(6),shirt:rnd(8),pants:rnd(8),hair:rnd(5),hc:rnd(6),hat:Math.random()<.3?1+rnd(4):0,back:Math.random()<.2?1+rnd(2):0,face:rnd(4)});
fetch('data/wiki.json').then(r=>r.json()).then(j=>{WIKI=j;fillWk()}).catch(()=>{});
function fillWk(){const w=$('.wk');if(w&&WIKI&&WIKI.roblox)w.textContent=WIKI.roblox.extract}
function detail(id){const g=gi(id),w=WIKI&&WIKI[id],md=$('#md');
 md.innerHTML='<div class="mb"><img class="lg2" src="icons/games/'+id+'.svg" alt=""><h2>'+g[1]+'</h2><p>'+g[4]+'</p>'+(w?'<h3>About: '+w.title+'</h3><p class="wx"></p><small class="hint"><a href="'+w.url+'" target="_blank" rel="noopener">Read more on Wikipedia</a>. Text from Wikipedia, CC BY-SA 4.0.</small>':'')+'<div class="mbb"><button class="btn" id="mp">Play</button><button class="sm" id="mc">Close</button></div></div>';
 if(w)md.querySelector('.wx').textContent=w.extract;md.classList.add('on');
 $('#mp').onclick=()=>{md.classList.remove('on');play(id)};$('#mc').onclick=()=>md.classList.remove('on')}
function killPv(){if(pv){cancelAnimationFrame(pv.raf);pv.r.dispose();pv=null}}
function preview(){killPv();const cv=$('#pvc');if(!cv||!window.THREE)return;let r;try{r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){return}
 r.setSize(240,300,false);const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(35,.8,.1,100),dl=new THREE.DirectionalLight(0xffffff,.5);dl.position.set(3,10,8);c.position.set(0,4.2,17);c.lookAt(0,3.2,0);s.add(new THREE.HemisphereLight(0xffffff,0x778899,1),dl);
 const a=avatar(AV,user);a.remove(a.children[a.children.length-1]);s.add(a);pv={r:r,raf:0};const t0=performance.now();
 (function f(){pv.raf=requestAnimationFrame(f);a.rotation.y=.5+Math.sin((performance.now()-t0)/900)*.7;r.render(s,c)})()}

const GL=[['obby','Obby World','&#x1F9F1;','#d9573b','Hard tower with moving platforms','Obby',48,94],['pets','Pet Paradise','&#x1F43E;','#e07aa8','Hatch eggs, collect pets','Pets',62,96],['haunted','Haunted Halls','&#x1F6AA;','#4a3b6b','Find 5 keys, escape the ghost','Horror',35,95],['town','Neighborhood Life','&#x1F3E1;','#3d8f5a','Explore town, collect cash','Roleplay',85,92],['murder','Mystery Murder','&#x1F52A;','#5c3b3b','Survive 60 s from the murderer','Mystery',41,93],['fruit','Fruit Fighters','&#x1F34E;','#c0392b','Fight bandits with ATTACK','Fighting',57,91],['lava','Lava Rise','&#x1F30B;','#d4541f','Climb before the lava rises','Survival',29,90],['race','Speed Run','&#x1F3C1;','#2f8f9d','Race through gates and boost pads','Racing',22,89]];
const BOTS=[['Builder_1','&#x1F98A;'],['xX_Noob_Xx','&#x1F43C;'],['PetLover','&#x1F438;'],['SkyKing','&#x1F984;'],['DragonFan','&#x1F432;'],['PixelCat','&#x1F431;'],['Zara_Plays','&#x1F43B;'],['TowerPro','&#x1F985;']];
const ls=k=>{try{return localStorage.getItem(k)}catch(e){return null}},lk=k=>k+user.toLowerCase(),gi=id=>GL.find(g=>g[0]===id);
function loadU(){try{fr=JSON.parse(ls(lk('bvf_'))||'[]')}catch(e){fr=[]}try{AV=Object.assign({},DEF,JSON.parse(ls(lk('bvav_'))||'{}'))}catch(e){AV=Object.assign({},DEF)}try{inv=JSON.parse(ls(lk('bvinv_'))||'[]')}catch(e){inv=[]}try{mg=Object.assign(Object.create(null),JSON.parse(ls(lk('bvg_'))||'{}'))}catch(e){mg=Object.create(null)}try{ST=Object.assign({played:{}},JSON.parse(ls(lk('bvst_'))||'{}'))}catch(e){ST={played:{}}}try{joined=JSON.parse(ls(lk('bvgr_'))||'[]')}catch(e){joined=[]}if(!ST.joined){ST.joined=Date.now();saveST()}if(!stat){stat={};BOTS.forEach(b=>{stat[b[0]]={e:b[1],on:Math.random()<.65,g:Math.floor(Math.random()*GL.length)}})}}
function saveF(){try{localStorage.setItem(lk('bvf_'),JSON.stringify(fr))}catch(e){}}
function note(m){const e=$('#ht');e.textContent=m;e.style.display='block';clearTimeout(note.t);note.t=setTimeout(()=>e.style.display='none',2500)}
const gcard=g=>'<button class="gc" data-p="'+g[0]+'"><div class="t"><img src="icons/games/'+g[0]+'.svg" alt=""></div><b>'+g[1]+'</b><small>'+g[4]+'</small><small class="st">&#x1F44D; '+g[7]+'% &middot; &#x1F464; '+g[6]+'K</small></button>';
function fline(n,rm){const s=stat[n]||{e:'&#x1F9D1;',on:false};return '<div class="fl"><span class="e">'+s.e+'</span><div><b>'+n+'</b><small class="'+(s.on?'gn':'')+'">'+(s.on?'Online - '+GL[s.g][1]:'Offline')+'</small></div>'+(s.on?'<button class="sm" data-j="'+GL[s.g][0]+'" data-n="'+n+'">Join</button>':'')+(rm?'<button class="sm" data-rm="'+n+'">Remove</button>':'')+'</div>'}
const VW={
home(){const last=gi(ls(lk('bvl_'))||'obby')||GL[0],on=fr.filter(n=>stat[n]&&stat[n].on);return '<div class="wl"><div class="av2" style="background:'+hex(SHIRTS[AV.shirt])+'">&#x1F9D1;</div><div><h2>Hi, '+user+'!</h2><small class="hint">Pick a game and play with friends.</small></div></div>'+daily()+'<h3>Friends online</h3>'+(on.length?on.map(n=>fline(n)).join(''):'<p class="hint">No friends online. Open Friends to add some.</p>')+'<h3>Continue</h3><div class="row">'+gcard(last)+'</div><h3>Recommended</h3><div class="row">'+GL.map(gcard).join('')+'</div>'},
games(){return '<h3>All games</h3><div class="gr">'+GL.map(gcard).join('')+'</div><h3>About Roblox</h3><p class="hint wk"></p><small class="hint"><a href="https://en.wikipedia.org/wiki/Roblox" target="_blank" rel="noopener">Read more on Wikipedia</a>. Text from Wikipedia, CC BY-SA 4.0. BloxVerse is a fan project and is not affiliated with Roblox.</small>'},
friends(){const sug=BOTS.map(b=>b[0]).filter(n=>fr.indexOf(n)<0).slice(0,4);return '<h3>Friends ('+fr.length+')</h3>'+(fr.length?fr.map(n=>fline(n,1)).join(''):'<p class="hint">No friends yet.</p>')+'<h3>Add a friend</h3><div class="addf"><input id="fa" placeholder="Username" maxlength="20"><button class="btn" id="fb" style="width:auto;margin:0;padding:0 18px">Add</button></div><h3>People you may know</h3>'+sug.map(n=>'<div class="fl"><span class="e">'+stat[n].e+'</span><div><b>'+n+'</b></div><button class="sm" data-add="'+n+'">Add</button></div>').join('')},
avatar(){const op=(k,l,n,sw)=>'<h3>'+l+'</h3><div class="row chips">'+Array.from({length:n},(_,i)=>sw?'<div class="sw'+(AV[k]===i?' on':'')+'" data-k="'+k+'" data-o="'+i+'" style="background:'+hex(sw[i])+'"></div>':'<button class="sm'+(AV[k]===i?' sel':'')+'" data-k="'+k+'" data-o="'+i+'">'+NAMES[k][i]+(own(k,i)?'':' &#x1F512;')+'</button>').join('')+'</div>';
 return '<h3>Your avatar</h3><div class="avw"><canvas id="pvc" width="240" height="300"></canvas><div>'+op('skin','Skin tone',6,SKINS)+op('shirt','Shirt',8,SHIRTS)+op('pants','Pants',8,PANTS)+op('hair','Hair style',5)+op('hc','Hair colour',6,HAIRC)+op('hat','Hat',5)+op('back','Back item',3)+op('face','Face',4)+'<p class="hint">Locked items are sold in the Shop.</p></div></div>'}};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const GEN=['All','Obby','Roleplay','Horror','Mystery','Fighting','Pets','Survival','Racing'];
const PAID={hair2:40,hair3:40,hair4:80,hat1:30,hat2:200,hat3:120,hat4:50,back1:60,back2:150,face1:50,face2:20,face3:20};
const GR=[['Obby Masters','&#x1F9F1;',12400],['Pet Lovers','&#x1F43E;',9800],['Builders Club','&#x1F528;',15200],['Horror Fans','&#x1F47B;',7300],['Speed Racers','&#x1F3CE;',5600]];
const own=(k,i)=>!PAID[k+i]||inv.indexOf(k+i)>=0;
function saveST(){try{localStorage.setItem(lk('bvst_'),JSON.stringify(ST))}catch(e){}}
function bestT(t){if(!ST.best||t<ST.best){ST.best=t;saveST()}}
function daily(){const t=new Date().toDateString();return ls(lk('bvd_'))===t?'':'<div class="fl"><span class="e">&#x1F381;</span><div><b>Daily reward</b><small>Claim 50 free coins today</small></div><button class="sm sel" data-daily="1">Claim</button></div>'}
VW.discover=()=>{let L=GL.filter(g=>(dg==='All'||g[5]===dg)&&(!dq||g[1].toLowerCase().indexOf(dq.toLowerCase())>=0));L=L.slice().sort((a,b)=>ds==='pop'?b[6]-a[6]:b[7]-a[7]);
 return '<h3>Discover</h3><div class="row chips">'+GEN.map(x=>'<button class="sm'+(x===dg?' sel':'')+'" data-g="'+x+'">'+x+'</button>').join('')+'</div><div class="row chips"><button class="sm'+(ds==='pop'?' sel':'')+'" data-s="pop">Most players</button><button class="sm'+(ds==='top'?' sel':'')+'" data-s="top">Top rated</button></div>'+(dq?'<p class="hint">Results for "'+esc(dq)+'"</p>':'')+(L.length?'<div class="gr">'+L.map(gcard).join('')+'</div>':'<p class="hint">No games found.</p>')};
VW.shop=()=>{const cat={hair:'Hair',hat:'Hats',back:'Back items',face:'Faces'};return '<h3>Avatar Shop</h3><p class="hint">Spend coins from games on new looks. You have '+coins.toLocaleString()+' coins.</p>'+Object.keys(cat).map(k=>{const its=Object.keys(PAID).filter(x=>x.indexOf(k)===0&&x.length===k.length+1);return '<h3>'+cat[k]+'</h3><div class="shopg">'+its.map(x=>{const i=+x.slice(k.length),has=inv.indexOf(x)>=0;return '<div class="si"><b>'+NAMES[k][i]+'</b><small>'+(has?'Owned':'&#x1FA99; '+PAID[x])+'</small><button class="sm'+(has&&AV[k]===i?' sel':'')+'" data-b="'+x+'" data-sk="'+k+'" data-si="'+i+'">'+(has?(AV[k]===i?'Wearing':'Wear'):'Buy')+'</button></div>'}).join('')+'</div>'}).join('')};
VW.groups=()=>'<h3>Communities</h3>'+GR.map((g,i)=>{const j=joined.indexOf(g[0])>=0;return '<div class="fl"><span class="e">'+g[1]+'</span><div><b>'+g[0]+'</b><small>'+(g[2]+(j?1:0)).toLocaleString()+' members</small></div><button class="sm'+(j?' sel':'')+'" data-gr="'+i+'">'+(j?'Joined':'Join')+'</button></div>'}).join('');
VW.create=()=>'<h3>Create</h3><div class="fl"><span class="e">&#x1F6E0;</span><div><b>BloxVerse Studio</b><small>Build your own 3D game in the browser.</small></div><a class="lnk" href="https://abdulhameed8656006-prog.github.io/bloxverse-studio/" target="_blank" rel="noopener">Open Studio</a></div><h3>My games</h3><p class="hint">Export a game from Studio, then import the .bloxgame.json file here to play it in BloxVerse.</p><input type="file" id="gf" accept=".json,application/json" hidden><button class="btn" style="width:auto;padding:10px 20px" data-imp="1">Import a game</button><div style="margin-top:12px">'+(Object.keys(mg).length?Object.keys(mg).map(n=>'<div class="fl"><span class="e">&#x1F3AE;</span><div><b>'+esc(n)+'</b><small>'+mg[n].objs.length+' parts</small></div><button class="sm" data-pc="'+esc(n)+'">Play</button><button class="sm" data-dc="'+esc(n)+'">Delete</button></div>').join(''):'<p class="hint">No imported games yet.</p>')+'</div>';
VW.profile=()=>{const pn=Object.keys(ST.played||{}).length,bd=[['Newcomer','&#x1F44B;',1],['Explorer','&#x1F9ED;',pn>=GL.length],['Fashionista','&#x1F457;',inv.length>=5],['Social Butterfly','&#x1F98B;',fr.length>=3],['Rich','&#x1F4B0;',coins>=500],['Creator','&#x1F6E0;',Object.keys(mg).length>0],['Community','&#x1F465;',joined.length>=2]];
 return '<h3>Profile</h3><div class="avw"><canvas id="pvc" width="240" height="300"></canvas><div><h2 style="padding:0">'+esc(user)+'</h2><p class="hint">Joined '+new Date(ST.joined||Date.now()).toLocaleDateString()+'</p><div class="stats"><div><b>'+coins.toLocaleString()+'</b><small>Coins</small></div><div><b>'+fr.length+'</b><small>Friends</small></div><div><b>'+pn+'</b><small>Games played</small></div><div><b>'+inv.length+'</b><small>Items owned</small></div><div><b>'+(ST.best?ST.best.toFixed(1)+' s':'-')+'</b><small>Best Speed Run</small></div></div></div></div><h3>Badges</h3><div class="row chips">'+bd.map(b=>'<div class="bdg'+(b[2]?'':' off')+'"><span>'+b[1]+'</span><small>'+b[0]+'</small></div>').join('')+'</div>'+(joined.length?'<h3>Communities</h3><p class="hint">'+joined.map(esc).join(', ')+'</p>':'')};
function importGame(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d||!Array.isArray(d.objs))throw 0;const nm=String(d.name||'My Game').slice(0,30),n=(v,df,a,b)=>Number.isFinite(+v)?Math.max(a,Math.min(b,+v)):df,RO=['solid','spawn','coin','kill','check','goal'],SH=['box','sphere','cyl'];
 mg[nm]={name:nm,objs:d.objs.slice(0,500).map(o=>({sh:SH.indexOf(o.sh)>=0?o.sh:'box',role:RO.indexOf(o.role)>=0?o.role:'solid',x:n(o.x,0,-2000,2000),y:n(o.y,0,-2000,2000),z:n(o.z,0,-2000,2000),sx:n(o.sx,1,.1,500),sy:n(o.sy,1,.1,500),sz:n(o.sz,1,.1,500),c:/^#[0-9a-f]{6}$/i.test(o.c)?o.c:'#888888'}))};
 try{localStorage.setItem(lk('bvg_'),JSON.stringify(mg))}catch(x){}note('Imported "'+nm+'"');setView('create')}catch(x){note('That file is not a valid game')}};r.readAsText(f);e.target.value=''}
$('#sq').oninput=e=>{dq=e.target.value;setView('discover')};
function setView(v){view=v;killPv();document.querySelectorAll('#nv button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$('#mn').innerHTML=VW[v]();if(v==='avatar'||v==='profile')preview();if(v==='create'&&$('#gf'))$('#gf').onchange=importGame;fillWk()}
function openHome(){loadU();setView(view);show('home')}
function addF(name){name=(name||'').trim();if(!name)return;const k=name.toLowerCase(),bot=BOTS.find(b=>b[0].toLowerCase()===k);if(k===user.toLowerCase())return note('You cannot add yourself');if(!bot&&!users()[k])return note('No player found with that username');const c=bot?bot[0]:k;if(fr.indexOf(c)>=0)return note('You are already friends');fr.push(c);saveF();note('You and '+c+' are now friends');setView('friends')}
function play(id){try{localStorage.setItem(lk('bvl_'),id)}catch(e){}ST.played[id]=1;saveST();startGame(id)}
$('#nv').onclick=e=>{const b=e.target.closest('button');if(b&&b.dataset.v)setView(b.dataset.v)};
$('#mn').onclick=e=>{const b=e.target.closest('button,.sw');if(!b)return;const d=b.dataset;
 if(d.p)return detail(d.p);
 if(d.j){note('Joining '+d.n+'...');return play(d.j)}
 if(d.rm){fr=fr.filter(x=>x!==d.rm);saveF();return setView('friends')}
 if(d.add)return addF(d.add);
 if(d.k){if(!own(d.k,+d.o))return note('Locked. Buy it in the Shop first.');AV[d.k]=+d.o;try{localStorage.setItem(lk('bvav_'),JSON.stringify(AV))}catch(e){}return setView('avatar')}
 if(d.b){const k=d.sk,i=+d.si;if(inv.indexOf(d.b)<0){if(coins<PAID[d.b])return note('Not enough coins. Play games to earn more!');setC(coins-PAID[d.b]);inv.push(d.b);try{localStorage.setItem(lk('bvinv_'),JSON.stringify(inv))}catch(e){}note('Bought '+NAMES[k][i]+'!')}AV[k]=i;try{localStorage.setItem(lk('bvav_'),JSON.stringify(AV))}catch(e){}return setView('shop')}
 if(d.g){dg=d.g;return setView('discover')}
 if(d.s){ds=d.s;return setView('discover')}
 if(d.gr){const n=GR[+d.gr][0],ix=joined.indexOf(n);if(ix>=0)joined.splice(ix,1);else joined.push(n);try{localStorage.setItem(lk('bvgr_'),JSON.stringify(joined))}catch(e){}return setView('groups')}
 if(d.imp)return $('#gf').click();
 if(d.pc)return play('c:'+d.pc);
 if(d.dc){delete mg[d.dc];try{localStorage.setItem(lk('bvg_'),JSON.stringify(mg))}catch(e){}return setView('create')}
 if(d.daily){try{localStorage.setItem(lk('bvd_'),new Date().toDateString())}catch(e){}setC(coins+50);note('+50 coins! Come back tomorrow.');return setView('home')}
 if(b.id==='fb')addF($('#fa').value)};
try{const s=localStorage.getItem('bvs');if(s&&users()[s.toLowerCase()])enter(s)}catch(e){}

// ---------- 3D game ----------
let R,sc,cam,me,plats,cm,npcs,raf,clock,cp,vy,on,yaw,pitch,tw,fin,jh;
let walls=[],W={};const mv={x:0,y:0},keys={};
function tag(t){const c=document.createElement('canvas');c.width=256;c.height=64;const x=c.getContext('2d');x.fillStyle='#000a';x.fillRect(0,0,256,64);x.fillStyle='#fff';x.font='bold 32px sans-serif';x.textAlign='center';x.fillText(t,128,44);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c)}));s.scale.set(6,1.5,1);s.position.y=7.4;return s}
function face(id,sk){const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.fillStyle=hex(sk);x.fillRect(0,0,128,128);x.fillStyle='#111';x.strokeStyle='#111';x.lineWidth=7;x.lineCap='round';
 if(id===1){x.fillRect(20,38,88,22);x.beginPath();x.arc(64,80,20,.2,Math.PI-.2);x.stroke()}
 else if(id===2){x.beginPath();x.arc(44,50,7,0,7);x.arc(84,50,7,0,7);x.fill();x.beginPath();x.arc(64,80,17,0,Math.PI);x.fill()}
 else if(id===3){x.lineWidth=8;x.beginPath();x.moveTo(30,38);x.lineTo(56,50);x.moveTo(98,38);x.lineTo(72,50);x.stroke();x.beginPath();x.arc(44,64,6,0,7);x.arc(84,64,6,0,7);x.fill();x.beginPath();x.moveTo(46,100);x.lineTo(82,100);x.stroke()}
 else{x.beginPath();x.arc(44,52,8,0,7);x.arc(84,52,8,0,7);x.fill();x.beginPath();x.arc(64,76,24,.25,Math.PI-.25);x.stroke()}
 return new THREE.CanvasTexture(c)}
function avatar(cf,name){
 if(typeof cf==='number')cf={sc:cf};
 const c=Object.assign({},DEF,cf),g=new THREE.Group(),L=k=>new THREE.MeshLambertMaterial({color:k}),sk=SKINS[c.skin],sc=c.sc!=null?c.sc:SHIRTS[c.shirt],pc=PANTS[c.pants],hc=HAIRC[c.hc];
 const box=(w,h,d,x,y,z,k,pv,par)=>{const gm=new THREE.BoxGeometry(w,h,d);if(pv)gm.translate(0,-h/2,0);const b=new THREE.Mesh(gm,L(k));b.position.set(x,y,z);(par||g).add(b);return b};
 box(2,2,1,0,3,0,sc);
 const hm=[L(sk),L(sk),L(sk),L(sk),new THREE.MeshLambertMaterial({map:face(c.face,sk)}),L(sk)],head=new THREE.Mesh(new THREE.BoxGeometry(1.3,1.3,1.3),hm);head.position.set(0,4.65,0);g.add(head);
 g.arm1=box(.95,2,.95,-1.5,4,0,sc,1);g.arm2=box(.95,2,.95,1.5,4,0,sc,1);
 [g.arm1,g.arm2].forEach(a=>box(.97,.6,.97,0,-1.7,0,sk,0,a));
 g.leg1=box(.95,2,.95,-.5,2,0,pc,1);g.leg2=box(.95,2,.95,.5,2,0,pc,1);
 if(c.hair===1){box(1.4,.35,1.4,0,5.4,0,hc);box(1.4,.8,.3,0,5,-.55,hc)}
 if(c.hair===2){for(let i=-1;i<=1;i++)box(.4,.8,.4,i*.45,5.55,0,hc);box(1.4,.3,1.4,0,5.3,0,hc)}
 if(c.hair===3){box(1.4,.35,1.4,0,5.4,0,hc);box(1.4,1.9,.3,0,4.9,-.55,hc);box(.3,1.2,1.1,-.65,4.85,-.05,hc);box(.3,1.2,1.1,.65,4.85,-.05,hc)}
 if(c.hair===4){const b=new THREE.Mesh(new THREE.SphereGeometry(1.1,12,10),L(hc));b.position.set(0,5.1,-.1);g.add(b)}
 if(c.hat===1){box(1.5,.4,1.5,0,5.55,0,0xe8453c);box(1.5,.15,.8,0,5.4,.95,0xe8453c)}
 if(c.hat===2){box(1.5,.5,1.5,0,5.6,0,0xffd700);for(let i=-1;i<=1;i++)box(.35,.5,.35,i*.5,6.1,0,0xffd700)}
 if(c.hat===3){const cn=new THREE.Mesh(new THREE.ConeGeometry(.9,1.8,12),L(0x5b2a86));cn.position.set(0,6.2,0);g.add(cn);const br=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.4,.1,16),L(0x5b2a86));br.position.set(0,5.35,0);g.add(br)}
 if(c.hat===4){const b=new THREE.Mesh(new THREE.SphereGeometry(.85,12,8,0,Math.PI*2,0,Math.PI/2),L(0x3a6ff0));b.position.set(0,5.25,0);g.add(b)}
 if(c.back===1)box(1.5,1.7,.6,0,3.2,-.9,0x8a5a3a);
 if(c.back===2)box(1.9,2.6,.15,0,4,-.6,0xe8453c,1);
 g.add(tag(name));return g}
function grid(c0){const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.fillStyle=c0||'#4caf50';x.fillRect(0,0,64,64);x.strokeStyle='#0003';x.lineWidth=3;x.strokeRect(0,0,64,64);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(25,25);return t}
function addP(x,y,z,w,col,cpf){const m=new THREE.Mesh(new THREE.BoxGeometry(w,1,w),new THREE.MeshLambertMaterial({color:col}));m.position.set(x,y-.5,z);sc.add(m);const p={x,y:y-.5,z,w,h:1,d:w,cp:cpf};plats.push(p);return p}
function toast(t,ms){const e=$('#ts');e.textContent=t;e.style.display='block';clearTimeout(tw);tw=setTimeout(()=>e.style.display='none',ms||2200)}
let hl,sn;const B={};
function hud(){$('#hd').textContent=W.obj+' | Coins: '+coins+(W.hp!=null?' | HP: '+W.hp:'')}
function box(x,y,z,w,h,d,c,solid){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshLambertMaterial({color:c}));m.position.set(x,y+h/2,z);sc.add(m);if(solid)walls.push({x:x,z:z,w:w,d:d,h:h});return m}
function coin(x,z,y){const m=new THREE.Mesh(new THREE.CylinderGeometry(1,1,.3,16),new THREE.MeshLambertMaterial({color:0xffc928,emissive:0x553d00}));m.rotation.x=Math.PI/2;m.position.set(x,(y||0)+2.5,z);sc.add(m);cm.push(m)}
function ground0(sz,col,sky,fog){sc.background=new THREE.Color(sky);sc.fog=new THREE.Fog(sky,fog[0],fog[1]);const b=new THREE.Mesh(new THREE.BoxGeometry(sz,1,sz),new THREE.MeshLambertMaterial({map:grid(col)}));b.position.y=-.5;sc.add(b);plats.push({x:0,y:-.5,z:0,w:sz,h:1,d:sz})}
function friendsOnline(){return fr.filter(n=>stat[n]&&stat[n].on)}
function crowd(n,r){const L=friendsOnline().concat(['Builder_1','xX_Noob_Xx','PetLover','SkyKing','Zara_Plays']);for(let i=0;i<n;i++){const a=avatar(rcfg(),L[i]);a.position.set(Math.random()*r*2-r,0,Math.random()*r-r/2+10);a.tx=a.position.x;a.tz=a.position.z;a.t=Math.random()*9;sc.add(a);npcs.push(a)}}
function pushOut(P){for(const w of walls){const ox=Math.abs(P.x-w.x)-(w.w/2+.8),oz=Math.abs(P.z-w.z)-(w.d/2+.8);if(ox<0&&oz<0&&P.y<(w.h||99)&&P.y+5>(w.b==null?-99:w.b)){if(ox>oz)P.x+=(P.x>w.x?1:-1)*-ox;else P.z+=(P.z>w.z?1:-1)*-oz}}}
function chase(e,dt,s){const P=me.position,dx=P.x-e.position.x,dz=P.z-e.position.z,d=Math.hypot(dx,dz)||1;e.position.x+=dx/d*s*dt;e.position.z+=dz/d*s*dt;pushOut(e.position);e.rotation.y=Math.atan2(dx,dz);swing(e,true,dt,'t');return d}
function free(x,z){return !walls.some(w=>Math.abs(x-w.x)<w.w/2+2&&Math.abs(z-w.z)<w.d/2+2)}
function rp(){let x,z,k=0;do{x=Math.random()*84-42;z=Math.random()*84-42}while(!free(x,z)&&k++<40);return[x,z]}
B.obby=()=>{ground0(100,'#4caf50',0x9fd8ff,[90,300]);W.obj='Hard tower: moving platforms, narrow ledges';
 box(0,0,-30,14,5,.6,0x335fff);const cols=[0xe8453c,0xffc928,0x3a6ff0,0x2fb35a,0xa24cf0,0xff8a2b],N=30;
 for(let i=0;i<N;i++){const mg=i%4===3,w=mg?6:Math.max(3.5,6-i*.08),x=Math.sin(i*1.1)*8,y=2+i*1.1,z=-58-i*9.5,p=addP(x,y,z,w,cols[i%6],i%6===0);
  if(mg){p.ax=x;p.sp=1+i*.03;p.m=sc.children[sc.children.length-1];p.dx=0}else if(i%2===1)coin(x,z,y)}
 const fx=Math.sin(N*1.1)*8,fy=2+N*1.1,fz=-58-N*9.5;addP(fx,fy,fz,9,0xffd700,true);
 const tr=new THREE.Mesh(new THREE.SphereGeometry(1.5,16,16),new THREE.MeshLambertMaterial({color:0xffd700,emissive:0x886600}));tr.position.set(fx,fy+2.5,fz);sc.add(tr);fin={x:fx,y:fy,z:fz,m:tr};
 crowd(3,40);W.upd=dt=>{W.t+=dt;plats.forEach(p=>{if(p.sp){const nx=p.ax+Math.sin(W.t*p.sp)*5;p.dx=nx-p.x;p.x=nx;p.m.position.x=nx}})}};
B.pets=()=>{ground0(120,'#7bd36a',0xbfe9ff,[80,250]);W.pets=[];W.eggs=[];W.obj='Hatch all 10 eggs';
 for(let i=0;i<14;i++){const x=Math.random()*100-50,z=Math.random()*100-50;box(x,0,z,2.4,5,2.4,0x8a5a3a);box(x,5,z,8,6,8,0x2e8b3a)}
 const mk=()=>{for(let i=0;i<10;i++){const e=new THREE.Mesh(new THREE.SphereGeometry(1.6,16,16),new THREE.MeshLambertMaterial({color:0xfff6e0}));e.scale.y=1.3;e.position.set(Math.random()*100-50,2,Math.random()*100-50);sc.add(e);W.eggs.push(e)}};mk();crowd(3,40);
 W.upd=dt=>{W.t+=dt;const P=me.position;
  for(let i=W.eggs.length-1;i>=0;i--){const e=W.eggs[i];if(Math.hypot(e.position.x-P.x,e.position.z-P.z)<3.5){sc.remove(e);W.eggs.splice(i,1);const r=Math.random(),c=r<.1?0xffd700:[0xff7aa8,0x7ad0ff,0xa24cf0,0xff8a2b][Math.floor(Math.random()*4)],g=new THREE.Group(),m=new THREE.MeshLambertMaterial({color:c}),bd=new THREE.Mesh(new THREE.BoxGeometry(1.6,1.4,2),m),hd=new THREE.Mesh(new THREE.BoxGeometry(1.3,1.3,1.3),m);bd.position.y=1.2;hd.position.set(0,2.2,1.1);g.add(bd,hd);g.position.set(P.x,0,P.z);sc.add(g);W.pets.push(g);setC(coins+(r<.1?30:10));toast(r<.1?'Legendary gold pet! +30 coins':'You hatched a pet! +10 coins');
   if(!W.eggs.length){setC(coins+30);toast('All eggs hatched! +30 coins. New eggs appeared.',3500);mk()}}}
  W.pets.forEach((g,k)=>{const a=k*1.3,r=3.5+k*.7,f=Math.min(1,dt*4);g.position.x+=(P.x+Math.sin(a)*r-g.position.x)*f;g.position.z+=(P.z+Math.cos(a)*r-g.position.z)*f;g.position.y=Math.abs(Math.sin(W.t*4+k))*.6;g.rotation.y=Math.atan2(P.x-g.position.x,P.z-g.position.z)});
  W.obj='Hatch eggs ('+W.eggs.length+' left). Pets: '+W.pets.length;hud()}};
B.town=()=>{ground0(160,'#9aa0a6',0xbfe9ff,[100,300]);W.obj='Collect cash around town';box(0,.02,3,160,.2,12,0x333333);
 for(let i=0;i<8;i++){const x=(i%4-1.5)*36,z=i<4?-28:36;box(x,0,z,16,10,14,[0xd9573b,0x3a6ea8,0xc08a2b,0x3d8f5a][i%4],1);const r=new THREE.Mesh(new THREE.ConeGeometry(12,6,4),new THREE.MeshLambertMaterial({color:0x7a3b2b}));r.position.set(x,13,z);r.rotation.y=Math.PI/4;sc.add(r)}
 const mk=()=>{for(let i=0;i<15;i++)coin(Math.random()*120-60,Math.random()*24-10)};mk();crowd(4,50);
 W.upd=()=>{W.obj='Cash left: '+cm.length;if(!cm.length){setC(coins+40);toast('Town cleared! +40 coins. New cash appeared.',3500);mk()}hud()}};
function arena(o){ground0(100,o.g,o.sky,o.fog);W.sp={x:-42,z:42};
 box(0,0,-50,102,o.wh,2,o.wc,1);box(0,0,50,102,o.wh,2,o.wc,1);box(-50,0,0,2,o.wh,102,o.wc,1);box(50,0,0,2,o.wh,102,o.wc,1);
 for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++){if(i===-2&&j===2)continue;if(Math.random()<.65){const h=Math.random()<.5;box(i*20+Math.random()*8,0,j*20+Math.random()*8,h?16:2,o.wh,h?2:16,o.wc,1)}}
 W.ch=avatar(o.cc,o.cn);W.ch.position.set(40,0,-40);sc.add(W.ch);
 W.upd=dt=>{W.t+=dt;const P=me.position;if(W.pl)W.pl.position.set(P.x,P.y+6,P.z);
  const d=chase(W.ch,dt,o.sp);
  if(d<2.8){toast(o.keys?'The ghost caught you! Back to start':'The murderer got you! Round restarts',2200);P.set(-42,1,42);vy=0;W.ch.position.set(40,0,-40);if(!o.keys)W.tm=60}
  if(o.keys){for(let i=W.ks.length-1;i>=0;i--){const k=W.ks[i];k.rotation.y+=dt*2;if(Math.hypot(k.position.x-P.x,k.position.z-P.z)<3.5&&P.y<4){sc.remove(k);W.ks.splice(i,1);W.got++;setC(coins+10)}}
   W.obj='Find 5 keys: '+W.got+'/5';if(W.got>=5){setC(coins+60);toast('You escaped! +60 coins',3500);P.set(-42,1,42);W.mk()}}
  else{W.tm-=dt;W.obj='Survive: '+Math.ceil(W.tm)+' s. Grab coins!';if(W.tm<=0){setC(coins+40);toast('You survived! +40 coins',3500);W.tm=60;P.set(-42,1,42);W.ch.position.set(40,0,-40)}}
  hud()}}
B.haunted=()=>{arena({g:'#555555',sky:0x05050f,fog:[8,55],wh:12,wc:0x6a5a7a,cc:0xdddddd,cn:'Ghost',sp:12,keys:1});hl.intensity=.3;sn.intensity=.08;W.pl=new THREE.PointLight(0xffe6a0,1.4,45);sc.add(W.pl);
 W.mk=()=>{W.ks=[];W.got=0;for(let i=0;i<5;i++){const p=rp(),k=new THREE.Mesh(new THREE.BoxGeometry(1.5,1.5,1.5),new THREE.MeshLambertMaterial({color:0xffd700,emissive:0x886600}));k.position.set(p[0],2.5,p[1]);sc.add(k);W.ks.push(k)}};W.mk()};
B.murder=()=>{arena({g:'#8aa86a',sky:0x9fd8ff,fog:[90,280],wh:8,wc:0xc08a5a,cc:0xb01010,cn:'Murderer',sp:12.5,keys:0});W.tm=60;for(let i=0;i<8;i++){const p=rp();coin(p[0],p[1])}crowd(3,40)};
B.fruit=()=>{ground0(100,'#c9a56b',0xffd9a0,[90,280]);W.hp=5;W.k=0;W.cd=0;W.ac=0;W.en=[];W.obj='Defeat 10 bandits';
 const sp=()=>{const e=avatar(0xb03030,'Bandit'),a=Math.random()*6.28;e.position.set(Math.cos(a)*38,0,Math.sin(a)*38);e.h=2;sc.add(e);W.en.push(e)};const reset=()=>{W.en.forEach(x=>sc.remove(x));W.en=[];W.k=0;W.hp=5;for(let i=0;i<4;i++)sp()};reset();
 W.atk=()=>{if(W.ac>0)return;W.ac=.35;const P=me.position;W.en.forEach(e=>{if(Math.hypot(e.position.x-P.x,e.position.z-P.z)<8){e.h--;e.position.x+=(e.position.x-P.x)*.4}});
  for(let i=W.en.length-1;i>=0;i--){const e=W.en[i];if(e.h<=0){sc.remove(e);W.en.splice(i,1);W.k++;setC(coins+8);if(W.k<=6)sp()}}
  if(W.k>=10){setC(coins+40);toast('You beat the bandits! +40 coins',3500);reset()}};
 W.upd=dt=>{W.ac-=dt;W.cd-=dt;const P=me.position;let hit=false;W.en.forEach(e=>{if(chase(e,dt,8)<2.8&&W.cd<=0)hit=true});
  if(hit){W.hp--;W.cd=1;toast('Ouch!',700);if(W.hp<=0){toast('Defeated! Try again',2500);P.set(0,1,20);reset()}}
  W.obj='Bandits defeated: '+W.k+'/10';hud()}};
B.lava=()=>{ground0(100,'#6b6b6b',0x2a1010,[60,220]);W.ly=-6;
 W.lv=new THREE.Mesh(new THREE.BoxGeometry(100,.3,100),new THREE.MeshLambertMaterial({color:0xff5a1f,emissive:0xaa2200,transparent:true,opacity:.9}));W.lv.position.y=-6;sc.add(W.lv);
 const cols=[0xe8453c,0xffc928,0x3a6ff0,0x2fb35a,0xa24cf0,0xff8a2b];
 for(let i=0;i<36;i++){const a=i*.65,r=14+(i%2)*5,y=2+i*1.05,x=Math.cos(a)*r,z=Math.sin(a)*r;addP(x,y,z,i%6===5?4:6,cols[i%6],false);if(i%5===2)coin(x,z,y)}
 crowd(2,40);
 W.upd=dt=>{W.t+=dt;W.ly+=.55*dt;W.lv.position.y=W.ly;const P=me.position;
  if(P.y+.3<W.ly){toast('You fell in the lava! Back to start',2000);W.ly=-6;W.t=0;P.set(0,1,20);vy=0}
  if(W.t>=60){setC(coins+50);toast('You survived! +50 coins',3500);W.ly=-6;W.t=0;P.set(0,1,20);vy=0}
  W.obj='Climb! Lava rising. Survive '+Math.ceil(60-W.t)+' s';hud()}};
B.race=()=>{ground0(160,'#5a5f66',0x9fd8ff,[100,300]);W.sp={x:0,z:60};W.gi=0;W.tm=0;W.sb=1;W.sbt=0;W.gs=[];
 box(0,.02,0,20,.2,170,0x2b2b2b);
 for(let i=0;i<8;i++){const x=Math.sin(i*1.2)*24,z=45-i*14,m=new THREE.Mesh(new THREE.TorusGeometry(4,.7,10,24),new THREE.MeshLambertMaterial({color:0x3a6ff0}));m.position.set(x,5,z);sc.add(m);W.gs.push(m)}
 const pads=[[10,38],[-18,10],[20,-30]];pads.forEach(p=>box(p[0],.05,p[1],6,.2,6,0xffc928));
 for(let i=0;i<9;i++){const x=Math.random()*70-35,z=Math.random()*90-35;box(x,0,z,6,2.5,1.5,0xe8453c,1);plats.push({x:x,y:1.25,z:z,w:6,h:2.5,d:1.5})}
 W.upd=dt=>{const P=me.position;W.tm+=dt;W.sbt-=dt;if(W.sbt<=0)W.sb=1;
  pads.forEach(p=>{if(Math.abs(P.x-p[0])<3.5&&Math.abs(P.z-p[1])<3.5&&P.y<1.5){W.sb=1.8;W.sbt=1.5}});
  const g=W.gs[W.gi];if(g&&Math.hypot(P.x-g.position.x,P.z-g.position.z)<4.5&&P.y<9){g.material.color.set(0x2fb35a);W.gi++;toast('Gate '+W.gi+' of 8',700)}
  W.gs.forEach((m,i)=>{if(i===W.gi)m.material.color.set(0xffd700)});
  if(W.gi>=8){const t=W.tm,r=Math.max(20,Math.round(120-t*4));bestT(t);setC(coins+r);toast('Finished in '+t.toFixed(1)+' s! +'+r+' coins',4000);W.gi=0;W.tm=0;W.gs.forEach(m=>m.material.color.set(0x3a6ff0));P.set(0,1,60);vy=0}
  W.obj='Gate '+Math.min(W.gi+1,8)+'/8 | '+W.tm.toFixed(1)+' s'+(ST.best?' | Best '+ST.best.toFixed(1)+' s':'');hud()}};
B.custom=name=>{const d=mg[name];sc.background=new THREE.Color(0x9fd8ff);sc.fog=new THREE.Fog(0x9fd8ff,120,400);W.kill=[];W.ck=[];W.goal=null;W.sp={x:0,y:5,z:0};
 d.objs.forEach(o=>{
  if(o.role==='coin'){coin(o.x,o.z,o.y-2.5);return}
  const g=o.sh==='sphere'?new THREE.SphereGeometry(.5,16,12):o.sh==='cyl'?new THREE.CylinderGeometry(.5,.5,1,20):new THREE.BoxGeometry(1,1,1),m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:o.c,emissive:o.role==='goal'?0x443300:o.role==='kill'?0x550000:0}));
  m.position.set(o.x,o.y,o.z);m.scale.set(o.sx,o.sy,o.sz);sc.add(m);
  if(o.role==='solid'||o.role==='spawn'||o.role==='check'){plats.push({x:o.x,y:o.y,z:o.z,w:o.sx,h:o.sy,d:o.sz});walls.push({x:o.x,z:o.z,w:o.sx,d:o.sz,h:o.y+o.sy/2,b:o.y-o.sy/2})}
  if(o.role==='spawn')W.sp={x:o.x,y:o.y+o.sy/2,z:o.z};
  if(o.role==='kill')W.kill.push(o);if(o.role==='check')W.ck.push(o);if(o.role==='goal')W.goal=o});
 W.upd=dt=>{const P=me.position;
  for(const o of W.kill){if(Math.abs(P.x-o.x)<o.sx/2+1&&Math.abs(P.z-o.z)<o.sz/2+1&&P.y<o.y+o.sy/2+.3&&P.y+5>o.y-o.sy/2){P.set(cp.x,cp.y+1,cp.z);vy=0;toast('Back to your checkpoint',900)}}
  for(const o of W.ck){if(on&&Math.abs(P.x-o.x)<o.sx/2&&Math.abs(P.z-o.z)<o.sz/2&&Math.abs(P.y-(o.y+o.sy/2))<.6)cp={x:o.x,y:o.y+o.sy/2,z:o.z}}
  const gl=W.goal;if(gl&&Math.hypot(P.x-gl.x,P.y+2.5-gl.y,P.z-gl.z)<gl.sx/2+2.5){setC(coins+50);toast('You win! +50 coins',3500);P.set(W.sp.x,W.sp.y+1,W.sp.z);cp={x:W.sp.x,y:W.sp.y,z:W.sp.z};vy=0}
  W.obj=name+' | coins left '+cm.length;hud()}};
function startGame(id){
 show('game');
 try{R=new THREE.WebGLRenderer({canvas:$('#cv'),antialias:true})}catch(e){openHome();alert('3D is not supported on this device.');return}
 R.setPixelRatio(Math.min(devicePixelRatio,2));
 sc=new THREE.Scene();cam=new THREE.PerspectiveCamera(65,1,.1,400);size();
 hl=new THREE.HemisphereLight(0xffffff,0x778899,.95);sn=new THREE.DirectionalLight(0xffffff,.6);sn.position.set(30,60,20);sc.add(hl,sn);
 plats=[];cm=[];npcs=[];walls=[];fin=null;W={t:0,id:id,obj:''};
 if(id.indexOf('c:')===0)B.custom(id.slice(2));else B[id]();
 const s0=W.sp||{x:0,z:20};
 me=avatar(AV,user);me.position.set(s0.x,s0.y||0,s0.z);sc.add(me);cp={x:s0.x,y:s0.y||0,z:s0.z};vy=0;on=false;yaw=0;pitch=.35;jh=false;
 $('#ab').style.display=id==='fruit'?'block':'none';
 hud();clock=new THREE.Clock();cancelAnimationFrame(raf);tick();toast(gi(id)?gi(id)[1]+': '+gi(id)[4]:id.slice(2),3200)}
function size(){if(!R)return;const w=innerWidth,h=innerHeight;R.setSize(w,h,false);if(cam){cam.aspect=w/h;cam.updateProjectionMatrix()}}
addEventListener('resize',size);
function ground(x,z,f){let b=null;for(const p of plats){const t=p.y+p.h/2;if(Math.abs(x-p.x)<p.w/2+.4&&Math.abs(z-p.z)<p.d/2+.4&&t<=f+.4&&(!b||t>b.top))b={p:p,top:t}}return b}
function tick(){
 raf=requestAnimationFrame(tick);const dt=Math.min(.05,clock.getDelta());
 let ix=mv.x+(keys.d||keys.arrowright?1:0)-(keys.a||keys.arrowleft?1:0),iy=mv.y+(keys.w||keys.arrowup?1:0)-(keys.s||keys.arrowdown?1:0);
 const l=Math.hypot(ix,iy);if(l>1){ix/=l;iy/=l}
 const dx=-Math.sin(yaw)*iy+Math.cos(yaw)*ix,dz=-Math.cos(yaw)*iy-Math.sin(yaw)*ix,P=me.position;
 const sp=15*(W.sb||1);P.x=clamp(P.x+dx*sp*dt,-300,300);P.z=clamp(P.z+dz*sp*dt,-300,300);pushOut(P);
 if((keys[' ']||jh)&&on){vy=24;on=false}
 const py=P.y;vy-=60*dt;P.y+=vy*dt;const g=ground(P.x,P.z,py);on=false;
 if(g&&P.y<=g.top&&vy<=0){P.y=g.top;vy=0;on=true;P.x+=g.p.dx||0;if(g.p.cp)cp={x:g.p.x,y:g.top,z:g.p.z}}
 if(P.y<-40){P.set(cp.x,cp.y+1,cp.z);vy=0;toast('Respawned at your checkpoint')}
 if(l>.1){me.rotation.y=Math.atan2(dx,dz)}
 swing(me,l>.1,dt,'t');
 for(let i=cm.length-1;i>=0;i--){const c=cm[i];c.rotation.z+=dt*3;if(Math.hypot(c.position.x-P.x,c.position.y-P.y-3,c.position.z-P.z)<3.2){sc.remove(c);cm.splice(i,1);setC(coins+5);hud()}}
 if(fin&&Math.hypot(fin.x-P.x,fin.z-P.z)<4&&Math.abs(fin.y-P.y)<4){setC(coins+100);toast('You made it! +100 coins',3500);P.set(0,1,20);cp={x:0,y:0,z:20};vy=0}
 if(fin)fin.m.rotation.y+=dt*2;
 for(const n of npcs){n.t-=dt;const ddx=n.tx-n.position.x,ddz=n.tz-n.position.z,d=Math.hypot(ddx,ddz);if(d<1||n.t<0){n.tx=Math.random()*90-45;n.tz=Math.random()*60-40;n.t=6+Math.random()*6}else{n.position.x+=ddx/d*6*dt;n.position.z+=ddz/d*6*dt;n.rotation.y=Math.atan2(ddx,ddz)}swing(n,true,dt,'t')}
 if(W.upd)W.upd(dt);const tx=P.x,ty=P.y+4,tz=P.z;cam.position.set(tx+Math.sin(yaw)*Math.cos(pitch)*20,ty+Math.sin(pitch)*20+2,tz+Math.cos(yaw)*Math.cos(pitch)*20);cam.lookAt(tx,ty,tz);
 R.render(sc,cam)}
function swing(a,mvg,dt,k){a[k+'s']=(a[k+'s']||0)+(mvg?dt*10:0);const s=mvg?Math.sin(a[k+'s'])*.8:0;a.leg1.rotation.x=s;a.leg2.rotation.x=-s;a.arm1.rotation.x=-s;a.arm2.rotation.x=s}
$('#lv').onclick=()=>{cancelAnimationFrame(raf);if(R){R.dispose();R=null}W={};openHome()};
// controls
addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true;if(e.key==='f'&&W.atk)W.atk();if(e.key===' ')e.preventDefault()});
addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});
const cv=$('#cv');let dr=null;
cv.onpointerdown=e=>{dr={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId)};
cv.onpointermove=e=>{if(!dr)return;yaw-=(e.clientX-dr.x)*.006;pitch=clamp(pitch+(e.clientY-dr.y)*.005,-.2,1.2);dr.x=e.clientX;dr.y=e.clientY};
cv.onpointerup=cv.onpointercancel=()=>{dr=null};
const js=$('#js'),kn=$('#kn');let jid=null;
function jm(e){const r=js.getBoundingClientRect();let x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;const l=Math.hypot(x,y),m=r.width/2*.7;if(l>m){x*=m/l;y*=m/l}mv.x=x/m;mv.y=-y/m;kn.style.transform='translate('+x+'px,'+y+'px)'}
js.onpointerdown=e=>{jid=e.pointerId;js.setPointerCapture(jid);jm(e)};
js.onpointermove=e=>{if(e.pointerId===jid)jm(e)};
js.onpointerup=js.onpointercancel=()=>{jid=null;mv.x=mv.y=0;kn.style.transform=''};
const jb=$('#jb');jb.onpointerdown=()=>{jh=true};jb.onpointerup=jb.onpointercancel=jb.onpointerleave=()=>{jh=false};
$('#ab').onclick=()=>{if(W.atk)W.atk()};
if('serviceWorker' in navigator){addEventListener('load',()=>{navigator.serviceWorker.register('sw.js').catch(()=>{})})}
