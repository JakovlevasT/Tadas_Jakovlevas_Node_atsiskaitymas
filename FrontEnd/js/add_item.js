/* eslint-disable guard-for-in */
/* eslint-disable no-use-before-define */
import { itemUrl, shopItemsUrl } from './modules/helper.js';

console.log('add_item.js file was loaded');

const els = {
  form: document.forms[0],
  name: document.getElementById('item-name'),
  price: document.getElementById('price'),
  description: document.getElementById('description'),
  image: document.getElementById('image'),
  item_type_id: document.getElementById('item-type'),
};

fetch(itemUrl)
  .then((resp) => resp.json())
  .then((data) => {
    // console.log(data);
    generateSelectOpt(data);
  })
  .catch((error) => {
    console.warn('ivyko klaida:', error);
  });

console.log('els ===', els);

els.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const itemObj = {
    name: els.name.value.trim(),
    price: els.price.value,
    description: els.description.value.trim(),
    image: els.image.value.trim(),
    item_type_id: els.item_type_id.value,
  };
  console.log('value ===', itemObj);
  fetch(shopItemsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (data.status === 'error') {
        showIndividualErrors(data.errors);
      }
      if (data.status === 'success') {
        window.location.href = 'shop.html';
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
});

function generateSelectOpt(arr) {
  const selectOpt = arr.forEach((arrObj) => {
    const opt = document.createElement('option');
    opt.value = arrObj.item_type_id;
    opt.textContent = arrObj.name;
    els.item_type_id.append(opt);
  });
  return selectOpt;
}

function showIndividualErrors(errorArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in els) {
    const value = els[key];
    const found = errorArr.find((eObj) => eObj.field === key);
    if (found) {
      console.log('error ===', found);
      value.classList.add('is-invalid');
      value.nextElementSibling.textContent = found.error;
    }
  }
}
