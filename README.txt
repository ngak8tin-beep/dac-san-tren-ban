HƯỚNG DẪN SỬ DỤNG WEBSITE "ĐẶC SẢN TRÊN BẢN"

1. Mở file index.html để xem website.
2. Muốn thay ảnh QR thanh toán: lưu ảnh QR tên qr-thanh-toan.png vào thư mục assets, sau đó có thể thay khối QR trong index.html bằng:
   <img src="assets/qr-thanh-toan.png" alt="QR thanh toán">
3. Muốn nhận đơn bằng Google Form + Google Sheet:
   - Tạo Google Form với câu hỏi: Họ tên, SĐT, Địa chỉ, Ghi chú, Chi tiết đơn hàng.
   - Liên kết Google Form với Google Sheet.
   - Lấy link formResponse và entry ID của từng câu hỏi.
   - Mở script.js, thay GOOGLE_FORM_ACTION và FORM_FIELDS.
4. Upload GitHub Pages:
   - Vào github.com, tạo repository mới.
   - Upload toàn bộ file trong thư mục này.
   - Vào Settings > Pages > Branch: main > Save.
   - Chờ vài phút để nhận link website.
