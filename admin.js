const inventory = [
    { id: 1, name: 'Beras Pandan Wangi 5kg', price: 65000, category: 'Sembako', status: 'available' },
    { id: 2, name: 'Minyak Goreng SunCo 2L', price: 34000, category: 'Sembako', status: 'low' },
    { id: 3, name: 'Gula Pasir Gulaku 1kg', price: 16000, category: 'Sembako', status: 'available' },
    { id: 4, name: 'Rokok Sampoerna Mild 16', price: 32000, category: 'Rokok', status: 'available' },
    { id: 5, name: 'Rokok Marlboro Red', price: 38000, category: 'Rokok', status: 'out' },
    { id: 6, name: 'Indomie Goreng Original', price: 3100, category: 'Mie Instan', status: 'available' },
    { id: 7, name: 'Aqua 600ml', price: 4000, category: 'Minuman', status: 'available' },
    { id: 8, name: 'Sabun Lifebuoy Merah', price: 4500, category: 'Sabun', status: 'available' },
];

const tableBody = document.getElementById('inventoryTable');

function renderInventory() {
    tableBody.innerHTML = inventory.map(item => `
        <tr>
            <td>
                <div style="font-weight: 600;">${item.name}</div>
            </td>
            <td>${item.category}</td>
            <td>Rp ${item.price.toLocaleString('id-ID')}</td>
            <td>
                <span class="status-pill ${item.status}">
                    ${formatStatus(item.status)}
                </span>
            </td>
            <td>
                <button class="actions-btn" title="Edit"><i data-lucide="edit-3"></i></button>
                <button class="actions-btn" title="Delete"><i data-lucide="trash-2"></i></button>
            </td>
        </tr>
    `).join('');
    
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function formatStatus(status) {
    switch(status) {
        case 'available': return 'Stok Tersedia';
        case 'low': return 'Hampir Habis';
        case 'out': return 'Stok Habis';
        default: return status;
    }
}

// Initial render
renderInventory();
