// ===== CẤU HÌNH GOOGLE FORM =====
// Bước 1: Tạo Google Form rồi lấy link formResponse.
// Bước 2: Thay action và entry ID dưới đây bằng dữ liệu thật của bạn.
const GOOGLE_FORM_ACTION = ''; // Ví dụ: https://docs.google.com/forms/d/e/FORM_ID/formResponse
const FORM_FIELDS = {
  name: 'entry.111111111',
  phone: 'entry.222222222',
  address: 'entry.333333333',
  note: 'entry.444444444',
  orderDetail: 'entry.555555555'
};

const products = [
  {id:1,name:'Thịt trâu gác bếp',price:1000000,unit:'kg',category:'Thịt gác bếp',img:'assets/thit-trau-gac-bep.jpg'},
  {id:2,name:'Thịt lợn gác bếp',price:500000,unit:'kg',category:'Thịt gác bếp',img:'assets/thit-trau-gac-bep.jpg'},
  {id:3,name:'Lạp xưởng gác bếp',price:500000,unit:'kg',category:'Thịt gác bếp',img:'assets/lap-xuong-gac-bep.jpg'},
  {id:4,name:'Rượu mận',price:80000,unit:'l',category:'Rượu đặc sản',img:'assets/ruou-man.jpg'},
  {id:5,name:'Rượu tam thất',price:100000,unit:'l',category:'Rượu đặc sản',img:'assets/ruou-tam-that.jpg'},
  {id:6,name:'Măng khô rừng',price:220000,unit:'kg',category:'Đồ khô',img:'assets/thit-trau-gac-bep.jpg'},
  {id:7,name:'Mật ong rừng',price:180000,unit:'l',category:'Đồ khô',img:'assets/ruou-man.jpg'},
  {id:8,name:'Chẩm chéo khô',price:70000,unit:'hộp',category:'Đồ khô',img:'assets/lap-xuong-gac-bep.jpg'},
  {id:9,name:'Mắc khén',price:160000,unit:'kg',category:'Đồ khô',img:'assets/thit-trau-gac-bep.jpg'},
  {id:10,name:'Hạt dổi',price:280000,unit:'kg',category:'Đồ khô',img:'assets/lap-xuong-gac-bep.jpg'},
  {id:11,name:'Cá suối gác bếp',price:420000,unit:'kg',category:'Thịt gác bếp',img:'assets/thit-trau-gac-bep.jpg'},
  {id:12,name:'Gà đen hun khói',price:350000,unit:'kg',category:'Thịt gác bếp',img:'assets/lap-xuong-gac-bep.jpg'},
  {id:13,name:'Rượu ngô men lá',price:90000,unit:'l',category:'Rượu đặc sản',img:'assets/ruou-man.jpg'},
  {id:14,name:'Rượu táo mèo',price:85000,unit:'l',category:'Rượu đặc sản',img:'assets/ruou-tam-that.jpg'},
  {id:15,name:'Miến dong bản',price:120000,unit:'kg',category:'Đồ khô',img:'assets/thit-trau-gac-bep.jpg'},
  {id:16,name:'Nấm hương rừng',price:250000,unit:'kg',category:'Đồ khô',img:'assets/ruou-tam-that.jpg'},
  {id:17,name:'Lạc đỏ bản',price:90000,unit:'kg',category:'Đồ khô',img:'assets/ruou-man.jpg'},
  {id:18,name:'Gạo nếp nương',price:55000,unit:'kg',category:'Đồ khô',img:'assets/lap-xuong-gac-bep.jpg'}
];

let currentPage = 1;
const perPage = 6;
const cart = [];
const money = n => n.toLocaleString('vi-VN') + 'đ';

function getFilteredProducts(){
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const cate = document.getElementById('categoryFilter').value;
  return products.filter(p => (cate === 'all' || p.category === cate) && p.name.toLowerCase().includes(q));
}

