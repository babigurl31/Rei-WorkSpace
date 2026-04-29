let shopData = JSON.parse(localStorage.getItem('qn_shop')) || [];

function renderShop() {
    const list = document.getElementById('shopList'); list.innerHTML = '';
    shopData.forEach((item, idx) => { list.innerHTML += `<li class="mini-item ${item.done ? 'done' : ''}"><div style="display:flex; gap:8px; align-items:flex-start;"><input type="checkbox" style="margin-top:2px; accent-color:var(--accent);" ${item.done ? 'checked' : ''} onchange="checkShop(${idx})"><span>${item.text}</span></div><button class="mini-del-btn" onclick="delShop(${idx})">✕</button></li>`; });
}
window.addShop = () => {
    const val = document.getElementById('shopInput').value.trim();
    if(val) { shopData.push({text: val, done: false}); localStorage.setItem('qn_shop', JSON.stringify(shopData)); document.getElementById('shopInput').value = ''; renderShop(); }
};
window.checkShop = (idx) => { shopData[idx].done = !shopData[idx].done; localStorage.setItem('qn_shop', JSON.stringify(shopData)); renderShop(); };
window.delShop = (idx) => { shopData.splice(idx, 1); localStorage.setItem('qn_shop', JSON.stringify(shopData)); renderShop(); };

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('shopInput').addEventListener('keypress', e => { if(e.key === 'Enter') addShop(); });
    renderShop();
});
