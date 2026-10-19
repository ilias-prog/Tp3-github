export const fetchOrders = async () => {
    const response = await fetch("data/orders.json");

    if (!response.ok) {
        throw new Error("Impossible de charger les commandes.");
    }

    return response.json();
};
