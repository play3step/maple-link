import { create } from 'zustand'

export type ModalType =
  | 'createGuild'
  | 'detectMember'
  | 'detailMember'
  | 'eventList'
  | 'createPromotion'
  | 'createRoom'
  | null

interface StoreState {
  activeModal: ModalType
  openModal: (name: ModalType) => void
  closeModal: () => void
}

export const useModalStore = create<StoreState>(set => ({
  activeModal: null,
  openModal: (name: ModalType) => {
    set({ activeModal: name })
  },
  closeModal: () => {
    set({ activeModal: null })
  }
}))
