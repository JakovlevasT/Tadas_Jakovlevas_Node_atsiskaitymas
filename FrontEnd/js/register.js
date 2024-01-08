/* eslint-disable guard-for-in */
import { rolesUrl, registerUrl } from './modules/helper.js';

console.log('register.js file was loaded');

fetch(rolesUrl)
  .then((resp) => resp.json())
  .then((data) => {
    console.log('data ===', data);
    createSelectOpt(data);
  })
  .catch((error) => {
    console.warn('ivyko klaida:', error);
  });

const els = {
  form: document.forms[0],
  user_name: document.getElementById('user-name'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  rePassword: document.getElementById('re-password'),
  selectField: document.getElementById('role'),
};

els.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const registerObj = {
    name: els.user_name.value.trim(),
    email: els.email.value.trim(),
    password: els.password.value.trim(),
    password2: els.rePassword.value.trim(),
    selectVal: els.selectField.value,
  };
  console.log('value ===', registerObj);

  fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
      showIndividualErrors(data);
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
});

function createSelectOpt(arr) {
  const selectOpt = arr.map((arrObj) => {
    const opt = document.createElement('option');
    opt.value = arrObj.user_roles_id;
    opt.textContent = arrObj.name;
    els.selectField.append(opt);
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
    }
  }
}
