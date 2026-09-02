document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('drawer');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const productCards = document.querySelectorAll('.product-card');
    const drawerContent = document.getElementById('drawer-content');

    const cartBtn = document.getElementById('cart-btn');
    const cartBtnMobile = document.getElementById('cart-btn-mobile');
    const cartCountDesktop = document.getElementById('cart-count-desktop');
    const cartCountMobile = document.getElementById('cart-count');

    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.querySelector('.nav-links');

    let cart = [];

    const productsData = {
        'crayon-primary': { name: 'Crayon Bootstrap Primary', price: 2.50, img: 'img/crayon-primary.png' },
        'crayon-secondary': { name: 'Crayon Bootstrap Secondary', price: 2.50, img: 'img/crayon-secondary.png' },
        'crayon-hb': { name: 'Crayon HB', price: 2.50, img: 'img/crayon-hb.png' },
        'crayon-b': { name: 'Crayon B', price: 2.50, img: 'img/crayon-b.png' },
        'crayon-2b': { name: 'Crayon 2B', price: 2.50, img: 'img/crayon-2b.png' },
        'crayon-h': { name: 'Crayon H', price: 2.50, img: 'img/crayon-h.png' },
        'crayon-dark': { name: 'Crayon Dark', price: 2.50, img: 'img/crayon-dark.png' },
        'crayon-light': { name: 'Crayon Light', price: 2.50, img: 'img/crayon-light.png' },
        'crayon-success': { name: 'Crayon Success', price: 2.50, img: 'img/crayon-success.png' },
        'crayon-warning': { name: 'Crayon Warning', price: 2.50, img: 'img/crayon-warning.png' },
        'crayon-danger': { name: 'Crayon Danger', price: 2.50, img: 'img/crayon-danger.png' },
        'crayon-info': { name: 'Crayon Info', price: 2.50, img: 'img/crayon-info.png' },
        'regle': { name: 'Règle de gabarit UI/UX', price: 12.00, img: 'img/regle-seule.png' },
        'gomme': { name: 'Gomme technique', price: 3.00, img: 'img/Gomme.png' },
        'taille-crayon': { name: 'Taille-crayon', price: 4.00, img: 'img/Taille-crayon.png' },
        'clef-usb': { name: 'Clé USB Design System', price: 15.00, img: 'img/clef-usb.png' },
        'eventaille': { name: 'Éventail de couleurs', price: 18.00, img: 'img/eventaille-couleur.png' },
        'pochette': { name: 'Pochette de rangement', price: 20.00, img: 'img/pochette.png' },
        'bloc-portrait': { name: 'Bloc Notes Portrait', price: 8.00, img: 'img/bloc-portrait.png' },
        'bloc-paysage': { name: 'Bloc Notes Paysage', price: 8.00, img: 'img/bloc-paysage.png' }
    };

    function updateCartDisplay() {
        const countStr = cart.length.toString();
        if (cartCountDesktop) cartCountDesktop.textContent = countStr;
        if (cartCountMobile) cartCountMobile.textContent = countStr;
    }

    function renderCartDrawer() {
        if (cart.length === 0) {
            drawerContent.innerHTML = `<h3>Votre Panier</h3><p>Aucun article sélectionné.</p>`;
        } else {
            let itemsHtml = cart.map(item => `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #333; padding-bottom: 0.5rem;">
                    <span style="font-size: 0.9rem; flex-grow: 1; padding-right: 1rem;">${item.name}</span>
                    <span style="color: var(--primary-bootstrap); font-weight: bold; margin-right: 1rem; white-space: nowrap;">${item.price.toFixed(2)} €</span>
                    <button class="remove-item-btn" data-id="${item.id}" style="background: none; border: none; color: #ff4d4d; font-size: 1.2rem; cursor: pointer; padding: 0 0.3rem;" title="Supprimer">&times;</button>
                </div>
            `).join('');

            let totalTTC = cart.reduce((sum, item) => sum + item.price, 0);

            drawerContent.innerHTML = `
                <h3>Votre Panier</h3>
                <div style="margin-top: 1.5rem;">${itemsHtml}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; border-top: 2px solid var(--border-color); padding-top: 1rem; font-size: 1.1rem; font-weight: bold;">
                    <span>Total TTC :</span>
                    <span style="color: var(--primary-bootstrap);">${totalTTC.toFixed(2)} €</span>
                </div>
                <button class="cart-btn validate-order-btn" style="width: 100%; margin-top: 1.5rem; padding: 0.8rem; cursor: pointer;">Valider la commande</button>
            `;

            document.querySelectorAll('.remove-item-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idToRemove = e.currentTarget.getAttribute('data-id');

                    cart = cart.filter(item => item.id !== idToRemove);

                    const targetCard = document.querySelector(`.product-card[data-product="${idToRemove}"]`);
                    if (targetCard) {
                        targetCard.classList.remove('selected');
                    }

                    updateCartDisplay();
                    renderCartDrawer();
                });
            });

            const validateBtn = drawerContent.querySelector('.validate-order-btn');
            if (validateBtn) {
                validateBtn.addEventListener('click', () => {
                    localStorage.setItem('rootcase_cart', JSON.stringify(cart));
                    window.location.href = 'checkout.html';
                });
            }
        }
    }

    productCards.forEach(card => {
        const badge = card.querySelector('.select-badge');
        const productId = card.getAttribute('data-product');
        const product = productsData[productId];

        if (badge) {
            badge.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.toggle('selected');

                if (card.classList.contains('selected')) {
                    if (product && !cart.some(item => item.id === productId)) {
                        cart.push({ id: productId, ...product });
                    }
                } else {
                    cart = cart.filter(item => item.id !== productId);
                }

                updateCartDisplay();
            });
        }

        card.addEventListener('click', () => {
            if (product) {
                drawerContent.innerHTML = `
                    <div style="text-align: center;">
                        <img src="${product.img}" alt="${product.name}" style="max-height: 180px; width: auto; margin-bottom: 1rem; object-fit: contain;">
                        <h3>${product.name}</h3>
                        <p style="color: var(--primary-bootstrap); font-weight: bold; font-size: 1.2rem;">${product.price.toFixed(2)} €</p>
                        <button class="cart-btn" style="width: 100%; margin-top: 1.5rem; padding: 0.8rem;">Ajouter au panier</button>
                    </div>
                `;
            } else {
                drawerContent.innerHTML = `<p>Article bientôt disponible.</p>`;
            }

            drawer.classList.add('open');
        });
    });

    const openCartHandler = () => {
        renderCartDrawer();
        drawer.classList.add('open');
        if (burgerMenu && navLinks) {
            burgerMenu.classList.remove('open');
            navLinks.classList.remove('active');
        }
    };

    if (cartBtn) cartBtn.addEventListener('click', openCartHandler);
    if (cartBtnMobile) cartBtnMobile.addEventListener('click', openCartHandler);

    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', () => {
            drawer.classList.remove('open');
        });
    }

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('open');
            navLinks.classList.toggle('active');
        });

        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                burgerMenu.classList.remove('open');
                navLinks.classList.remove('active');
            });
        });
    }
});