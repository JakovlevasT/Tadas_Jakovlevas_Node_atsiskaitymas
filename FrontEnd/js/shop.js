/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import { getDataFetch, shopItemsUrl, orderUrl } from './modules/helper.js';

const user = JSON.parse(localStorage.getItem('userLoggedIn'));
if (user === null) {
  window.location.href = 'login.html';
}
const isUserAdmin = user?.role_id === 1;
const els = {
  shopList: document.getElementById('shop-list'),
  logOut: document.getElementById('log-out-btn'),
  addItem: document.getElementById('add-item'),
};
if (!isUserAdmin) {
  els.addItem.classList.add('hidden');
}
els.logOut.addEventListener('click', () => {
  localStorage.removeItem('userLoggedIn');
  window.location.href = 'login.html';
});

const [itemsArr, error] = await getDataFetch(shopItemsUrl);

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
  <div class="flex center card-flex">
    <button id='first' class="btn shop-btn btn-secondary">add to order</button>
    <button id='second' class="btn shop-btn btn-secondary">Delete</button>
  </div>
  `;

  const delBtnEl = liEl.querySelector('#second');
  if (!isUserAdmin) {
    delBtnEl.classList.add('hidden');
  } else {
    delBtnEl.addEventListener('click', deleteItem);
  }

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
  fetch(`${shopItemsUrl}/${idToDelete}`, {
    method: 'DELETE',
  })
    .then((resp) => {
      console.log('resp ===', resp);
      if (resp.status === 200) {
        alert('Item was deleted');

        cardEl.remove();
      }
    })
    .catch((error) => {
      alert('ivyko klaida');
    });
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