function renderProducts(){
  const list = getFilteredProducts();
  const start = (currentPage - 1) * perPage;
  const pageItems = list.slice(start, start + perPage);
  document.getElementById('productGrid').innerHTML = pageItems.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${p.name}">
      <div class="card-body">
        <span class="tag">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="price">${money(p.price)}/${p.unit}</p>
        <div class="qty-row">
          <input id="qty-${p.id}" type="number" min="0.1" step="0.1" value="1">
          <button class="btn" onclick="addToCart(${p.id})">Thêm</button>
        </div>
      </div>
    </article>`).join('');
  renderPagination(list.length);
}

function renderPagination(total){
  const pages = Math.max(1, Math.ceil(total / perPage));
  document.getElementById('pagination').innerHTML = Array.from({length:pages},(_,i)=>i+1).map(n =>
    `<button class="page-btn ${n===currentPage?'active':''}" onclick="goPage(${n})">${n}</button>`
  ).join('');
}

function goPage(n){ currentPage = n; renderProducts(); }

function addToCart(id){
  const p = products.find(x => x.id === id);
  const qty = Number(document.getElementById(`qty-${id}`).value || 1);
  const old = cart.find(x => x.id === id);
  if(old) old.qty += qty; else cart.push({...p, qty});
  renderCart();
}

function removeFromCart(id){
  const i = cart.findIndex(x => x.id === id);
  if(i >= 0) cart.splice(i, 1);
  renderCart();
}

function renderCart(){
  const box = document.getElementById('cartBox');
  if(cart.length === 0){
    box.innerHTML = 'Chưa có sản phẩm nào trong giỏ.';
    document.getElementById('orderDetail').value = '';
    return;
  }
  const total = cart.reduce((s,x)=>s + x.price * x.qty, 0);
  const detail = cart.map(x => `${x.name}: ${x.qty} ${x.unit} x ${money(x.price)} = ${money(x.price*x.qty)}`).join('\n');
  document.getElementById('orderDetail').value = detail + `\nTổng tiền: ${money(total)}`;
  box.innerHTML = cart.map(x => `
    <div class="cart-item">
      <div><b>${x.name}</b><br>${x.qty} ${x.unit} x ${money(x.price)}</div>
      <div><b>${money(x.price*x.qty)}</b><br><button onclick="removeFromCart(${x.id})">Xóa</button></div>
    </div>`).join('') + `<h3>Tổng cộng: ${money(total)}</h3>`;
}

document.getElementById('searchInput').addEventListener('input', () => {currentPage=1; renderProducts();});
document.getElementById('categoryFilter').addEventListener('change', () => {currentPage=1; renderProducts();});

document.getElementById('orderForm').addEventListener('submit', function(e){
  e.preventDefault();
  if(cart.length === 0){ alert('Bạn hãy chọn ít nhất 1 sản phẩm.'); return; }

  const data = new FormData(this);
  const orderText = document.getElementById('orderDetail').value;

  if(GOOGLE_FORM_ACTION){
    const form = document.createElement('form');
    form.action = GOOGLE_FORM_ACTION;
    form.method = 'POST';
    form.target = 'hidden_iframe';
    const values = {name:data.get('name'), phone:data.get('phone'), address:data.get('address'), note:data.get('note'), orderDetail:orderText};
    Object.entries(values).forEach(([key,value]) => {
      const input = document.createElement('input');
      input.type = 'hidden'; input.name = FORM_FIELDS[key]; input.value = value;
      form.appendChild(input);
    });
    document.body.appendChild(form); form.submit(); form.remove();
    alert('Đã gửi đơn hàng! Vui lòng quét QR để thanh toán.');
  } else {
    const body = encodeURIComponent(`ĐƠN HÀNG ĐẶC SẢN TRÊN BẢN\n\nHọ tên: ${data.get('name')}\nSĐT: ${data.get('phone')}\nĐịa chỉ: ${data.get('address')}\nGhi chú: ${data.get('note')}\n\n${orderText}`);
    window.location.href = `mailto:your-email@gmail.com?subject=Đơn hàng Đặc sản trên bản&body=${body}`;
  }
});

renderProducts();
renderCart();
