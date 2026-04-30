const products = [
    { id: 1, name: 'Beras Pandan Wangi 5kg', price: 65000, category: 'sembako', stock: 'available', image: '/assets/products.png' },
    { id: 2, name: 'Minyak Goreng SunCo 2L', price: 34000, category: 'sembako', stock: 'low', image: '/assets/products.png' },
    { id: 3, name: 'Gula Pasir Gulaku 1kg', price: 16000, category: 'sembako', stock: 'available', image: '/assets/products.png' },
    { id: 4, name: 'Susu Kental Manis Frisian Flag', price: 12000, category: 'sembako', stock: 'available', image: '/assets/products.png' },
    { id: 5, name: 'Garam Dapur 500g', price: 5000, category: 'sembako', stock: 'available', image: '/assets/products.png' },
    { id: 6, name: 'Rokok Sampoerna Mild 16', price: 32000, category: 'rokok', stock: 'available', image: '/assets/products.png' },
    { id: 7, name: 'Rokok Gudang Garam Filter 12', price: 24000, category: 'rokok', stock: 'low', image: '/assets/products.png' },
    { id: 8, name: 'Rokok Marlboro Red', price: 38000, category: 'rokok', stock: 'out', image: '/assets/products.png' },
    { id: 9, name: 'Indomie Goreng Original', price: 3100, category: 'mie', stock: 'available', image: '/assets/products.png' },
    { id: 10, name: 'Sedaap Mie Soto', price: 3000, category: 'mie', stock: 'available', image: '/assets/products.png' },
    { id: 11, name: 'Aqua 600ml', price: 4000, category: 'minuman', stock: 'available', image: '/assets/products.png' },
    { id: 12, name: 'Teh Pucuk Harum 350ml', price: 3500, category: 'minuman', stock: 'available', image: '/assets/products.png' },
    { id: 13, name: 'Sabun Lifebuoy Merah', price: 4500, category: 'sabun', stock: 'available', image: '/assets/products.png' },
    { id: 14, name: 'Shampoo Sunsilk 170ml', price: 22000, category: 'sabun', stock: 'available', image: '/assets/products.png' },
];

const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('productSearch');
const filterChips = document.querySelectorAll('.filter-chip');
const toast = document.getElementById('cart-toast');

let activeCategory = 'all';
let searchQuery = '';

function renderProducts() {
    const filtered = products.filter(p => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    productGrid.innerHTML = filtered.map(p => `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}">
                <span class="stock-label ${p.stock}">${formatStock(p.stock)}</span>
            </div>
            <div class="product-info">
                <span class="product-category">${p.category}</span>
                <h3>${p.name}</h3>
                <p class="product-price">Rp ${p.price.toLocaleString('id-ID')}</p>
                <button class="btn btn-buy" onclick="buyProduct('${p.name}', '${p.stock}')">
                    <i data-lucide="shopping-cart"></i> Beli
                </button>
            </div>
        </div>
    `).join('');
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function formatStock(status) {
    switch(status) {
        case 'available': return 'Stok Tersedia';
        case 'low': return 'Hampir Habis';
        case 'out': return 'Stok Habis';
        default: return status;
    }
}

window.buyProduct = (name, stock) => {
    if (stock === 'out') {
        alert('Maaf, stok ' + name + ' sedang habis.');
        return;
    }
    
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 500);
    }, 3000);
};

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCategory = chip.dataset.category;
        renderProducts();
    });
});

// Initial render
renderProducts();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});
