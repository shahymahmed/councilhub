const KEY="councilHubDataV1";
const seed={
 admins:[
  {id:"a1",name:"Shaheem Ahmed",role:"Super Admin",email:"admin@council.gov.mv"}
 ],
 publicViewers:[
  {id:"v1",name:"Planning Ministry Viewer",phone:"9607999999",status:"Approved",scope:"Project Progress Only",approvedBy:"a1",approvedAt:"2026-08-20 10:00"}
 ],
 feedback:[
  {id:"f1",from:"Ahmed Rasheed",type:"Feedback",rating:5,text:"The new task workflow is very useful.",status:"Open",time:"2026-08-23 09:30"},
  {id:"f2",from:"Ali Shafeeu",type:"Suggestion",rating:4,text:"Add a quick photo upload button.",status:"Resolved",time:"2026-08-22 15:20"}
 ],
 issues:[
  {id:"i1",title:"Notification delay reported",severity:"Medium",status:"Open",reportedBy:"Ali Shafeeu",time:"2026-08-23 08:45",resolution:""}
 ],
 groups:[
  {id:"g1",name:"Projects Unit",type:"Section",members:["u2","u3","u5"]},
  {id:"g2",name:"Administration Unit",type:"Unit",members:["u4"]},
  {id:"g3",name:"Support Staff",type:"Group",members:["u5"]},
  {id:"g4",name:"Mosque Committee / Staff",type:"Group",members:["u4","u5"]}
 ],
 users:[
  {id:"u1",name:"Shaheem Ahmed",role:"Administrator",initials:"SA",idNo:"A123456",phone:"9607000001",email:"shaheem@council.gov.mv",rank:"Administrator",source:"Idhaaree"},
  {id:"u2",name:"Ahmed Rasheed",role:"Project Officer",initials:"AR",idNo:"A123457",phone:"9607000002",email:"ahmed@council.gov.mv",rank:"Project Officer",source:"Idhaaree"},
  {id:"u3",name:"Hussain Ali",role:"Technical Officer",initials:"HA",idNo:"A123458",phone:"9607000003",email:"hussain@council.gov.mv",rank:"Technical Officer",source:"Idhaaree"},
  {id:"u4",name:"Mariyam Fathimath",role:"Administration",initials:"MF",idNo:"A123459",phone:"9607000004",email:"mariyam@council.gov.mv",rank:"Administrative Staff",source:"Idhaaree"},
  {id:"u5",name:"Ali Shafeeu",role:"Field Officer",initials:"AS",idNo:"A123460",phone:"9607000005",email:"ali@council.gov.mv",rank:"Support Staff",source:"Council Directory"}
 ],
 projects:[
  {id:"p1",name:"Dhaandhoo Harbour Project",code:"HBR088",status:"In Progress",progress:74,start:"2026-01-12",end:"2026-11-30",manager:"u2"},
  {id:"p2",name:"Council Office Improvement",code:"COI-26",status:"In Progress",progress:58,start:"2026-06-01",end:"2026-10-20",manager:"u3"},
  {id:"p3",name:"Street Lighting Programme",code:"SLP-26",status:"Planning",progress:22,start:"2026-08-10",end:"2026-12-15",manager:"u5"}
 ],
 events:[
  {id:"e1",name:"Council Staff Night 2026",date:"2026-09-18",time:"20:00",location:"Dhaandhoo",progress:46,coordinator:"u4",budget:85000},
  {id:"e2",name:"Community Sports Day",date:"2026-10-10",time:"16:00",location:"Dhaandhoo Futsal Ground",progress:28,coordinator:"u5",budget:65000}
 ],
 tasks:[
  {id:"t1",title:"Inspect harbour lights",assignee:"u3",assignees:["u3"],assignedBy:"u1",project:"p1",event:"",due:"2026-08-28",priority:"High",status:"In Progress",progress:60,desc:"Inspect all harbour lights and submit findings.",evidence:[]},
  {id:"t2",title:"Obtain street-light quotations",assignee:"u2",assignedBy:"u1",project:"p3",event:"",due:"2026-08-27",priority:"Normal",status:"Assigned",progress:0,desc:"Collect at least three supplier quotations.",assignees:[],evidence:[]},
  {id:"t3",title:"Prepare staff night invitations",assignee:"u4",assignedBy:"u1",project:"",event:"e1",due:"2026-09-03",priority:"Normal",status:"In Progress",progress:45,desc:"Finalize invitation list and artwork.",assignees:[],evidence:[]},
  {id:"t4",title:"Arrange sports equipment",assignee:"u5",assignedBy:"u4",project:"",event:"e2",due:"2026-09-25",priority:"High",status:"Assigned",progress:0,desc:"Confirm equipment requirements and supplier.",assignees:[],evidence:[]},
  {id:"t5",title:"Submit harbour progress update",assignee:"u2",assignedBy:"u1",project:"p1",event:"",due:"2026-08-25",priority:"High",status:"Completed",progress:100,desc:"Weekly progress report.",assignees:[],evidence:[]},
  {id:"t6",title:"Check office electrical works",assignee:"u3",assignedBy:"u1",project:"p2",event:"",due:"2026-08-24",priority:"Normal",status:"In Progress",progress:75,desc:"Verify completed electrical points.",assignees:[],evidence:[]}
 ],
 activity:[
  {time:"2026-08-23 00:20",text:"Shaheem Ahmed assigned “Inspect harbour lights” to Hussain Ali.",type:"task"},
  {time:"2026-08-22 16:10",text:"Hussain Ali updated harbour lights progress to 60%.",type:"update"},
  {time:"2026-08-22 12:30",text:"Council Staff Night 2026 progress updated to 46%.",type:"event"},
  {time:"2026-08-21 14:05",text:"Harbour progress report marked completed.",type:"complete"}
 ]
};
let data=JSON.parse(localStorage.getItem(KEY)||"null")||seed;
data.admins ||= seed.admins;
data.publicViewers ||= seed.publicViewers;
data.feedback ||= seed.feedback;
data.issues ||= seed.issues;
data.groups ||= seed.groups;
data.users.forEach(u=>{u.idNo ||= ""; u.phone ||= ""; u.email ||= ""; u.rank ||= u.role; u.source ||= "Council Directory";});
data.tasks.forEach(t=>{t.assignees ||= (t.assignee?[t.assignee]:[]); t.evidence ||= [];});
let currentView="dashboard";
let portalMode=sessionStorage.getItem("portalMode")||"staff"; // staff | admin | viewer


