'use client';

import { useState } from "react";\nimport Link from "next/link";
import { Bell, BookOpen, CalendarDays, CheckCircle2, ChevronLeft, Clapperboard, FileText, Home, Lightbulb, Menu, Music2, Plus, Settings, Sparkles, Theater, Users, X } from "lucide-react";\nimport Link from "next/link";

const nav = [
  ["الرئيسية","Accueil",Home],["مشاريعي","Mes projets",Theater],["النصوص","Textes",BookOpen],["الإعداد والتكييف","Adaptation",FileText],["الشخصيات والأدوار","Personnages & rôles",Users],["الإخراج","Mise en scène",Clapperboard],["برنامج الحصص","Planning",CalendarDays],["التداريب","Répétitions",Sparkles],["الديكور والملابس","Décor & costumes",Lightbulb],["الصوت والإضاءة","Son & lumière",Music2],["التتبع والتقييم","Suivi & évaluation",CheckCircle2],["العرض النهائي","Spectacle final",Theater]
] as const;

export default function HomePage(){
  const [fr,setFr]=useState(false); const [open,setOpen]=useState(false);
  const [project,setProject]=useState({name:"البخيل",level:"الثانية إعدادي",students:"18"});
  const t=fr ? {welcome:"Bienvenue dans votre espace théâtral",sub:"Créez, adaptez, mettez en scène, répétez et présentez votre projet théâtral.",new:"Nouveau projet théâtral",texts:"Explorer les textes",projects:"Mes projets théâtraux",journey:"Le parcours du projet",active:"Projet en cours"} : {welcome:"مرحبًا بك في فضاءك المسرحي 🎭",sub:"أنشئ، أعد، أخرج، درّب، وقدّم مشروعك المسرحي.",new:"مشروع مسرحي جديد",texts:"استكشاف النصوص",projects:"مشاريعي المسرحية",journey:"رحلة المشروع المسرحي",active:"المشروع الحالي"};

  function createProject(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);setProject({name:String(f.get("name")||"مشروعي المسرحي"),level:String(f.get("level")||"الثانية إعدادي"),students:String(f.get("students")||"0")});setOpen(false)}
  return <main className="app">
    <aside className="sidebar">
      <div className="brand">🎭 مَسْرَحِي <small>MASRAHI · من النص إلى الخشبة</small></div>
      <nav className="nav">{nav.map(([ar,frn,Icon],i)=><span key={ar}>{i===2||i===8||i===11?<span className="sep"/>:null}<Link className={i===0?"active":""} href={i===0?"/":i===1?"/project":i===2?"/textes":i===3?"/adaptation":i===4?"/roles":i===6?"/planning":i===7?"/rehearsals":i===8?"/decor":i===9?"/sound":i===10?"/evaluation":i===11?"/final":"#"}><Icon size={16}/>&nbsp; {fr?frn:ar}</Link></span>)}</nav>
      <div className="nav" style={{marginTop:14}}><a href="#"><Settings size={16}/>&nbsp; {fr?"Paramètres":"الإعدادات"}</a></div>
    </aside>
    <section className="main">
      <header className="top"><div><strong>{fr?"MASRAHI":"مَسْرَحِي"}</strong><span className="muted"> · {fr?"Du texte à la scène":"من النص إلى الخشبة"}</span></div><div style={{display:"flex",gap:8,alignItems:"center"}}><button className="lang" onClick={()=>setFr(!fr)}>{fr?"العربية":"Français"}</button><button className="lang" aria-label="notifications"><Bell size={16}/></button><button className="lang" aria-label="menu"><Menu size={16}/></button></div></header>
      <section className="welcome"><div><div className="eyebrow">{fr?"ESPACE ENSEIGNANT":"فضاء الأستاذ"}</div><h1>{t.welcome}</h1><p>{t.sub}</p><div className="actions"><button className="btn primary" onClick={()=>setOpen(true)}><Plus size={17}/>&nbsp;{t.new}</button><button className="btn secondary"><BookOpen size={17}/>&nbsp;{t.texts}</button></div></div><div className="stage">🎭</div></section>

      <section className="section"><div className="section-head"><div><h2>{t.projects}</h2><div className="muted">{fr?"Un projet central, un parcours clair.":"مشروع واحد، ورحلة مسرحية واضحة."}</div></div><button className="btn secondary" onClick={()=>setOpen(true)}><Plus size={15}/></button></div>
        <div className="projects"><Link href="/project" className="card" style={{textDecoration:"none",color:"inherit",display:"block"}}><div className="card-top"><span className="tag">{project.level}</span><span className="muted">68%</span></div><h3>{project.name}</h3><div className="meta">{fr?"Molière":"موليير"} · {project.students} {fr?"élèves":"تلميذ"} · 12 {fr?"séances":"حصة"} · 25 min</div><div className="progress"><i style={{width:"68%"}}/></div><div className="muted">{fr?"Mise en scène · en cours":"الإخراج · قيد الإنجاز"}</div></Link><article className="card" style={{display:"grid",placeItems:"center",minHeight:180}}><Sparkles size={28}/><strong>{fr?"Assistant théâtral":"المساعد المسرحي"}</strong><span className="muted">{fr?"Des suggestions au bon moment":"اقتراحات في الوقت المناسب"}</span></article></div>
      </section>

      <section className="section"><div className="section-head"><h2>{t.journey}</h2><span className="muted">{t.active}: {project.name}</span></div><div className="journey">{["النص","التكييف","الأدوار","الإخراج","التداريب","التقييم","العرض"].map((s,i)=><div className={"step "+(i<3?"done ":"")+(i===3?"now":"")} key={s}><b>{String(i+1).padStart(2,"0")}</b>{fr?["Texte","Adaptation","Rôles","Mise en scène","Répétitions","Évaluation","Spectacle"][i]:s}</div>)}</div></section>

      <section className="section"><div className="stats"><div className="stat"><span className="muted">{fr?"Élèves":"التلاميذ"}</span><strong>{project.students}</strong></div><div className="stat"><span className="muted">{fr?"Séances":"الحصص"}</span><strong>6/12</strong></div><div className="stat"><span className="muted">{fr?"Durée":"المدة"}</span><strong>25'</strong></div><div className="stat"><span className="muted">{fr?"Progression":"التقدم"}</span><strong>68%</strong></div></div></section>
    </section>

    {open && <div className="modal" onMouseDown={()=>setOpen(false)}><div className="modalbox" onMouseDown={e=>e.stopPropagation()}><div className="section-head"><div><h2>{t.new}</h2><div className="muted">{fr?"Créez la base de votre prochain spectacle.":"أنشئ أساس مشروعك المسرحي القادم."}</div></div><button className="lang" onClick={()=>setOpen(false)}><X size={16}/></button></div><form onSubmit={createProject}><div className="formgrid"><div className="field"><label>{fr?"Nom du projet":"اسم المشروع"}</label><input name="name" placeholder={fr?"Ex. Le Petit Prince":"مثال: البخيل"} /></div><div className="field"><label>{fr?"Niveau scolaire":"المستوى الدراسي"}</label><select name="level"><option>الثاني ابتدائي</option><option>الثالث ابتدائي</option><option>الرابع ابتدائي</option><option>الخامس ابتدائي</option><option>الأولى إعدادي</option><option>الثانية إعدادي</option></select></div><div className="field"><label>{fr?"Nombre d'élèves":"عدد التلاميذ"}</label><input name="students" type="number" min="1" placeholder="18" /></div></div><div className="modal-actions"><button className="btn primary" type="submit"><Plus size={16}/>&nbsp;{fr?"Créer le projet":"أنشئ المشروع"}</button><button className="btn secondary" type="button" onClick={()=>setOpen(false)}><ChevronLeft size={16}/>&nbsp;{fr?"Annuler":"إلغاء"}</button></div></form></div></div>}
  </main>
}