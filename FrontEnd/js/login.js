/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
import { loginUrl } from './modules/helper.js';

console.log('login.js file was loaded');

const els = {
  form: document.forms[0],
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  errorList: document.getElementById('errors-list'),
  logBtn: document.getElementById('login-btn'),
};

const userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
console.log('userLoggedIn ===', userLoggedIn);

console.log('els ===', els);

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  els.errorList.innerHTML = '';

  const emailVal = els.email.value.trim();
  console.log('emailVal ===', emailVal);
  const passVal = els.password.value.trim();
  console.log('passVal ===', passVal);

  const loginObj = {
    email: emailVal,
    password: passVal,
  };

  fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
      if (data.status === 'error') {
        showError(data.errors);
        return;
      }
      if (data.status === 'Error') {
        console.log('error');
        errorNotFound(data);
        return;
      }

      console.log('data ===', data.email);
      localStorage.setItem(
        'userLoggedIn',
        JSON.stringify({ email: data.user.email })
      );
      console.log('User data stored in local storage');
      window.location.href = 'orders.html';
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
});

function showError(errorArr) {
  errorArr.forEach((eObj) => {
    const liEl = document.createElement('li');
    liEl.textContent = eObj.error;
    els.errorList.append(liEl);
  });
}

function errorNotFound(errObj) {
  const liEl = document.createElement('li');
  liEl.textContent = errObj.errorMsg;
  els.errorList.append(liEl);
}
