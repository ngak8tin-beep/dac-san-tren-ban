// ===== CẤU HÌNH GOOGLE FORM =====
// Thay GOOGLE_FORM_ACTION và các entry ID bên dưới nếu muốn lưu đơn vào Google Form/Google Sheet.
const GOOGLE_FORM_ACTION = '';
const FORM_FIELDS = {
  name: 'entry.111111111',
  phone: 'entry.222222222',
  address: 'entry.333333333',
  note: 'entry.444444444',
  orderDetail: 'entry.555555555'
};

const products = [
  {id:1,name:'Thịt trâu gác bếp',price:1000000,unit:'kg',category:'Thịt gác bếp',img:'assets/thit-trau-gac-bep.jpg',desc:'Thịt trâu dai ngọt, thơm mùi khói bếp, chấm chẩm chéo rất hợp.'},
  {id:2,name:'Thịt lợn gác bếp',price:500000,unit:'kg',category:'Thịt gác bếp',img:'assets/thit-trau-gac-bep.jpg',desc:'Miếng thịt đậm đà, vị cay thơm, phù hợp làm món nhắm hoặc quà biếu.'},
  {id:3,name:'Lạp xưởng gác bếp',price:500000,unit:'kg',category:'Thịt gác bếp',img:'assets/lap-xuong-gac-bep.jpg',desc:'Lạp xưởng đỏ đẹp, béo thơm, nướng hoặc chiên đều hấp dẫn.'},
  {id:4,name:'Rượu mận',price:80000,unit:'l',category:'Rượu đặc sản',img:'assets/ruou-man.jpg',desc:'Rượu mận màu đỏ đẹp, hương thơm dịu, vị chua ngọt đặc trưng.'},
  {id:5,name:'Rượu tam thất',price:100000,unit:'l',category:'Rượu đặc sản',img:'assets/ruou-tam-that.jpg',desc:'Rượu ngâm tam thất, hương vị truyền thống, phù hợp làm quà.'},
  {id:6,name:'Măng khô rừng',price:220000,unit:'kg',category:'Đồ khô',img:'assets/thit-trau-gac-bep.jpg',desc:'Măng rừng phơi khô, nấu canh, hầm xương hoặc xào đều ngon.'},
  {id:7,name:'Mật ong rừng',price:180000,unit:'l',category:'Đồ khô',img:'assets/ruou-man.jpg',desc:'Mật ong thơm ngọt, đóng chai gọn gàng, dùng pha nước hoặc làm quà.'},
  {id:8,name:'Chẩm chéo khô',price:70000,unit:'hộp',category:'Đồ khô',img:'assets/lap-xuong-gac-bep.jpg',desc:'Gia vị chấm đặc trưng Tây Bắc, hợp với thịt gác bếp và đồ nướng.'},
  {id:9,name:'Mắc khén',price:160000,unit:'kg',category:'Đồ khô',img:'assets/thit-trau-gac-bep.jpg',desc:'Gia vị núi rừng thơm nồng, dùng ướp thịt, cá và pha chẩm chéo.'},
  {id:10,name:'Hạt dổi',price:280000,unit:'kg',category:'Đồ khô',img:'assets/lap-xuong-gac-bep.jpg',desc:'Hạt dổi thơm đặc biệt, chỉ cần vài hạt đã làm món ăn dậy vị.'},
  {id:11,name:'Cá suối gác bếp',price:420000,unit:'kg',category:'Thịt gác bếp',img:'assets/thit-trau-gac-bep.jpg',desc:'Cá suối hong khói, vị đậm, ăn cùng cơm nóng hoặc nhâm nhi đều ngon.'},
  {id:12,name:'Gà đen hun khói',price:350000,unit:'kg',category:'Thịt gác bếp',img:'assets/lap-xuong-gac-bep.jpg',desc:'Gà hun khói chắc thịt, mùi thơm đặc trưng, chế biến nhanh.'},
  {id:13,name:'Rượu ngô men lá',price:90000,unit:'l',category:'Rượu đặc sản',img:'assets/ruou-man.jpg',desc:'Rượu ngô men lá truyền thống, hương thơm mộc mạc của vùng cao.'},
  {id:14,name:'Rượu táo mèo',price:85000,unit:'l',category:'Rượu đặc sản',img:'assets/ruou-tam-that.jpg',desc:'Vị táo mèo chua dịu, màu vàng nâu đẹp, phù hợp dùng trong bữa tiệc.'},
  {id:15,name:'Miến dong bản',price:120000,unit:'kg',category:'Đồ khô',img:'assets/thit-trau-gac-bep.jpg',desc:'Sợi miến dai trong, nấu canh, xào hoặc ăn lẩu đều hợp.'},
  {id:16,name:'Nấm hương rừng',price:250000,unit:'kg',category:'Đồ khô',img:'assets/ruou-tam-that.jpg',desc:'Nấm hương thơm, dùng nấu canh, hầm gà hoặc làm nhân nem.'},
  {id:17,name:'Lạc đỏ bản',price:90000,unit:'kg',category:'Đồ khô',img:'assets/ruou-man.jpg',desc:'Lạc đỏ hạt chắc, rang giòn thơm, thích hợp làm món ăn vặt.'},
  {id:18,name:'Gạo nếp nương',price:55000,unit:'kg',category:'Đồ khô',img:'assets/lap-xuong-gac-bep.jpg',desc:'Gạo nếp dẻo thơm, dùng đồ xôi, nấu rượu hoặc làm bánh truyền thống.'}
];

