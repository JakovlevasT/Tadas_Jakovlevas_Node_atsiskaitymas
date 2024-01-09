import { getDataFetch, shopItemsUrl } from './modules/helper.js';

const els = {
  shopList: document.getElementById('shop-list'),
};

console.log('els ===', els);

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
    <button  class="btn">add to order</button>
    <button  class="btn btn-secondary">Delete</button>
  </div>
  `;
  const btnEl = liEl.querySelector('button');
  btnEl.addEventListener('click', deleteItem);

  return liEl;
}

function deleteItem(event) {
  const btnEl = event.target;
  const cardEl = btnEl.parentElement.parentElement;
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
