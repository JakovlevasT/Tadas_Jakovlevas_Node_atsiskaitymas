/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
// eslint-disable-next-line import/extensions
import { loginUrl } from './modules/helper.js';

const els = {
  form: document.forms[0],
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  errorList: document.getElementById('errors-list'),
  logBtn: document.getElementById('login-btn'),
};

els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  els.errorList.innerHTML = '';

  const emailVal = els.email.value.trim();
  const passVal = els.password.value.trim();

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
      if (data.status === 'error') {
        showError(data.errors);
        return;
      }
      if (data.status === 'Error') {
        errorNotFound(data);
        return;
      }

      localStorage.setItem(
        'userLoggedIn',
        JSON.stringify({
          email: data.user.email,
          id: data.user.user_id,
          role_id: data.user.role_id,
          // eslint-disable-next-line comma-dangle
        })
      );
      window.location.href = 'shop.html';
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
