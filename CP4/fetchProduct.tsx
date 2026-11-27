import { create } from "zustand"
import axios from "axios"
import { client } from "./Clients.ts"
import type { Product } from "./Product"

type RequestState<T> =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "success"; data: T }

interface ProductStore {
    state: RequestState<Product[]>
    fetchProducts: () => Promise<void>
}

export const useProductStore = create<ProductStore>((set) => ({
    state: { status: "idle" },

    fetchProducts: async () => {
        set({state: {status: "loading"}})
        try {
            const response = await client.get<Product[]>("/products")
            set({ state: { status: "success", data: response.data } })
        }catch (error: unknown) {
            set({state: {status: "error", message: axios.isAxiosError(error) ? error.message : "Неизвестная ошибка"}})
        }
    }
}))
const test = async () => {
    await useProductStore.getState().fetchProducts();
    console.log(useProductStore.getState().state);
};
test();