import { atom } from 'jotai'

export interface TicketSummary {
  id: string
  title: string
  customer: string
}

// All available tickets (for طلبات list)
export const ticketListAtom = atom<TicketSummary[]>([
  { id: '1', title: 'نواجه مشكلة في عدم عمل واجهة المستخدم', customer: 'أحمد محمد' },
  { id: '2', title: 'خطأ في استعلام قاعدة البيانات', customer: 'فاطمة علي' },
  { id: '3', title: 'بطء في تحميل الصفحة الرئيسية', customer: 'محمد سعيد' },
  { id: '4', title: 'مشكلة في إرسال البريد الإلكتروني للعملاء', customer: 'خالد أحمد' },
  { id: '5', title: 'طلب تحسين تصميم صفحة لوحة التحكم', customer: 'نورة حسن' },
  { id: '6', title: 'استفسار عن حالة التذكرة الحالية', customer: 'عبدالله خالد' },
])

// Ids of tickets with an open tab (no tab open by default)
export const openedTicketIdsAtom = atom<string[]>([])

// Currently selected ticket id (nullable when no tab is active)
export const currentTicketIdAtom = atom<string | null>(null)
