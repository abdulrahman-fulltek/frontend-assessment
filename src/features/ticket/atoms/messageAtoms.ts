import { atom } from 'jotai'

export interface Message {
  id: string
  author: string
  authorEmail: string
  content: string
  timestamp: Date
  type: 'user' | 'agent'
}

export const selectedMessageIdAtom = atom<string | null>(null)
export const replyToAuthorAtom = atom<string | null>(null)
export const setReplyToAuthorAtom = atom(
  null,
  (get, set, email: string | null) => {
    set(replyToAuthorAtom, email)
  }
)
