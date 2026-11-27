import { useEffect } from "react";
import { useProductStore } from "./fetchProduct";

function ProductList() {
    const state = useProductStore((state) => state.state);

    useEffect(() => {
        useProductStore.getState().fetchProducts();
    }, []);

    if (state.status === "loading") {
        return <p>Загрузка товаров...</p>;
    }

    if (state.status === "error") {
        return <p>Ошибка: {state.message}</p>;
    }

    if (state.status === "idle") {
        return <p>Ожидание...</p>;
    }

    return (
        <div>
            <h2>Список товаров</h2>

            {state.data.map((product) => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <p>Цена: {product.price}</p>
                    <p>В наличии: {product.in_stock ? "Да" : "Нет"}</p>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
}

export default ProductList;