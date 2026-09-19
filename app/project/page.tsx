'use client';

import { useState } from "react";
import { ArrowRight, BookOpen, CalendarDays, Check, ChevronRight, Clock3, FileText, Lightbulb, Mic2, Play, Plus, Sparkles, Users } from "lucide-react";

const stages = [
  ["01","النص","Texte"],["02","التكييف","Adaptation"],["03","الأدوار","Rôles"],["04","الإخراج","Mise en scène"],["05","التداريب","Répétitions"],["06","التقييم","Évaluation"],["07","العرض","Spectacle"]
];

const sessions = [
  {n:1,title:"قراءة وفهم النص",fr:"Lecture et compréhension",status:"done"},
  {n:2,title:"الصوت والنطق",fr:"Voix et diction",status:"done"},
  {n:3,title:"التعبير والحركة",fr:"Expression et mouvement",status:"done"},
  {n:4,title:"اشتغال المشهد الأول",fr:"Travail de la scène 1",status:"done"},
  {n:5,title:"اشتغال المشهد الثاني",fr:"Travail de la scène 2",status:"done"},
  {n:6,title:"ربط المشاهد",fr:"Enchaînement des scènes",status:"done"},
  {n:7,title:"الإيقاع والدخول والخروج",fr:"Rythme, entrées et sorties",status:"current"},
  {n:8,title:"التدريب الكامل",fr:"Répétition complète",status:"next"}
];

const characters = [
  ["هارباغون","Harpagon","رئيسية","صعب"],["كلِيانط","Cléante","رئيسية","متوسط"],["إليز","Élise","رئيسية","متوسط"],["فالير","Valère","ثانوية","متوسط"],["الراوي","Narrateur","راوي","سهل"]
];