let currentPage = 1;
const perPage = 6;
const cart = [];
const money = n => n.toLocaleString('vi-VN') + 'đ';

const $ = selector => document.querySelector(selector);

function showToast(message){
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function getFilteredProducts(){
  const q = $('#searchInput').value.toLowerCase().trim();
  const cate = $('#categoryFilter').value;
  return products.filter(p => {
    const matchCategory = cate === 'all' || p.category === cate;
    const matchSearch = `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });
}

function renderProducts(){
  const list = getFilteredProducts();
  const start = (currentPage - 1) * perPage;
  const pageItems = list.slice(start, start + perPage);

  $('#productGrid').innerHTML = pageItems.length ? pageItems.map(p => `
    <article class="card">
      <div class="thumb">
        <img src="${p.img}" alt="${p.name}">
        <span class="badge">${p.category}</span>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <p class="price">${money(p.price)}/${p.unit}</p>
        <div class="qty-row">
          <input id="qty-${p.id}" type="number" min="0.1" step="0.1" value="1" aria-label="Số lượng ${p.name}">
          <button class="btn primary" onclick="addToCart(${p.id})">Thêm vào giỏ</button>
        </div>
      </div>
    </article>`).join('') : '<div class="empty">Không tìm thấy sản phẩm phù hợp. Hãy thử từ khóa khác.</div>';

  renderPagination(list.length);
}

function renderPagination(total){
  const pages = Math.max(1, Math.ceil(total / perPage));
  if(currentPage > pages) currentPage = pages;
  $('#pagination').innerHTML = Array.from({length:pages},(_,i)=>i+1).map(n =>
    `<button class="page-btn ${n===currentPage?'active':''}" onclick="goPage(${n})">${n}</button>`
  ).join('');
}

function goPage(n){
  currentPage = n;
  renderProducts();
  document.getElementById('products').scrollIntoView({behavior:'smooth'});
}

function addToCart(id){
  const p = products.find(x => x.id === id);
  const qty = Number($(`#qty-${id}`).value || 1);
  if(qty <= 0){ showToast('Số lượng phải lớn hơn 0'); return; }
  const old = cart.find(x => x.id === id);
  if(old) old.qty = Number((old.qty + qty).toFixed(1));
  else cart.push({...p, qty});
  renderCart();
  showToast(`Đã thêm ${p.name} vào giỏ`);
}

function removeFromCart(id){
  const i = cart.findIndex(x => x.id === id);
  if(i >= 0) cart.splice(i, 1);
  renderCart();
}

function clearCart(){
  cart.splice(0, cart.length);
  renderCart();
  showToast('Đã xóa giỏ hàng');
}

function renderCart(){
  const box = $('#cartBox');
  if(cart.length === 0){
    box.innerHTML = '<p class="small">Chưa có sản phẩm nào trong giỏ. Hãy chọn món ở phần sản phẩm.</p>';
    $('#orderDetail').value = '';
    return;
  }
  const total = cart.reduce((s,x)=>s + x.price * x.qty, 0);
  const detail = cart.map(x => `${x.name}: ${x.qty} ${x.unit} x ${money(x.price)} = ${money(x.price*x.qty)}`).join('\n');
  $('#orderDetail').value = detail + `\nTổng tiền: ${money(total)}`;
  box.innerHTML = cart.map(x => `
    <div class="cart-item">
      <div><b>${x.name}</b><br><span class="small">${x.qty} ${x.unit} x ${money(x.price)}</span></div>
      <div><b>${money(x.price*x.qty)}</b><br><button type="button" onclick="removeFromCart(${x.id})">Xóa</button></div>
    </div>`).join('') + `<div class="cart-total"><span>Tổng cộng</span><b>${money(total)}</b></div>`;
}

$('#searchInput').addEventListener('input', () => {currentPage=1; renderProducts();});
$('#categoryFilter').addEventListener('change', () => {currentPage=1; renderProducts();});
$('#clearCartBtn').addEventListener('click', clearCart);

$('#orderForm').addEventListener('submit', function(e){
  e.preventDefault();
  if(cart.length === 0){ showToast('Bạn hãy chọn ít nhất 1 sản phẩm'); return; }

  const data = new FormData(this);
  const orderText = $('#orderDetail').value;

  if(GOOGLE_FORM_ACTION){
    const form = document.createElement('form');
    form.action = GOOGLE_FORM_ACTION;
    form.method = 'POST';
    form.target = 'hidden_iframe';
    const values = {name:data.get('name'), phone:data.get('phone'), address:data.get('address'), note:data.get('note'), orderDetail:orderText};
    Object.entries(values).forEach(([key,value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = FORM_FIELDS[key];
      input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
    form.remove();
    showToast('Đã gửi đơn hàng. Vui lòng quét QR để thanh toán.');
  } else {
    const body = encodeURIComponent(`ĐƠN HÀNG ĐẶC SẢN TRÊN BẢN\n\nHọ tên: ${data.get('name')}\nSĐT: ${data.get('phone')}\nĐịa chỉ: ${data.get('address')}\nGhi chú: ${data.get('note')}\n\n${orderText}`);
    window.location.href = `mailto:your-email@gmail.com?subject=Đơn hàng Đặc sản trên bản&body=${body}`;
  }
});

renderProducts();
renderCart();
