"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface InquiryModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const InquiryModalContext = createContext<InquiryModalContextType | undefined>(
  undefined
);

export function InquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <InquiryModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </InquiryModalContext.Provider>
  );
}

export function useInquiryModal() {
  const context = useContext(InquiryModalContext);
  // Return a safe fallback during SSR or when used outside provider
  if (context === undefined) {
    return {
      isOpen: false,
      openModal: () => {},
      closeModal: () => {},
    };
  }
  return context;
}
