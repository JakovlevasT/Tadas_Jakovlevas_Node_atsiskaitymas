/* eslint-disable guard-for-in */
import { loginUrl } from './modules/helper.js';

console.log('login.js file was loaded');

const els = {
  form: document.forms[0],
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  errorList: document.getElementById('errors-list'),
};

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
      if (data !== 'Success') {
        showError(data);
        return;
      }
      console.log('klaidu nera');
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
