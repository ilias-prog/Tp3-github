import { state } from "./state.js";
import { fetchOrders } from "./orderService.js";
import { renderOrders, renderStats } from "./orderView.js";
import { openOrderModal } from "./orderModal.js";

const searchInput = document.querySelector("#searchInput");
const btnAll = document.querySelector("#btnAll");
const statusButtons = document.querySelectorAll(".status-btn");
const paidOnly = document.querySelector("#paidOnly");
const ordersTableBody = document.querySelector("#ordersTableBody");
const errorMessage = document.querySelector("#errorMessage");

const updateStatusButtons = () => {
    btnAll.classList.toggle("active", state.status === "all");
    statusButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.status === state.status);
    });
};

const getVisibleOrders = () => state.orders.filter(order => {
    const query = state.search.toLowerCase();
    const searchableText = [
        order.client,
        `table ${order.table}`,
        `tableau ${order.table}`,
        ...order.items
    ].join(" ").toLowerCase();
    const matchesSearch = searchableText.includes(query);
    const matchesStatus = state.status === "all" || order.status === state.status;
    const matchesPayment = !state.paidOnly || order.paid;

    return matchesSearch && matchesStatus && matchesPayment;
});

const render = () => {
    renderOrders(getVisibleOrders());
    renderStats(state.orders);
};

searchInput.addEventListener("input", event => {
    state.search = event.target.value.trim();
    render();
});

btnAll.addEventListener("click", () => {
    state.status = "all";
    updateStatusButtons();
    render();
});

statusButtons.forEach(button => {
    button.addEventListener("click", () => {
        state.status = button.dataset.status;
        updateStatusButtons();
        render();
    });
});

paidOnly.addEventListener("change", event => {
    state.paidOnly = event.target.checked;
    render();
});

ordersTableBody.addEventListener("click", event => {
    const button = event.target.closest(".details-btn");

    if (!button) {
        return;
    }

    const orderId = Number(button.dataset.id);
    const order = state.orders.find(item => item.id === orderId);

    if (!order) {
        return;
    }

    openOrderModal(order);
});

const init = async () => {
    try {
        state.orders = await fetchOrders();
        render();
    } catch (error) {
        console.error(error);
        errorMessage.classList.remove("d-none");
    }
};

init();
