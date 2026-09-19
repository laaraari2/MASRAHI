import {NextResponse} from "next/server";
export async function POST(req:Request){
  const {action,level="الثانية إعدادي",students=18,duration=25}=await req.json();
  const suggestions:Record<string,string>={
    adapt:"بسّط الجمل الطويلة، قلّل الشخصيات الثانوية، حافظ على الصراع الرئيسي، وأضف راويًا عند الحاجة.",
    roles:`اقترح توزيعًا لـ ${students} تلميذًا: أدوار رئيسية، أدوار ثانوية، راوي، ومجموعة، مع مراعاة مستوى ${level}.`,
    session:"الحصة المقترحة: 10 دقائق إحماء صوتي وحركي، 30 دقيقة اشتغال على المشهد الأصعب، و10 دقائق تقويم جماعي سريع.",
    duration:`للوصول إلى عرض مدته ${duration} دقيقة: اختصر التكرار، حافظ على المشاهد المحورية، واجعل الانتقالات مباشرة.`
  };
  return NextResponse.json({ok:true,text:suggestions[action]||"اختر عملية من عمليات المساعد المسرحي."});
}