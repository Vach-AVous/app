document.addEventListener('DOMContentLoaded', () => {
    const productList = document.querySelector('.product-list');
    const cowList = document.querySelector('.cow-list');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutFormDiv = document.getElementById('checkout-form');
    const customerInfoForm = document.getElementById('customer-info-form');
    const confirmOrderBtn = document.getElementById('confirm-order-btn');

    let cart = [];

    const products = [
        { id: 'p1', name: 'Lait Cru d\'Exception (1L)', price: 3.80, image: 'image/lait.png' },
        { id: 'p2', name: 'Oeufs Bio Plein Air (x6)', price: 5.50, image: 'image/oeuf.png' },
        { id: 'p3', name: 'Fromage Affiné de Chèvre', price: 9.50, image: 'image/chevre.png' },
        { id: 'p4', name: 'Panier du Marché (Légumes de Saison)', price: 25.00, image: 'image/legume.png' },
    ];

    const cows = [
        { id: 'c1', name: 'Marguerite', monthlyPrice: 20.00, description: 'Vache Normande au lait riche et crémeux. Une valeur sûre.', image: 'image/vache/vache1.png' },
        { id: 'c2', name: 'Blanchette', monthlyPrice: 24.00, description: 'Montbéliarde élégante, réputée pour la qualité fromagère de son lait.', image: 'image/vache/vache2.png' },
        { id: 'c3', name: 'Belle', monthlyPrice: 18.00, description: 'Jersiaise douce, son lait est naturellement sucré et doré.', image: 'image/vache/vache3.png' },
        { id: 'c4', name: 'Flocon', monthlyPrice: 22.00, description: 'Abondance rustique, parfaite pour les amateurs de Reblochon.', image: 'image/vache/vache4.png' },
        { id: 'c5', name: 'Rosie', monthlyPrice: 26.00, description: 'Prim\'Holstein productive, un lait idéal pour la consommation quotidienne.', image: 'image/vache/vache5.png' },
        { id: 'c6', name: 'Lola', monthlyPrice: 19.00, description: 'Simmental calme, appréciée pour son lait équilibré et sa docilité.', image: 'image/vache/lolo.png' },
    ];

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toFixed(2)} €</p>
                <button class="add-to-cart-btn cta-button" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-type="product">Ajouter au Panier</button>
            `;
            productList.appendChild(card);
        });
    }

    function renderCows() {
        cowList.innerHTML = '';
        cows.forEach(cow => {
            const card = document.createElement('div');
            card.className = 'cow-card';
            card.innerHTML = `
                <img src="${cow.image}" alt="${cow.name}" loading="lazy">
                <h3>${cow.name}</h3>
                <p>${cow.description}</p>
                <p class="price">${cow.monthlyPrice.toFixed(2)} € / mois</p>
                <button class="rent-cow-btn cta-button" data-id="${cow.id}" data-name="Adoption ${cow.name}" data-price="${cow.monthlyPrice}" data-type="rental">Adopter ${cow.name}</button>
            `;
            cowList.appendChild(card);
        });
    }

    function addToCart(id, name, price, type) {
        const existingItemIndex = cart.findIndex(item => item.id === id && item.type === type);

        if (type === 'rental' && existingItemIndex > -1) {
             alert(`Vous avez déjà adopté ${name.replace('Adoption ','')}. Merci !`);
             return;
        }

        if (existingItemIndex > -1 && type === 'product') {
             cart[existingItemIndex].quantity += 1;
        } else {
             cart.push({ id, name, price, type, quantity: 1 });
        }
        updateCart();
    }

     function removeFromCart(id, type) {
        const itemIndex = cart.findIndex(item => item.id === id && item.type === type);
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1 && type === 'product') {
                cart[itemIndex].quantity -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        updateCart();
    }

    function updateCart() {
        cartItemsList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="empty-cart">Votre panier est encore vide.</li>';
            checkoutFormDiv.style.display = 'none';
            checkoutBtn.style.display = 'block';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                const itemTotal = item.price * item.quantity;
                li.innerHTML = `
                    <span>${item.name} ${item.type === 'product' && item.quantity > 1 ? `(x${item.quantity})` : ''} ${item.type === 'rental' ? '(Adoption Mensuelle)' : ''}</span>
                    <span>${itemTotal.toFixed(2)} €</span>
                    <button class="remove-from-cart-btn" data-id="${item.id}" data-type="${item.type}" title="Retirer">X</button>
                 `;
                cartItemsList.appendChild(li);
                total += itemTotal;
            });
             if (checkoutFormDiv.style.display === 'none') {
                 checkoutBtn.style.display = 'block';
             } else {
                  checkoutBtn.style.display = 'none';
             }
        }

        cartTotalAmount.textContent = total.toFixed(2);
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        checkoutBtn.disabled = cart.length === 0;
    }

    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const { id, name, price, type } = e.target.dataset;
            addToCart(id, name, parseFloat(price), type);
        }
    });

    cowList.addEventListener('click', (e) => {
        if (e.target.classList.contains('rent-cow-btn')) {
            const { id, name, price, type } = e.target.dataset;
            addToCart(id, name, parseFloat(price), type);
        }
    });

     cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart-btn')) {
            const { id, type } = e.target.dataset;
            removeFromCart(id, type);
        }
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            checkoutFormDiv.style.display = 'block';
            checkoutBtn.style.display = 'none';
            checkoutFormDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    customerInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const phoneRegex = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;

        if (!firstName || !lastName || !address || !phone) {
            alert('Veuillez remplir tous les champs, s\'il vous plaît.'); return;
        }
        if (!phoneRegex.test(phone)) {
            alert('Le format du numéro de téléphone n\'est pas valide.'); document.getElementById('phone').focus(); return;
        }

        alert(`Merci beaucoup ${firstName} !\nVotre commande (simulée) de ${cartTotalAmount.textContent} € est bien enregistrée.\nLivraison prévue à : ${address}\nNous vous contacterons au ${phone} si besoin.\n\n(Ceci est une simulation.)`);
        cart = [];
        customerInfoForm.reset();
        updateCart();
        document.getElementById('cart').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    renderProducts();
    renderCows();
    updateCart();
});