/* eslint-disable no-use-before-define */
// eslint-disable-next-line import/extensions
import { usersUrl, orderUrl } from './modules/helper.js';

const user = JSON.parse(localStorage.getItem('userLoggedIn'));
if (user === null) {
  window.location.href = 'login.html';
}
const isUserAdmin = user?.role_id === 1;

const els = {
  usersSelect: document.getElementById('user'),
  navAddItem: document.getElementById('add-item'),
  logOut: document.getElementById('log-out-btn'),
  result: document.getElementById('table-data'),
};

if (!isUserAdmin) {
  els.usersSelect.classList.add('hidden');
  els.navAddItem.classList.add('hidden');
}

els.logOut.addEventListener('click', () => {
  localStorage.removeItem('userLoggedIn');
  window.location.href = 'login.html';
});

if (!isUserAdmin && user) {
  getOrdersByUserId(user.id);
} else if (user === null) {
  // eslint-disable-next-line no-alert
  alert('you must log in');
} else {
  fetch(usersUrl)
    .then((resp) => resp.json())
    .then((data) => {
      createSelectOpt(data);
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });

  if (els.usersSelect.value === 'User') {
    getAll();
  }
}

els.usersSelect.addEventListener('change', () => {
  if (els.usersSelect.value === 'User') {
    getAll();
  } else {
    getOrdersByUserId(els.usersSelect.value);
  }
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

function getAll() {
  fetch(orderUrl)
    .then((resp) => resp.json())
    .then((data) => {
      renderTableRow(data);
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}

function getOrdersByUserId(id) {
  fetch(`${orderUrl}/user/${id}`)
    .then((resp) => resp.json())
    .then((data) => {
      renderTableRow(data);
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}
