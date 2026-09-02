document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('checkout-items-list');
    const checkoutTotals = document.getElementById('checkout-totals');
    const cartCount = document.getElementById('cart-count');
    const paymentForm = document.getElementById('payment-form');

    let cart = JSON.parse(localStorage.getItem('rootcase_cart')) || [];

    function renderCheckoutSummary() {
        cartCount.textContent = cart.length;

        if (cart.length === 0) {
            cartItemsList.innerHTML = `<p style="color: #aaa;">Votre panier est vide.</p>`;
            checkoutTotals.innerHTML = '';
            return;
        }

        let itemsHtml = cart.map(item => `
            <div class="checkout-summary-item">
                <div class="checkout-summary-info">
                    <img src="${item.img}" alt="${item.name}">
                    <span style="font-size: 0.9rem;">${item.name}</span>
                </div>
                <span style="color: var(--primary-bootstrap); font-weight: bold; white-space: nowrap;">${item.price.toFixed(2)} €</span>
            </div>
        `).join('');

        let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        let shipping = 4.90;
        let totalTTC = subtotal + shipping;

        cartItemsList.innerHTML = itemsHtml;

        checkoutTotals.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; color: #aaa; font-size: 0.95rem;">
                <span>Sous-total</span>
                <span>${subtotal.toFixed(2)} €</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: #aaa; font-size: 0.95rem;">
                <span>Frais de port (Expédition physique)</span>
                <span>${shipping.toFixed(2)} €</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 2px solid var(--border-color); padding-top: 1rem; font-size: 1.1rem; font-weight: bold;">
                <span>Total TTC :</span>
                <span style="color: var(--primary-bootstrap);">${totalTTC.toFixed(2)} €</span>
            </div>
        `;
    }

    renderCheckoutSummary();

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Votre panier est vide.");
            return;
        }
        
        // Nettoyage du panier et redirection vers la page plein écran de succès
        localStorage.removeItem('rootcase_cart');
        window.location.href = 'success.html';
    });
});