import type { ReactNode } from "react";
import type React from "react";
import { create } from "zustand";

export interface ModalProps {
  id: string;
  title?: string | ReactNode;
  content: React.ReactNode;
  onClose?: () => void;
}

interface ModalState {
  modals: ModalProps[];
  openModal: (modal: Omit<ModalProps, "id">) => string;
  closeModal: (id: string) => void;
  closeAll: () => void;
}

export type OpenModalFn = ModalState["openModal"];

export const useModalStore = create<ModalState>((set) => ({
  modals: [],

  openModal: (modal) => {
    const id = crypto.randomUUID();
    set((state) => ({
      modals: [...state.modals, { ...modal, id }],
    }));
    return id;
  },

  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    })),

  closeAll: () => set({ modals: [] }),
}));
