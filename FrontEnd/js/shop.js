/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import { getDataFetch, shopItemsUrl, orderUrl } from './modules/helper.js';

const user = JSON.parse(localStorage.getItem('userLoggedIn'));
const els = {
  shopList: document.getElementById('shop-list'),
  logOut: document.getElementById('log-out-btn'),
};

els.logOut.addEventListener('click', () => {
  localStorage.removeItem('userLoggedIn');
  window.location.href = 'login.html';
});

const [itemsArr, error] = await getDataFetch(shopItemsUrl);

console.log('itemsArr ===', itemsArr);
if (error) {
  console.log(error);
}

if (Array.isArray(itemsArr)) {
  renderShopList(itemsArr);
}

function renderShopList(arr) {
  els.shopList.innerHTML = '';
  arr.map(makeOneItemCard).forEach((htmlEl) => {
    els.shopList.append(htmlEl);
  });
}

function makeOneItemCard(IObj) {
  const liEl = document.createElement('li');
  liEl.className = 'card';
  liEl.dataset.itemId = IObj.shop_items_id;
  liEl.innerHTML = `
  <img src="${IObj.image}" alt="photo of ${IObj.name}" />
  <h3 class="prod-name">${IObj.name}</h3>
  <p class="prod-desc">${IObj.description}</p>
  <p class="prod-price">${IObj.price}</p>
  <div class="flex center">
    <button id='first' class="btn">add to order</button>
    <button id='second' class="btn btn-secondary">Delete</button>
  </div>
  `;
  const delBtnEl = liEl.querySelector('#second');
  delBtnEl.addEventListener('click', deleteItem);

  const addToOrderBtnEl = liEl.querySelector('#first');
  addToOrderBtnEl.addEventListener('click', (event) => {
    addToOrder(IObj);
  });

  return liEl;
}

function deleteItem(event) {
  const delBtnEl = event.target;
  const cardEl = delBtnEl.parentElement.parentElement;
  const idToDelete = cardEl.dataset.itemId;
  console.log('deleting Item', idToDelete);
  // isiusti fetch delete
  fetch(`${shopItemsUrl}/${idToDelete}`, {
    method: 'DELETE',
  })
    .then((resp) => {
      console.log('resp ===', resp);
      if (resp.status === 200) {
        console.log('istrinta sekmingai');
        // jei taip tai istrinti pati elementa (el.remove())
        cardEl.remove();
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
  // ar sekmingas istrynimas
}

function addToOrder(obj) {
  console.log('obj ===', obj);
  const orderObj = {
    user_id: user.id,
    shop_item_id: obj.shop_items_id,
    quantity: 1,
    total_price: obj.price,
    status: 'pending',
  };
  fetch(orderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
      alert(data.msg);
    })
    .catch((error) => {
      alert('There has been an error');
    });
}