const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
const user=id=>data.users.find(x=>x.id===id)||{name:"Unknown",initials:"??"};
const project=id=>data.projects.find(x=>x.id===id);
const event=id=>data.events.find(x=>x.id===id);
const today=new Date("2026-08-23T00:00:00");
function save(){localStorage.setItem(KEY,JSON.stringify(data))}
function fmtDate(s){if(!s)return "—";return new Date(s+"T00:00:00").toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"})}
function daysUntil(s){return Math.ceil((new Date(s+"T00:00:00")-today)/86400000)}
function statusBadge(s){let c=s==="Completed"?"green":s==="In Progress"?"blue":s==="Overdue"?"red":s==="Assigned"?"orange":"gray";return `<span class="badge ${c}">${esc(s)}</span>`}
function priorityBadge(s){return `<span class="badge ${s==="High"?"red":s==="Urgent"?"red":s==="Normal"?"orange":"gray"}">${esc(s)}</span>`}
function assigneeNames(t){return (t.assignees?.length?t.assignees:[t.assignee]).filter(Boolean).map(id=>user(id).name).join(", ")}
function groupMembers(gid){return data.groups.find(g=>g.id===gid)?.members||[]}
function memberIdsFromSelection(){return Array.from(document.querySelectorAll("#f_assignees option:checked")).map(o=>o.value)}

function progressBar(p){return `<div class="progress"><i style="width:${Math.max(0,Math.min(100,p))}%"></i></div><div class="bar-line"><span>Progress</span><b>${p}%</b></div>`}
function addRoleNav(){
 const nav=document.querySelector(".nav");
 if(!nav)return;
 if(portalMode==="admin" && !document.querySelector('[data-view="admin"]')){
   const b=document.createElement("button");b.className="nav-item";b.dataset.view="admin";b.innerHTML='<span class="nav-icon">🛡️</span><span>Admin</span>';nav.appendChild(b);
 }
 if(portalMode==="viewer" && !document.querySelector('[data-view="viewer"]')){
   const b=document.createElement("button");b.className="nav-item";b.dataset.view="viewer";b.innerHTML='<span class="nav-icon">📈</span><span>Project View</span>';nav.appendChild(b);
 }
}
function render(){
 const meta={dashboard:["Dashboard","Council-wide monitoring and accountability"],tasks:["Tasks & Instructions","Assign, track and complete Council work"],projects:["Projects","Monitor projects, schedules and delivery"],events:["Events","Plan Council events and track preparation"],calendar:["Schedule","Deadlines, events and milestones"],team:["Team","Workload and responsibility"],activity:["Activity Log","Complete audit trail of Council actions"]};
 $("#pageTitle").textContent=meta[currentView][0]; $("#pageSubtitle").textContent=meta[currentView][1];
 document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===currentView));
 $("#content").innerHTML=views[currentView](); wire();
}
const views={
 dashboard(){
  const overdue=data.tasks.filter(t=>t.status!=="Completed"&&daysUntil(t.due)<0).length;
  const dueToday=data.tasks.filter(t=>t.status!=="Completed"&&daysUntil(t.due)===0).length;
  const upcoming=data.tasks.filter(t=>t.status!=="Completed"&&daysUntil(t.due)>0&&daysUntil(t.due)<=7).length;
  const completed=data.tasks.filter(t=>t.status==="Completed").length;
  return `<div class="grid kpis">
   ${kpi("Active Projects",data.projects.filter(p=>p.status!=="Completed").length,"Council projects")}
   ${kpi("Open Tasks",data.tasks.filter(t=>t.status!=="Completed").length,"Across projects & events")}
   ${kpi("Overdue",overdue,"Needs attention",overdue?"red":"green")}
   ${kpi("Due Today",dueToday,"Deadline today",dueToday?"orange":"green")}
   ${kpi("Completed",completed,"Total completed tasks","green")}
  </div>
  <div class="grid two-col">
   <div class="card"><div class="section-head"><h2>What needs my attention?</h2><span class="muted">Live view</span></div>
    ${overdue?`<div class="danger-box">🔴 <b>${overdue} overdue task${overdue>1?"s":""}</b> require follow-up.</div>`:`<div class="notice">✓ No overdue tasks. Good control.</div>`}
    <div class="list" style="margin-top:10px">${data.tasks.filter(t=>t.status!=="Completed"&&daysUntil(t.due)<=7).slice(0,6).map(taskRow).join("")||'<div class="empty">Nothing urgent.</div>'}</div>
   </div>
   <div class="card"><div class="section-head"><h2>Upcoming events</h2><button class="secondary" data-action="new-event">＋ Event</button></div>
    <div class="list">${data.events.sort((a,b)=>a.date.localeCompare(b.date)).slice(0,4).map(e=>`<div class="row clickable" data-event="${e.id}"><div><div class="row-title">${esc(e.name)}</div><div class="row-sub">${fmtDate(e.date)} • ${esc(e.location)}</div></div><div style="width:90px">${progressBar(e.progress)}</div></div>`).join("")}</div>
   </div>
  </div>
  <div class="section-head"><h2>Project monitoring</h2><button class="secondary" data-view-go="projects">View all</button></div>
  <div class="grid three-col">${data.projects.map(p=>`<div class="card project-card clickable" data-project="${p.id}">${statusBadge(p.status)}<h3>${esc(p.name)}</h3><div class="muted">${esc(p.code)} • ${fmtDate(p.start)} – ${fmtDate(p.end)}</div>${progressBar(p.progress)}</div>`).join("")}</div>`;
 },
 tasks(){
  const q=window.taskQ||"";
  let list=data.tasks.filter(t=>`${t.title} ${user(t.assignee).name} ${t.status}`.toLowerCase().includes(q.toLowerCase()));
  return `<div class="searchbar"><input id="taskSearch" value="${esc(q)}" placeholder="Search tasks, staff or status…"><button class="primary" data-action="new-task">＋ Assign Task</button></div>
  <div class="toolbar" style="margin-bottom:15px"><button class="${!window.taskFilter?'active':''}" data-filter="">All</button><button class="${window.taskFilter==='open'?'active':''}" data-filter="open">Open</button><button class="${window.taskFilter==='overdue'?'active':''}" data-filter="overdue">Overdue</button><button class="${window.taskFilter==='mine'?'active':''}" data-filter="mine">My Tasks</button><button class="${window.taskFilter==='completed'?'active':''}" data-filter="completed">Completed</button></div>
  <div class="task-grid">${list.filter(t=>filterTask(t)).map(taskCard).join("")||'<div class="card empty" style="grid-column:1/-1">No tasks match your filter.</div>'}</div>`;
 },
 projects(){
  return `<div class="section-head" style="margin-top:0"><div class="muted">${data.projects.length} projects</div><button class="primary" data-action="new-project">＋ New Project</button></div>
  <div class="grid three-col">${data.projects.map(p=>`<div class="card project-card clickable" data-project="${p.id}">${statusBadge(p.status)}<h3>${esc(p.name)}</h3><div class="muted">${esc(p.code)}</div><div class="row-sub">Manager: ${esc(user(p.manager).name)}</div>${progressBar(p.progress)}<div class="row-sub" style="margin-top:8px">${data.tasks.filter(t=>t.project===p.id).length} linked tasks</div></div>`).join("")}</div>`;
 },
 events(){
  return `<div class="section-head" style="margin-top:0"><div class="muted">${data.events.length} events</div><button class="primary" data-action="new-event">＋ New Event</button></div>
  <div class="grid three-col">${data.events.map(e=>`<div class="card event-card clickable" data-event="${e.id}"><div class="event-date">${fmtDate(e.date)} • ${esc(e.time)}</div><h3>${esc(e.name)}</h3><div class="muted">📍 ${esc(e.location)}</div><div class="row-sub">Coordinator: ${esc(user(e.coordinator).name)}</div>${progressBar(e.progress)}<div class="row-sub" style="margin-top:8px">${data.tasks.filter(t=>t.event===e.id).length} event tasks</div></div>`).join("")}</div>`;
 },
 calendar(){
  const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], start=new Date(2026,7,23), cells=[];
  for(let i=0;i<14;i++){let d=new Date(start);d.setDate(start.getDate()+i);let iso=d.toISOString().slice(0,10);let ev=data.events.filter(e=>e.date===iso), ts=data.tasks.filter(t=>t.due===iso);cells.push(`<div class="cal-cell"><b>${days[d.getDay()]} ${d.getDate()}</b>${ev.map(e=>`<span>★ ${esc(e.name)}</span>`).join("")}${ts.map(t=>`<span>✓ ${esc(t.title)}</span>`).join("")}</div>`)}
  return `<div class="card"><div class="section-head" style="margin-top:0"><h2>14-day operational schedule</h2><span class="muted">23 Aug – 5 Sep 2026</span></div><div class="calendar-grid">${days.map(d=>`<div class="cal-head">${d}</div>`).join("")}${cells.join("")}</div></div>`;
 },
 
