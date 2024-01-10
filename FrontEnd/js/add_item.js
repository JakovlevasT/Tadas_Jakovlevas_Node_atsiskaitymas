/* eslint-disable guard-for-in */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/extensions
import { itemUrl, shopItemsUrl } from './modules/helper.js';

const user = JSON.parse(localStorage.getItem('userLoggedIn'));
if (user === null) {
  window.location.href = 'login.html';
}
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
    generateSelectOpt(data);
  })
  .catch((error) => {
    console.warn('ivyko klaida:', error);
  });

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  removeErrorClass(els.name);
  removeErrorClass(els.price);
  removeErrorClass(els.description);
  removeErrorClass(els.image);
  removeErrorClass(els.item_type_id);

  const itemObj = {
    name: els.name.value.trim(),
    price: els.price.value,
    description: els.description.value.trim(),
    image: els.image.value.trim(),
    item_type_id: els.item_type_id.value,
  };
  fetch(shopItemsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
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
      value.classList.add('is-invalid');
      value.nextElementSibling.textContent = found.error;
    }
  }
}

function removeErrorClass(el) {
  if (el.classList.contains('is-invalid')) {
    el.classList.remove('is-invalid');
    // eslint-disable-next-line no-param-reassign
    el.nextElementSibling.textContent = '';
  }
}
