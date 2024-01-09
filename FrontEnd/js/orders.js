/* eslint-disable no-use-before-define */
import { usersUrl, orderUrl } from './modules/helper.js';

console.log('orders.js file was loaded');

const els = {
  usersSelect: document.getElementById('user'),
  result: document.getElementById('table-data'),
};

fetch(usersUrl)
  .then((resp) => resp.json())
  .then((data) => {
    createSelectOpt(data);
    console.log(data);
  })
  .catch((error) => {
    console.warn('ivyko klaida:', error);
  });

if (els.usersSelect.value === 'User') {
  fetch(orderUrl)
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
      renderTableRow(data);
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}

els.usersSelect.addEventListener('change', () => {
  console.log(els.usersSelect.value);

  fetch(`${orderUrl}/user/${els.usersSelect.value}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
      renderTableRow(data);
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
});

function createSelectOpt(arr) {
  const selectOpt = arr.forEach((arrObj) => {
    const opt = document.createElement('option');
    opt.value = arrObj.user_id;
    opt.textContent = arrObj.user_name;
    els.usersSelect.append(opt);
  });
  return selectOpt;
}

function renderTableRow(arr) {
  els.result.innerHTML = '';
  arr.map(makeOneTableRow).forEach((htmlEl) => {
    els.result.append(htmlEl);
  });
}

function makeOneTableRow(tObj) {
  console.log('tObj ===', tObj);
  const trEl = document.createElement('tr');
  trEl.innerHTML = `
  <td>${tObj.user_name}</td>
  <td>${tObj.name}</td>
  <td>${tObj.price}</td>
  <td>${tObj.quantity}</td>
  <td>${tObj.quantity * tObj.price}</td>
  <td>${tObj.status}</td>
  `;
  return trEl;
}