admin(){
 return `<div class="grid two-col">
  <div class="card"><div class="section-head" style="margin-top:0"><h2>Admin Control Centre</h2><span class="badge blue">Administrator</span></div>
   <div class="kpi-grid">
    <div class="kpi"><div class="kpi-num">${data.users.length}</div><div class="kpi-label">Registered staff</div></div>
    <div class="kpi"><div class="kpi-num">${data.publicViewers.filter(v=>v.status==="Pending").length}</div><div class="kpi-label">Viewer approvals</div></div>
    <div class="kpi"><div class="kpi-num">${data.issues.filter(i=>i.status==="Open").length}</div><div class="kpi-label">Open portal issues</div></div>
    <div class="kpi"><div class="kpi-num">${data.feedback.length}</div><div class="kpi-label">Feedback received</div></div>
   </div>
   <div class="section-head"><h2>Administration actions</h2></div>
   <div class="admin-actions">
    <button class="primary" onclick="openAdminModal('staff')">+ Register Staff</button>
    <button class="secondary" onclick="openAdminModal('viewer')">Approve Project Viewer</button>
    <button class="secondary" onclick="openAdminModal('report')">Generate Report</button>
   </div>
  </div>
  <div class="card"><div class="section-head" style="margin-top:0"><h2>Portal issues</h2><span class="muted">Admin resolution queue</span></div>
   <div class="list">${data.issues.map(i=>`<div class="row"><div><b>${esc(i.title)}</b><div class="row-sub">${esc(i.reportedBy)} • ${esc(i.time)}</div></div><div>${i.status==="Open"?`<button class="mini primary" onclick="resolveIssue('${i.id}')">Resolve</button>`:`<span class="badge green">Resolved</span>`}</div></div>`).join("") || '<div class="empty">No reported issues.</div>'}</div>
  </div>
 </div>
 <div class="card"><div class="section-head" style="margin-top:0"><h2>Staff registry</h2><span class="muted">Admin-controlled accounts</span></div>
 <table class="table"><thead><tr><th>Staff</th><th>ID</th><th>Phone</th><th>Official email</th><th>Rank</th><th>Source</th><th>Status</th></tr></thead><tbody>
 ${data.users.map(u=>`<tr><td><b>${esc(u.name)}</b></td><td>${esc(u.idNo)}</td><td>${esc(u.phone)}</td><td>${esc(u.email)}</td><td>${esc(u.rank)}</td><td>${esc(u.source)}</td><td><span class="badge green">Active</span></td></tr>`).join("")}</tbody></table></div>
 <div class="card"><div class="section-head" style="margin-top:0"><h2>Project-view access approvals</h2><span class="muted">View-only / project progress only</span></div>
 <table class="table"><thead><tr><th>Person</th><th>Phone</th><th>Access</th><th>Status</th><th>Action</th></tr></thead><tbody>
 ${data.publicViewers.map(v=>`<tr><td>${esc(v.name)}</td><td>${esc(v.phone)}</td><td>${esc(v.scope)}</td><td>${v.status==="Approved"?'<span class="badge green">Approved</span>':'<span class="badge orange">Pending</span>'}</td><td>${v.status==="Pending"?`<button class="mini primary" onclick="approveViewer('${v.id}')">Approve</button>`:'—'}</td></tr>`).join("")}</tbody></table></div>`;
},
viewer(){
 const projects=data.projects||[];
 return `<div class="card"><div class="section-head" style="margin-top:0"><h2>Project Progress Portal</h2><span class="badge gray">View Only</span></div>
 <div class="notice">This access is intentionally limited. Approved external viewers can see project progress only. They cannot assign tasks, edit records, view staff profiles, submit administrative changes, or access internal reports.</div>
 <div class="grid two-col" style="margin-top:16px">${projects.map(p=>`<div class="card project-card"><div class="section-head"><h3>${esc(p.name)}</h3><span class="badge blue">${esc(p.status)}</span></div><div class="row-sub">${esc(p.client)} • Due ${fmtDate(p.due)}</div><div style="margin-top:14px">${progressBar(p.progress)}</div><div class="row-sub" style="margin-top:6px">${p.progress}% complete</div></div>`).join("")}</div>
 </div>`;
},
feedback(){
 return `<div class="card"><div class="section-head" style="margin-top:0"><h2>Staff Feedback & Ratings</h2><span class="muted">Continuous improvement</span></div>
 <div class="notice">Feedback can be submitted after tasks, events or projects. Admins can review ratings and identify service or workflow improvements.</div>
 <div class="list" style="margin-top:14px">${data.feedback.map(f=>`<div class="feedback-card"><div class="row"><div><b>${esc(f.from)}</b><div class="row-sub">${esc(f.type)} • ${esc(f.time)}</div></div><div class="rating">${"★".repeat(f.rating)}${"☆".repeat(5-f.rating)}</div></div><p>${esc(f.text)}</p><span class="badge ${f.status==="Resolved"?"green":"orange"}">${esc(f.status)}</span></div>`).join("")}</div>
 </div>`;
},
reports(){
 const completed=data.tasks.filter(t=>t.status==="Completed").length;
 const total=data.tasks.length;
 const overdue=data.tasks.filter(t=>t.status!=="Completed"&&daysUntil(t.due)<0).length;
 return `<div class="card"><div class="section-head" style="margin-top:0"><h2>Reports</h2><button class="primary" onclick="openAdminModal('report')">Generate / Export</button></div>
 <div class="kpi-grid"><div class="kpi"><div class="kpi-num">${total}</div><div class="kpi-label">Total tasks</div></div><div class="kpi"><div class="kpi-num">${completed}</div><div class="kpi-label">Completed</div></div><div class="kpi"><div class="kpi-num">${overdue}</div><div class="kpi-label">Overdue</div></div><div class="kpi"><div class="kpi-num">${total?Math.round(completed/total*100):0}%</div><div class="kpi-label">Completion rate</div></div></div>
 <div class="section-head"><h2>Report types</h2></div><div class="admin-actions"><button class="secondary" onclick="toast('Project progress report prepared.')">Project Progress</button><button class="secondary" onclick="toast('Task performance report prepared.')">Task Performance</button><button class="secondary" onclick="toast('Staff workload report prepared.')">Staff Workload</button><button class="secondary" onclick="toast('Event completion report prepared.')">Event Report</button></div>
 </div>`;
},
team(){
  return `<div class="grid two-col">
  <div class="card"><div class="section-head" style="margin-top:0"><h2>Team workload</h2><span class="muted">ID No. + phone + official email</span></div><table class="table"><thead><tr><th>Staff</th><th>Identity</th><th>Open</th><th>Overdue</th><th>Done</th></tr></thead><tbody>${data.users.map(u=>{let own=data.tasks.filter(t=>(t.assignees||[t.assignee]).includes(u.id)),open=own.filter(t=>t.status!=="Completed"),od=open.filter(t=>daysUntil(t.due)<0),done=own.filter(t=>t.status==="Completed");return `<tr><td><div class="person"><div class="small-avatar">${u.initials}</div><div><b>${esc(u.name)}</b><div class="row-sub">${esc(u.rank)}</div></div></div></td><td><div class="row-sub">${esc(u.idNo)}</div><div class="row-sub">${esc(u.phone)}</div><div class="row-sub">${esc(u.email)}</div></td><td>${open.length}</td><td>${od.length?`<span class="badge red">${od.length}</span>`:"0"}</td><td>${done.length}</td></tr>`}).join("")}</tbody></table></div>
  <div class="card"><div class="section-head" style="margin-top:0"><h2>Staff groups</h2><span class="muted">Assign once to many people</span></div><div class="list">${data.groups.map(g=>`<div class="row"><div><div class="row-title">${esc(g.name)}</div><div class="row-sub">${esc(g.type)} • ${g.members.length} members</div></div><span class="badge blue">${g.members.map(id=>user(id).initials).join(" ")}</span></div>`).join("")}</div><div class="notice" style="margin-top:12px">Groups can represent sections, units, support teams, mosque staff/committees, or any Council-defined working group.</div></div>
  </div>`;
 },
 activity(){
  return `<div class="card"><div class="section-head" style="margin-top:0"><h2>Activity & audit trail</h2><span class="muted">Who did what and when</span></div><div class="timeline">${data.activity.slice().reverse().map(a=>`<div class="timeline-item"><div class="timeline-time">${esc(a.time)}</div><div class="timeline-text">${esc(a.text)}</div></div>`).join("")}</div></div>`;
 }
};
function kpi(label,value,note,kind=""){return `<div class="card"><div class="kpi-label">${label}</div><div class="kpi-value ${kind}">${value}</div><div class="kpi-note">${note}</div></div>`}
function taskRow(t){return `<div class="row clickable" data-task="${t.id}"><div><div class="row-title">${esc(t.title)}</div><div class="row-sub">${esc(user(t.assignee).name)} • Due ${fmtDate(t.due)}</div></div><div>${statusBadge(t.status)}</div></div>`}
function taskCard(t){let late=t.status!=="Completed"&&daysUntil(t.due)<0;return `<div class="task-card clickable" data-task="${t.id}"><div class="task-top">${priorityBadge(t.priority)} ${late?'<span class="badge red">OVERDUE</span>':statusBadge(t.status)}</div><h3>${esc(t.title)}</h3><div class="task-meta">${t.project?`🏗️ ${esc(project(t.project)?.name||"Project")}`:""} ${t.event?`🎉 ${esc(event(t.event)?.name||"Event")}`:""}</div><div class="person" style="margin-top:12px"><div class="small-avatar">${(t.assignees||[t.assignee]).length>1?"👥":user((t.assignees||[t.assignee])[0]).initials}</div>${esc(assigneeNames(t))}<span class="muted" style="margin-left:auto">Due ${fmtDate(t.due)}</span></div>${progressBar(t.progress)}</div>`}
function filterTask(t){switch(window.taskFilter){case"open":return t.status!=="Completed";case"overdue":return t.status!=="Completed"&&daysUntil(t.due)<0;case"mine":return t.assignee==="u1";case"completed":return t.status==="Completed";default:return true}}
function wire(){
 $("#taskSearch")?.addEventListener("input",e=>{window.taskQ=e.target.value;render()});
 document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{window.taskFilter=b.dataset.filter;render()});
 document.querySelectorAll("[data-task]").forEach(x=>x.onclick=()=>openTask(x.dataset.task));
 document.querySelectorAll("[data-project]").forEach(x=>x.onclick=()=>openProject(x.dataset.project));
 document.querySelectorAll("[data-event]").forEach(x=>x.onclick=()=>openEvent(x.dataset.event));
 document.querySelectorAll("[data-action]").forEach(x=>x.onclick=()=>actions[x.dataset.action]?.());
 document.querySelectorAll("[data-view-go]").forEach(x=>x.onclick=()=>{currentView=x.dataset.viewGo;render()});
}
const actions={
 "new-task":()=>openForm("task"),
 "new-project":()=>openForm("project"),
 "new-event":()=>openForm("event")
};
function openForm(type){
 let html="";
 if(type==="task") html=`<h2>Assign New Task</h2><div class="form-grid">
  ${field("Task title","title","","full")} ${multiSelectField("Assign staff (select one or many)","assignees",data.users.filter(u=>u.id!=="u1").map(u=>[u.id,`${u.name} — ${u.idNo}`]))}
  ${selectField("Or assign a group","group",[["","— No group —"],...data.groups.map(g=>[g.id,`${g.name} (${g.members.length})`])])}
  ${selectField("Assigned by","assignedBy",data.users.map(u=>[u.id,u.name]),"u1")} ${field("Due date","due","2026-08-28","")}
  ${selectField("Priority","priority",[["Normal","Normal"],["High","High"],["Urgent","Urgent"],["Low","Low"]])}
  ${selectField("Project","project",[["","— No project —"],...data.projects.map(p=>[p.id,p.name])])}
  ${selectField("Event","event",[["","— No event —"],...data.events.map(e=>[e.id,e.name])])}
  ${field("Description / instruction","desc","","full","textarea")}
 </div>${modalButtons("Create Task","create-task")}`;
 if(type==="project") html=`<h2>Create Project</h2><div class="form-grid">${field("Project name","name","","full")}${field("Project code","code")}${selectField("Manager","manager",data.users.map(u=>[u.id,u.name]),"u2")}${field("Start date","start","2026-08-23")}${field("End date","end","2026-12-31")}</div>${modalButtons("Create Project","create-project")}`;
 if(type==="event") html=`<h2>Create Council Event</h2><div class="form-grid">${field("Event name","name","","full")}${field("Date","date","2026-09-18")}${field("Time","time","20:00")}${field("Location","location","Dhaandhoo")}${selectField("Coordinator","coordinator",data.users.map(u=>[u.id,u.name]),"u2")}${field("Budget (MVR)","budget","0")}</div>${modalButtons("Create Event","create-event")}`;
 $("#modal").innerHTML=html;$("#modalBackdrop").classList.remove("hidden");$("#modal").querySelector("[data-submit]").onclick=()=>submitForm(type);
}
function field(label,name,value="",extra="",kind="input"){return `<div class="field ${extra}"><label>${label}</label>${kind==="textarea"?`<textarea id="f_${name}" rows="4">${esc(value)}</textarea>`:`<input id="f_${name}" value="${esc(value)}" type="${name.includes("date")||["due","start","end","date"].includes(name)?"date":name==="time"?"time":"text"}">`}</div>`}
function selectField(label,name,opts,selected=""){return `<div class="field"><label>${label}</label><select id="f_${name}">${opts.map(o=>`<option value="${esc(o[0])}" ${o[0]===selected?"selected":""}>${esc(o[1])}</option>`).join("")}</select></div>`}
function multiSelectField(label,name,opts){return `<div class="field"><label>${label}</label><select id="f_${name}" multiple size="5">${opts.map(o=>`<option value="${esc(o[0])}">${esc(o[1])}</option>`).join("")}</select><div class="row-sub">Hold Ctrl/Cmd to select multiple staff.</div></div>`}
function modalButtons(label,action){return `<div class="modal-actions"><button class="secondary" data-close>Cancel</button><button class="primary" data-submit="${action}">${label}</button></div>`}
function submitForm(type){
 const v=n=>$("#f_"+n)?.value||"";
 if(type==="task"){let ids=memberIdsFromSelection(),groupId=v("group");if(groupId) ids=[...new Set([...ids,...groupMembers(groupId)])];let t={id:"t"+Date.now(),title:v("title"),assignee:ids[0]||"",assignees:ids,assignedBy:v("assignedBy"),project:v("project"),event:v("event"),due:v("due"),priority:v("priority")||"Normal",status:"Assigned",progress:0,desc:v("desc"),evidence:[]};if(!t.title||!ids.length||!t.due)return toast("Please select at least one staff member or group and a due date.");data.tasks.push(t);data.activity.push({time:new Date().toISOString().slice(0,16).replace("T"," "),text:`${user(t.assignedBy).name} assigned “${t.title}” to ${ids.length} staff member${ids.length>1?"s":""}${groupId?" via "+data.groups.find(g=>g.id===groupId).name:""}.`,type:"task"});toast(`Task assigned to ${ids.length} staff member${ids.length>1?"s":""}. Notifications queued.`);}
 if(type==="project"){let p={id:"p"+Date.now(),name:v("name"),code:v("code"),status:"Planning",progress:0,start:v("start"),end:v("end"),manager:v("manager")};if(!p.name)return toast("Enter a project name.");data.projects.push(p);data.activity.push({time:new Date().toISOString().slice(0,16).replace("T"," "),text:`New project “${p.name}” created.`,type:"project"});toast("Project created.");}
 if(type==="event"){let e={id:"e"+Date.now(),name:v("name"),date:v("date"),time:v("time"),location:v("location"),progress:0,coordinator:v("coordinator"),budget:Number(v("budget")||0)};if(!e.name||!e.date)return toast("Enter event name and date.");data.events.push(e);data.activity.push({time:new Date().toISOString().slice(0,16).replace("T"," "),text:`New event “${e.name}” created.`,type:"event"});toast("Event created.");}
 save();closeModal();render();
}

