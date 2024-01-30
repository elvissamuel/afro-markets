import { create } from "zustand";

export const handleStates = create((set) => ({
    isBusiness: false,
    isLoading: false,
    loginAuth: false,
    setIsBusiness: (value)=>{
        set((state) => state.isBusiness = value)
    },
    setIsLoading: (value)=>{
        set((state) => state.isLoading = value)
    },
    setLoginAuth: (value)=>{
        set((state) => state.loginAuth = value)
    },
}))