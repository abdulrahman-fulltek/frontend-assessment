import { atom } from 'jotai'

export interface TicketSummary {
  id: string
  title: string
}

// All available tickets (for طلبات list)
export const ticketListAtom = atom<TicketSummary[]>([
  { id: '1', title: 'نواجه مشكلة في عدم عمل واجهة المستخدم' },
  { id: '2', title: 'خطأ في استعلام قاعدة البيانات' },
  { id: '3', title: 'بطء في تحميل الصفحة الرئيسية' },
  { id: '4', title: 'مشكلة في إرسال البريد الإلكتروني للعملاء' },
  { id: '5', title: 'طلب تحسين تصميم صفحة لوحة التحكم' },
  { id: '6', title: 'استفسار عن حالة التذكرة الحالية' },
])

// Ids of tickets with an open tab (no tab open by default)
export const openedTicketIdsAtom = atom<string[]>([])

// Currently selected ticket id (nullable when no tab is active)
export const currentTicketIdAtom = atom<string | null>(null)
