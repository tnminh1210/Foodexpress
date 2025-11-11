// Dán đoạn mã này vào file main.js

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