export default function ProjectPage(){
  const [fr,setFr]=useState(false);
  const [active,setActive]=useState(3);
  const [suggestion,setSuggestion]=useState(false);
  const tr=(ar:string,f:string)=>fr?f:ar;
  return <main className="main" style={{marginRight:0,minHeight:"100vh"}}>
    <header className="top">
      <div><div className="eyebrow">🎭 MASRAHI</div><h1 style={{margin:"4px 0",fontSize:26}}>{tr("البخيل","L’Avare")}</h1><span className="muted">موليير · الثانية إعدادي · 18 تلميذ · 25 دقيقة</span></div>
      <div style={{display:"flex",gap:8}}><button className="lang" onClick={()=>setFr(!fr)}>{fr?"العربية":"Français"}</button><button className="btn secondary" onClick={()=>history.back()}><ArrowRight size={16}/>&nbsp;{tr("العودة للمشاريع","Retour aux projets")}</button></div>
    </header>

    <section className="card" style={{padding:20}}>
      <div className="section-head"><div><h2>{tr("رحلة المشروع","Parcours du projet")}</h2><span className="muted">{tr("المرحلة الحالية: الإخراج","Étape actuelle : mise en scène")}</span></div><strong style={{color:"#711f36"}}>68%</strong></div>
      <div className="progress"><i style={{width:"68%"}}/></div>
      <div className="journey">{stages.map((s,i)=><button key={s[0]} onClick={()=>setActive(i)} className={"step "+(i<3?"done ":"")+(i===active?"now":"")} style={{border:"1px solid",cursor:"pointer"}}><b>{i<3?<Check size={16}/>:s[0]}</b>{fr?s[2]:s[1]}</button>)}</div>
    </section>

    <section className="section">
      <div className="section-head"><div><h2>{tr("لوحة الإخراج","Mise en scène")}</h2><span className="muted">{tr("تنظيم المشاهد والحركة والصوت والإيقاع","Organiser scènes, mouvements, voix et rythme")}</span></div><button className="btn primary"><Plus size={16}/>&nbsp;{tr("إضافة مشهد","Ajouter une scène")}</button></div>
      <div className="projects" style={{gridTemplateColumns:"2fr 1fr"}}>
        <article className="card">
          <div className="card-top"><span className="tag">{tr("المشهد 1","Scène 1")}</span><span className="muted">05:30</span></div>
          <h3>{tr("هارباغون يكتشف اختفاء المال","Harpagon découvre la disparition de l'argent")}</h3>
          <div className="meta" style={{lineHeight:1.8}}>{tr("المكان: ساحة البيت · الزمن: مساء · الدخول: هارباغون من اليمين","Lieu : cour de la maison · Temps : soir · Entrée : Harpagon à droite")}</div>
          <div style={{display:"grid",gap:8,marginTop:16}}>
            {[[Mic2,"الصوت","صوت متوتر، جمل قصيرة، توقفات واضحة"],[Users,"الحركة","يتقدم نحو الوسط ثم يلتفت بسرعة"],[Lightbulb,"الإضاءة","إضاءة دافئة ثم انتقال خفيف عند اكتشاف السر"]].map(([Icon,a,b])=><div key={String(a)} style={{display:"flex",gap:10,alignItems:"center",padding:10,borderRadius:12,background:"#faf7f4"}}><Icon size={17}/><div><strong style={{fontSize:12}}>{tr(String(a),String(a))}</strong><div className="muted">{tr(String(b),String(b))}</div></div></div>)}</div>
        </article>
        <article className="card">
          <div className="card-top"><span className="tag">{tr("ملاحظة المخرج","Note du metteur en scène")}</span><Sparkles size={17}/></div>
          <h3 style={{fontSize:16}}>{tr("اجعل اكتشاف هارباغون تدريجيًا","Rendre la découverte progressive")}</h3>
          <p className="muted" style={{lineHeight:1.8}}>{tr("ابدأ بهدوء، ثم زد سرعة الكلام والحركة عندما يفهم أن المال اختفى. اترك صمتًا قصيرًا قبل الجملة الحاسمة.","Commencer calmement, puis accélérer le débit et les mouvements lorsque la disparition est comprise. Garder un court silence avant la phrase clé.")}</p>
          <button className="btn secondary" onClick={()=>setSuggestion(!suggestion)}><Sparkles size={15}/>&nbsp;{tr("اقترح تحسينًا","Suggérer une amélioration")}</button>
          {suggestion&&<div className="tag" style={{display:"block",marginTop:10}}>{tr("جرّب تثبيت باقي الممثلين لحظة الاكتشاف لإبراز التركيز على الشخصية.","Essayez d'immobiliser les autres acteurs au moment de la découverte pour renforcer le focus.")}</div>}
        </article>
      </div>
    </section>

    <section className="section">
      <div className="section-head"><div><h2>{tr("الحصة القادمة","Prochaine séance")}</h2><span className="muted">{tr("الحصة 7 من 12","Séance 7 sur 12")}</span></div><button className="btn primary"><Play size={15}/>&nbsp;{tr("بدء الحصة","Démarrer")}</button></div>
      <article className="card">
        <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}><div className="tag">07</div><strong>{tr("الإيقاع والدخول والخروج","Rythme, entrées et sorties")}</strong><span className="muted"><Clock3 size={14}/> 50 min</span></div>
        <div className="stats" style={{marginTop:14,gridTemplateColumns:"repeat(3,1fr)"}}>
          <div className="stat"><span className="muted">{tr("إحماء","Échauffement")}</span><strong>10'</strong></div>
          <div className="stat"><span className="muted">{tr("تطبيق عملي","Pratique")}</span><strong>30'</strong></div>
          <div className="stat"><span className="muted">{tr("تقويم سريع","Évaluation")}</span><strong>10'</strong></div>
        </div>
      </article>
    </section>

    <section className="section">
      <div className="section-head"><div><h2>{tr("الشخصيات والأدوار","Personnages & rôles")}</h2><span className="muted">{tr("5 شخصيات موزعة","5 personnages distribués")}</span></div><button className="btn secondary"><Users size={15}/>&nbsp;{tr("إدارة الأدوار","Gérer les rôles")}</button></div>
      <div className="projects">{characters.map(c=><article className="card" key={c[0]}><div className="card-top"><strong>{fr?c[1]:c[0]}</strong><span className="tag">{fr?c[2]:c[2]}</span></div><div className="meta" style={{marginTop:8}}>{tr("صعوبة الدور","Difficulté")} · {fr?c[3]:c[3]}</div></article>)}</div>
    </section>
  </main>
}