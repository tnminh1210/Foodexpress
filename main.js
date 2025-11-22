// --- PHẦN 3: LOGIC ẨN/HIỆN HEADER KHI SCROLL ---
// (Bạn có thể dán code này vào cuối file main.js)

let lastScrollTop = 0; // Biến để lưu vị trí cuộn cuối cùng
const header = document.querySelector('.header');
const scrollThreshold = 100; // Cần cuộn 100px mới bắt đầu ẩn

window.addEventListener('scroll', function() {
    let currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    // Chỉ thực hiện khi đã cuộn qua ngưỡng
    if (currentScrollTop > scrollThreshold) {
        
        if (currentScrollTop > lastScrollTop) {
            // Đang cuộn xuống (Scroll Down)
            header.classList.add('header-hidden');
        } else {
            // Đang cuộn lên (Scroll Up)
            header.classList.remove('header-hidden');
        }

    } else {
        // Nếu ở gần đầu trang, luôn luôn hiển thị header
        header.classList.remove('header-hidden');
    }

    // Cập nhật vị trí cuộn cuối cùng
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});


// --- THAY THẾ TOÀN BỘ FILE main.js BẰNG MÃ NÀY ---

// -------------------------------------------------------------------
// PHẦN 1: LOGIC CHUYỂN TAB (Dùng cho Home.html)
// -------------------------------------------------------------------

// Lưu trạng thái của tab và nội dung đang hiển thị
let currentViewId = 'home-view';
let currentNavId = 'nav-home';

function showView(event, viewId, navId) {
    // Ngăn trình duyệt nhảy lên đầu trang khi nhấp vào href="#"
    event.preventDefault();

    // 1. Ẩn nội dung cũ
    document.getElementById(currentViewId).style.display = 'none';
    // 2. Bỏ 'active' khỏi tab điều hướng cũ
    document.getElementById(currentNavId).classList.remove('active');

    // 3. Hiển thị nội dung mới
    document.getElementById(viewId).style.display = 'block';
    // 4. Thêm 'active' vào tab điều hướng mới
    document.getElementById(navId).classList.add('active');

    // 5. Cập nhật trạng thái hiện tại
    currentViewId = viewId;
    currentNavId = navId;
}

// -------------------------------------------------------------------
// PHẦN 2: LOGIC GIỎ HÀNG (Dùng cho mọi trang)
// -------------------------------------------------------------------

/**
 * Hàm này chạy khi trang tải xong (DÙ LÀ TRANG NÀO)
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Luôn cập nhật số lượng trên icon giỏ hàng
    updateCartIcon();

    // 2. Gắn sự kiện cho các nút "Thêm" (chỉ chạy nếu tìm thấy nút)
    const addToCartButtons = document.querySelectorAll('.btn-order');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Lấy thông tin từ thuộc tính data-* của nút
            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: parseInt(button.dataset.price),
                img: button.dataset.img
            };
            // Gọi hàm thêm vào giỏ hàng
            addToCart(product);
        });
    });

    // 3. Hiển thị các sản phẩm trong giỏ (chỉ chạy nếu ở trang Cart.html)
    // Chúng ta kiểm tra bằng cách tìm ID của .cart-items
    if (document.querySelector('.cart-items')) {
        displayCartItems();
    }
});


/**
 * Thêm một sản phẩm vào giỏ hàng (trong localStorage)
 * @param {object} product - Đối tượng sản phẩm (id, name, price, img)
 */
function addToCart(product) {
    // Lấy giỏ hàng từ localStorage (hoặc tạo mảng rỗng [])
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Sửa lỗi: dùng []

    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        // Nếu đã có, tăng số lượng
        cart[existingProductIndex].quantity += 1;
    } else {
        // Nếu chưa có, thêm sản phẩm mới với số lượng là 1
        product.quantity = 1;
        cart.push(product);
    }

    // Lưu giỏ hàng mới trở lại localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật lại số trên icon giỏ hàng
    updateCartIcon();
    
}

/**
 * Cập nhật số lượng (cái huy hiệu màu đỏ) trên icon giỏ hàng
 */
function updateCartIcon() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Tính tổng số lượng
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    // Cập nhật TẤT CẢ các bộ đếm trên trang
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalQuantity;
    });
}

/**
 * Hiển thị các sản phẩm từ localStorage ra trang Cart.html
 */
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');

    // Xóa nội dung cũ (mẫu HTML)
    cartItemsContainer.innerHTML = ''; 
    
    // Nếu giỏ hàng rỗng, hiển thị thông báo
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 20px; font-size: 1.2em;">Giỏ hàng của bạn đang trống.</p>';
        updateCartTotal(cart); // Cập nhật tổng tiền về 0
        return;
    }

    // Lặp qua từng sản phẩm trong giỏ và tạo HTML
    cart.forEach(item => {
        const itemTotalPrice = item.price * item.quantity;

        // Tạo một thẻ div cho mỗi sản phẩm
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        // Sửa lỗi: Chuyển giá sang định dạng tiền tệ Việt Nam (có dấu phẩy)
        const formattedPrice = item.price.toLocaleString('vi-VN');
        const formattedTotalPrice = itemTotalPrice.toLocaleString('vi-VN');

        // Đổ HTML vào
        cartItemElement.innerHTML = `
            <div class="product">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-detail">
                    <h4>${item.name}</h4>
                </div>
            </div>
            <span class="price">${formattedPrice}đ</span>
            <div class="quantity">
                <input 
                    type="number" 
                    value="${item.quantity}" 
                    min="1" 
                    onchange="updateQuantity('${item.id}', this.value)"
                >
            </div>
            <span class="total-price">${formattedTotalPrice}đ</span>
            <button class="remove" onclick="removeFromCart('${item.id}')">
                <i class="ri-delete-bin-6-line"></i>
            </button>
        `;
        
        // Thêm sản phẩm vào danh sách
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    // Cập nhật tổng tiền
    updateCartTotal(cart);
}

/**
 * Xóa một sản phẩm khỏi giỏ hàng
 * @param {string} productId - ID của sản phẩm cần xóa
 */
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Lọc ra giỏ hàng mới, BỎ LẠI sản phẩm có ID trùng
    cart = cart.filter(item => item.id !== productId);
    
    // Lưu lại giỏ hàng
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Vẽ lại giỏ hàng và cập nhật icon
    displayCartItems();
    updateCartIcon();
}

/**
 * Cập nhật số lượng của một sản phẩm
 * @param {string} productId - ID của sản phẩm
 * @param {number} newQuantity - Số lượng mới từ ô input
 */
function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const quantity = parseInt(newQuantity);

    // Nếu số lượng nhỏ hơn 1, xóa sản phẩm
    if (quantity < 1) {
        removeFromCart(productId);
        return;
    }

    // Tìm sản phẩm và cập nhật số lượng
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart[productIndex].quantity = quantity;
    }
    
    // Lưu lại và vẽ lại
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Vẽ lại để cập nhật giá
    updateCartIcon();
}

/**
 * Cập nhật bảng tổng tiền ở cuối trang
 * @param {Array} cart - Mảng giỏ hàng
 */
function updateCartTotal(cart) {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const shippingFee = 0; // Tạm thời miễn phí
    const grandTotal = subtotal + shippingFee;

    // Sửa lỗi: Cập nhật tổng tiền
    document.querySelector('.subtotal').textContent = subtotal.toLocaleString('vi-VN') + 'đ';
    document.querySelector('.grand-total').textContent = grandTotal.toLocaleString('vi-VN') + 'đ';
}