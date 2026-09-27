'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BarChart3, CalendarDays, CheckCircle2, Clock3, Download, FileText, Users, XCircle } from "lucide-react";

type Session = {
  n: number;
  date: string;
  teacher: string;
  className: string;
  title: string;
  status: "منجزة" | "مبرمجة" | "مؤجلة";
  duration: number;
  attendance: string;
  lesson: string;
};

const sessions: Session[] = [
  { n: 1, date: "29/09/2026", teacher: "أستاذ المسرح", className: "1APIC", title: "تكوين الممثل والتعارف", status: "منجزة", duration: 50, attendance: "18/18", lesson: "الجذاذة 1" },
  { n: 2, date: "06/10/2026", teacher: "أستاذ المسرح", className: "1APIC", title: "التنفس والصوت والنطق", status: "منجزة", duration: 50, attendance: "17/18", lesson: "الجذاذة 2" },
  { n: 3, date: "13/10/2026", teacher: "أستاذ المسرح", className: "1APIC", title: "التعبير الجسدي والحركة", status: "منجزة", duration: 50, attendance: "18/18", lesson: "الجذاذة 3" },
  { n: 4, date: "27/10/2026", teacher: "أستاذ المسرح", className: "1APIC", title: "الارتجال وبناء الشخصية", status: "مبرمجة", duration: 50, attendance: "—", lesson: "الجذاذة 4" },
  { n: 5, date: "03/11/2026", teacher: "أستاذ المسرح", className: "1APIC", title: "الاستماع والتفاعل", status: "مبرمجة", duration: 50, attendance: "—", lesson: "الجذاذة 5" },
  { n: 6, date: "10/11/2026", teacher: "أستاذ المسرح", className: "1APIC", title: "العمل الجماعي في المشهد", status: "مؤجلة", duration: 50, attendance: "—", lesson: "الجذاذة 6" },
];

const statusClass: Record<Session["status"], string> = {
  "منجزة": "tag",
  "مبرمجة": "tag",
  "مؤجلة": "tag",
};

export default function AdminPage() {
  const [status, setStatus] = useState<"الكل" | Session["status"]>("الكل");
  const [teacher, setTeacher] = useState("الكل");
  const [className, setClassName] = useState("الكل");

  const filtered = useMemo(() => sessions.filter((s) =>
    (status === "الكل" || s.status === status) &&
    (teacher === "الكل" || s.teacher === teacher) &&
    (className === "الكل" || s.className === className)
  ), [status, teacher, className]);

  const completed = sessions.filter(s => s.status === "منجزة").length;
  const planned = sessions.filter(s => s.status === "مبرمجة").length;
  const postponed = sessions.filter(s => s.status === "مؤجلة").length;
  const attendance = sessions.filter(s => s.status === "منجزة").reduce((a, s) => {
    const [present, total] = s.attendance.split("/").map(Number);
    return a + (total ? present / total : 0);
  }, 0);
  const attendanceRate = completed ? Math.round((attendance / completed) * 100) : 0;

  return (
    <main className="main" style={{ marginRight: 0, minHeight: "100vh" }}>
      <header className="top">
        <div>
          <div className="eyebrow">🎭 MASRAHI · لوحة الإدارة</div>
          <h1 style={{ margin: "4px 0", fontSize: 26 }}>تقرير الحصص</h1>
          <span className="muted">تتبع حصص المؤسسة حسب الأستاذ والقسم والتاريخ والجذاذة.</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn secondary" onClick={() => window.print()}><Download size={15} />&nbsp;طباعة التقرير</button>
          <Link className="btn secondary" href="/"><ArrowRight size={15} />&nbsp;الرئيسية</Link>
        </div>
      </header>

      <section className="stats">
        <div className="stat"><span className="muted">الحصص المنجزة</span><strong>{completed}</strong><CheckCircle2 size={17} /></div>
        <div className="stat"><span className="muted">الحصص المبرمجة</span><strong>{planned}</strong><CalendarDays size={17} /></div>
        <div className="stat"><span className="muted">الحصص المؤجلة</span><strong>{postponed}</strong><XCircle size={17} /></div>
        <div className="stat"><span className="muted">نسبة الحضور</span><strong>{attendanceRate}%</strong><Users size={17} /></div>
      </section>

      <section className="section">
        <div className="card">
          <div className="section-head">
            <div>
              <h2>تصفية التقرير</h2>
              <span className="muted">اختر المعايير لعرض الحصص المطلوبة.</span>
            </div>
            <BarChart3 size={20} />
          </div>
          <div className="formgrid">
            <div className="field"><label>الأستاذ</label><select value={teacher} onChange={e => setTeacher(e.target.value)}><option>الكل</option><option>أستاذ المسرح</option></select></div>
            <div className="field"><label>القسم</label><select value={className} onChange={e => setClassName(e.target.value)}><option>الكل</option><option>1APIC</option></select></div>
            <div className="field"><label>حالة الحصة</label><select value={status} onChange={e => setStatus(e.target.value as typeof status)}><option>الكل</option><option>منجزة</option><option>مبرمجة</option><option>مؤجلة</option></select></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div><h2>تفاصيل الحصص</h2><span className="muted">{filtered.length} حصة مطابقة للمعايير</span></div>
          <span className="muted"><Clock3 size={14} /> 50 دقيقة للحصة</span>
        </div>
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 850 }}>
            <thead><tr>{["الحصة","التاريخ","الأستاذ","القسم","موضوع الحصة","الجذاذة","الحضور","الحالة"].map(h => <th key={h} style={{ textAlign: "right", padding: 12, borderBottom: "1px solid #eee3db", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
            <tbody>{filtered.map(s => <tr key={s.n}>
              <td style={{ padding: 12, borderBottom: "1px solid #f1e9e3" }}><strong>{s.n}</strong></td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1e9e3" }}>{s.date}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1e9e3" }}>{s.teacher}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1e9e3" }}>{s.className}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1e9e3" }}>{s.title}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1e9e3" }}><span className={statusClass[s.status]}>{s.lesson}</span></td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1e9e3" }}>{s.attendance}</td>
              <td style={{ padding: 12, borderBottom: "1px solid #f1e9e3" }}><span className="tag">{s.status}</span></td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="projects" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <article className="card"><FileText size={18} /><h3>تقرير الحصص</h3><p className="muted">جميع الحصص مع التاريخ والقسم والأستاذ والجذاذة.</p></article>
          <article className="card"><BarChart3 size={18} /><h3>مؤشرات الإنجاز</h3><p className="muted">نسبة المنجز والمبرمج والمؤجل والحضور.</p></article>
          <article className="card"><CalendarDays size={18} /><h3>البرنامج السنوي</h3><p className="muted">ربط التقرير بالبرنامج والجذاذات الخاصة بـ1APIC.</p></article>
        </div>
      </section>
    </main>
  );
}
