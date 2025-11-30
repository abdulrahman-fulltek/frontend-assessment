import { atom } from 'jotai'

export type TicketSidebarSectionKey =
  | 'actions'
  | 'contact'
  | 'relatedTickets'
  | 'details'
  | 'timeline'

export const isTicketDetailsFullscreenAtom = atom<boolean>(false)
export const isReplyEditorFullscreenAtom = atom<boolean>(false)

export const activeTicketSidebarSectionAtom = atom<TicketSidebarSectionKey>('timeline')

// Controls whether the left sidebar content column is visible
export const isLeftSidebarContentVisibleAtom = atom<boolean>(true)

// Controls whether the right-hand طلبات list panel is visible
export const isRequestsPanelOpenAtom = atom<boolean>(true)