function openAdminModal(type){
 let body="";
 if(type==="staff") body=`<h2>Register Staff</h2><div class="field"><label>Full name</label><input id="af_name"></div><div class="field"><label>ID number</label><input id="af_id"></div><div class="field"><label>Registered phone</label><input id="af_phone"></div><div class="field"><label>Official email</label><input id="af_email"></div><div class="field"><label>Rank / position</label><input id="af_rank"></div><div class="field"><label>Directory source</label><select id="af_source"><option>Idhaaree</option><option>Council Directory</option><option>Manual Verified</option></select></div><div class="modal-actions"><button class="secondary" data-close>Cancel</button><button class="primary" id="adminSave">Register Staff</button></div>`;
 if(type==="viewer") body=`<h2>Grant Project-View Access</h2><div class="notice">Admin must verify the person's identity before granting access. Only project progress is visible.</div><div class="field"><label>Full name</label><input id="vf_name"></div><div class="field"><label>Verified phone</label><input id="vf_phone"></div><div class="field"><label>Access scope</label><select id="vf_scope"><option>Project Progress Only</option></select></div><div class="modal-actions"><button class="secondary" data-close>Cancel</button><button class="primary" id="adminSave">Grant View Access</button></div>`;
 if(type==="report") body=`<h2>Generate Report</h2><div class="field"><label>Report</label><select id="rf_type"><option>Project Progress</option><option>Task Performance</option><option>Staff Workload</option><option>Event Completion</option><option>Feedback & Ratings</option><option>Portal Issues</option></select></div><div class="field"><label>Period</label><select id="rf_period"><option>This Month</option><option>This Quarter</option><option>This Year</option></select></div><div class="modal-actions"><button class="secondary" data-close>Cancel</button><button class="primary" id="adminSave">Generate</button></div>`;
 $("#modal").innerHTML=body;$("#modalBackdrop").classList.remove("hidden");
 $("#adminSave").onclick=()=>{
  if(type==="staff"){
   const u={id:"u"+Date.now(),name:$("#af_name").value.trim(),role:$("#af_rank").value.trim(),rank:$("#af_rank").value.trim(),initials:($("#af_name").value.trim().split(/\s+/).map(x=>x[0]).join("").slice(0,2)||"ST").toUpperCase(),idNo:$("#af_id").value.trim(),phone:$("#af_phone").value.trim(),email:$("#af_email").value.trim(),source:$("#af_source").value};
   if(!u.name||!u.idNo||!u.phone)return toast("Name, ID number and phone are required.");
   data.users.push(u);data.activity.push({time:new Date().toISOString().slice(0,16).replace("T"," "),text:`Administrator registered ${u.name} as staff.`,type:"admin"});toast("Staff registered.");save();closeModal();render();
  } else if(type==="viewer"){
   const v={id:"v"+Date.now(),name:$("#vf_name").value.trim(),phone:$("#vf_phone").value.trim(),status:"Approved",scope:"Project Progress Only",approvedBy:"a1",approvedAt:new Date().toLocaleString()};
   if(!v.name||!v.phone)return toast("Name and verified phone are required.");
   data.publicViewers.push(v);toast("View-only access granted.");save();closeModal();render();
  } else {toast($("#rf_type").value+" report generated for "+$("#rf_period").value+".");closeModal();}
 };
}
function approveViewer(id){const v=data.publicViewers.find(x=>x.id===id);if(v){v.status="Approved";v.approvedBy="a1";v.approvedAt=new Date().toLocaleString();save();render();toast("Viewer approved with project-progress-only access.");}}
function resolveIssue(id){const i=data.issues.find(x=>x.id===id);if(i){i.status="Resolved";i.resolution="Resolved by administrator";save();render();toast("Issue marked resolved.");}}
function reportIssue(){const title=prompt("Describe the portal issue:");if(title){data.issues.push({id:"i"+Date.now(),title,severity:"Medium",status:"Open",reportedBy:"Current user",time:new Date().toLocaleString(),resolution:""});save();toast("Issue reported to administrator.");}}
function openTask(id){
 const t=data.tasks.find(x=>x.id===id); if(!t)return;
 const assignees=(t.assignees||[t.assignee]).filter(Boolean);
 $("#modal").innerHTML=`<h2>${esc(t.title)}</h2><div class="notice">${statusBadge(t.status)} &nbsp; ${priorityBadge(t.priority)} &nbsp; Due ${fmtDate(t.due)}</div>
 <div class="section-head"><h2>Assigned staff</h2><span class="muted">${assignees.length} person${assignees.length>1?"s":""}</span></div>
 <div class="list">${assignees.map(id=>`<div class="row"><div class="person"><div class="small-avatar">${user(id).initials}</div><div><b>${esc(user(id).name)}</b><div class="row-sub">${esc(user(id).idNo)} • ${esc(user(id).phone)}</div></div></div>${user(id).source==="Idhaaree"?'<span class="badge blue">Idhaaree</span>':'<span class="badge gray">Council Directory</span>'}</div>`).join("")}</div>
 <div class="section-head"><h2>Progress</h2><b id="progressValue">${t.progress}%</b></div><input id="taskProgress" type="range" min="0" max="100" value="${t.progress}" style="width:100%">
 <div class="field" style="margin-top:14px"><label>Status</label><select id="taskStatus">${["Assigned","In Progress","Completed","On Hold"].map(s=>`<option ${s===t.status?"selected":""}>${s}</option>`).join("")}</select></div>
 <div class="field"><label>Update / staff comment</label><textarea id="taskUpdate" rows="3" placeholder="What has been done? What is pending?"></textarea></div>
 <div class="section-head"><h2>Proof / evidence</h2><span class="muted">Take a photo or upload an image</span></div>
 <div class="evidence-box"><input id="taskPhoto" type="file" accept="image/*" capture="environment"><div id="photoPreview" class="row-sub">On a phone, this can open the camera. The selected image is attached to this task.</div></div>
 ${t.evidence?.length?`<div class="evidence-list">${t.evidence.map((e,i)=>`<div class="evidence-item"><img src="${e.data}" alt="Task proof"><div><b>Proof ${i+1}</b><div class="row-sub">${esc(e.by)} • ${esc(e.time)}</div></div></div>`).join("")}</div>`:""}
 <div class="modal-actions"><button class="secondary" data-close>Close</button><button class="primary" id="saveTask">Save Update & Notify</button></div>`;
 $("#modalBackdrop").classList.remove("hidden");
 $("#taskProgress").oninput=e=>$("#progressValue").textContent=e.target.value+"%";
 let photoData=null;
 $("#taskPhoto").onchange=e=>{let file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{photoData=r.result;$("#photoPreview").innerHTML=`<img src="${r.result}" style="max-width:150px;max-height:110px;border-radius:8px;display:block;margin-top:8px"><div class="row-sub">Ready to attach as proof.</div>`};r.readAsDataURL(file)};
 $("#saveTask").onclick=()=>{
  let old=t.progress;t.progress=Number($("#taskProgress").value);t.status=$("#taskStatus").value;if(t.progress===100)t.status="Completed";
  let note=$("#taskUpdate").value.trim();
  if(photoData){t.evidence ||= [];t.evidence.push({data:photoData,by:user(t.assignees?.[0]||t.assignee).name,time:new Date().toLocaleString()});}
  let text=`${assigneeNames(t)} updated “${t.title}” from ${old}% to ${t.progress}%.`;
  if(note)text+=" "+note;
  if(photoData)text+=" Photo proof attached.";
  data.activity.push({time:new Date().toISOString().slice(0,16).replace("T"," "),text,type:"update"});
  save();closeModal();toast(t.status==="Completed"?"Task completed with proof — Council member notified.":"Task update saved — Council member notified.");render()
 };
}function openProject(id){const p=project(id);$("#modal").innerHTML=`<h2>${esc(p.name)}</h2><div class="notice">${statusBadge(p.status)} • ${esc(p.code)} • ${fmtDate(p.start)} – ${fmtDate(p.end)}</div><div class="section-head"><h2>Overall progress</h2><b>${p.progress}%</b></div>${progressBar(p.progress)}<div class="section-head"><h2>Linked tasks</h2><span class="muted">${data.tasks.filter(t=>t.project===id).length}</span></div><div class="list">${data.tasks.filter(t=>t.project===id).map(taskRow).join("")||'<div class="empty">No linked tasks.</div>'}</div><div class="modal-actions"><button class="secondary" data-close>Close</button></div>`;$("#modalBackdrop").classList.remove("hidden");wire()}
function openEvent(id){const e=event(id);$("#modal").innerHTML=`<h2>🎉 ${esc(e.name)}</h2><div class="notice">${fmtDate(e.date)} • ${esc(e.time)} • ${esc(e.location)}</div><div class="section-head"><h2>Event progress</h2><b>${e.progress}%</b></div>${progressBar(e.progress)}<div class="section-head"><h2>Event tasks</h2><span class="muted">${data.tasks.filter(t=>t.event===id).length}</span></div><div class="list">${data.tasks.filter(t=>t.event===id).map(taskRow).join("")||'<div class="empty">No event tasks.</div>'}</div><div class="modal-actions"><button class="secondary" data-close>Close</button><button class="primary" id="eventTask">＋ Add Event Task</button></div>`;$("#modalBackdrop").classList.remove("hidden");$("#eventTask").onclick=()=>{closeModal();openForm("task");setTimeout(()=>{if($("#f_event"))$("#f_event").value=id},0)};wire()}
function closeModal(){$("#modalBackdrop").classList.add("hidden")}
function toast(msg){$("#toast").textContent=msg;$("#toast").classList.remove("hidden");setTimeout(()=>$("#toast").classList.add("hidden"),2600)}
$("#modalBackdrop").addEventListener("click",e=>{if(e.target===e.currentTarget||e.target.closest("[data-close]"))closeModal()});
$("#nav").addEventListener("click",e=>{const b=e.target.closest("[data-view]");if(!b)return;currentView=b.dataset.view;$("#sidebar")?.classList.remove("open");render()});
$("#quickAdd").onclick=()=>openForm("task");
$("#notifBtn").onclick=()=>toast("3 notifications: 1 overdue task, 2 task updates.");
$("#mobileMenu").onclick=()=>document.querySelector(".sidebar").classList.toggle("open");
document.getElementById("notifDot").style.display="block";
if(typeof toast!=="function"){window.toast=(m)=>alert(m)}
function showLogin(){
 document.body.innerHTML=`<div class="login-screen"><div class="login-card">
 <div class="brand"><div class="brand-mark">C</div><div><strong>Council Hub</strong><span>Digital Monitoring Platform</span></div></div>
 <h1>Sign in</h1><p>Use your Council ID number or registered phone number.</p>
 <label style="font-size:10px;font-weight:700;color:#68778d">ID number / phone</label>
 <input id="loginIdentity" placeholder="e.g. A123456 or 9607000001">
 <button class="primary" id="loginBtn">Sign in securely</button>
 <div class="login-note">Production version: identity will be verified against the Council/Idhaaree staff directory and linked to the registered phone number.</div>
 </div></div>`;
 $("#loginBtn").onclick=()=>{
   const v=$("#loginIdentity").value.trim();
   const found=data.users.find(u=>u.idNo===v||u.phone===v);
   if(!found)return toast("Staff ID/phone not found in this prototype.");
   sessionStorage.setItem("councilLoggedIn",found.id); location.reload();
 };
}
if(!sessionStorage.getItem("councilLoggedIn")) showLogin();
else render();
