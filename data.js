// Database các nhà hàng
const restaurants = {
    "fries_vietnam": {
        name: "Fries Vietnam - Thế Giới Khoai Tây Chiên",
        address: "89 Nguyễn Thái Học, Phường Cầu Ông Lãnh, Quận 1, TP. HCM",
        rating: 4.5,
        time: "10:00 - 21:30",
        priceRange: "15,000đ - 189,000đ",
        logo: "img/Logo/logo1.png",
        bannerBg: "img/fries.jpg", // Ảnh nền banner (nếu muốn thay đổi)
        menu: [
            { id: "fries_001", name: "Khoai Lõi Vai Bò Mỹ Xốt Phômai", price: 155000, img: "img/1752579882035-Fries7535.jpg" },
            { id: "fries_002", name: "Khoai Lõi Vai Bò Mỹ Xốt Tiêu Đen", price: 145000, img: "img/1752579431586-Fries7508.jpg" },
            // Thêm các món khác vào đây
        ]
    },
    "heypelo": {
        name: "Hey! Pelo - Tacos Pháp",
        address: "11 Hẻm 94 Võ Oanh, Phường 25, Bình Thạnh, TP. HCM",
        rating: 4.8,
        time: "09:00 - 22:00",
        priceRange: "30,000đ - 150,000đ",
        logo: "img/Logo/logo2.jpg",
        menu: [
            { id: "pelo_001", name: "Tacos Size M", price: 45000, img: "img/tacos_m.jpg" }, // Bạn cần có ảnh tương ứng
            { id: "pelo_002", name: "French Fry Special", price: 60000, img: "img/fry_pelo.jpg" }
        ]
    },
    // Bạn copy block trên để thêm comtam, phuclong, v.v...
};