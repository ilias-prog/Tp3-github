const ordersTableBody = document.querySelector("#ordersTableBody");
const resultCount = document.querySelector("#resultCount");
const totalOrders = document.querySelector("#totalOrders");
const deliveredOrders = document.querySelector("#deliveredOrders");
const paidOrders = document.querySelector("#paidOrders");
const totalAmount = document.querySelector("#totalAmount");

const getStatusClass = status => {
    if (status === "Servie") {
        return "status-served";
    }

    if (status === "Prête") {
        return "status-ready";
    }

    if (status === "En préparation") {
        return "status-preparing";
    }

    return "status-cancelled";
};

const createOrderRow = order => `
    <tr>
        <td class="order-number">#${order.id}</td>
        <td>${order.client}</td>
        <td>Table ${order.table}</td>
        <td class="dish-list">${order.items.join(", ")}</td>
        <td>${order.amount} DH</td>
        <td><span class="status ${getStatusClass(order.status)}">${order.status}</span></td>
        <td class="${order.paid ? "payment-paid" : "payment-unpaid"}">
            ${order.paid ? "Payée" : "Non payée"}
        </td>
        <td>${order.date}</td>
        <td>
            <button class="btn btn-sm btn-outline-success details-btn" data-id="${order.id}">
                Détails
            </button>
        </td>
    </tr>
`;

export const renderOrders = orders => {
    resultCount.textContent = `${orders.length} commande(s) affichée(s)`;

    if (orders.length === 0) {
        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center text-muted py-4">
                    Aucune commande trouvée.
                </td>
            </tr>
        `;
        return;
    }

    ordersTableBody.innerHTML = orders.map(createOrderRow).join("");
};

export const renderStats = orders => {
    totalOrders.textContent = orders.length;
    deliveredOrders.textContent = orders.filter(order => order.status === "Servie").length;
    paidOrders.textContent = orders.filter(order => order.paid).length;
    totalAmount.textContent = `${orders.reduce((total, order) => total + order.amount, 0)} DH`;
};
