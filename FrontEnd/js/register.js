/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
import { rolesUrl, registerUrl } from './modules/helper.js';

fetch(rolesUrl)
  .then((resp) => resp.json())
  .then((data) => {
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
  rePassword: document.getElementById('rePassword'),
  role_id: document.getElementById('role_id'),
  errorList: document.getElementById('error'),
};

els.form.addEventListener('submit', (e) => {
  e.preventDefault();

  removeErrorClass(els.user_name);
  removeErrorClass(els.email);
  removeErrorClass(els.password);
  removeErrorClass(els.rePassword);
  removeErrorClass(els.role_id);

  if (els.password.value !== els.rePassword.value) {
    showIndividualErrors([
      { field: 'rePassword', error: 'passwords does not match' },
    ]);

    return;
  }

  const registerObj = {
    user_name: els.user_name.value.trim(),
    email: els.email.value.trim(),
    password: els.password.value.trim(),
    role_id: els.role_id.value,
  };

  fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerObj),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.status === 'success') {
        return;
      }
      if (data.status === 'error') {
        showIndividualErrors(data.errors);
        errorNotFound(data.errors);
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
});

function createSelectOpt(arr) {
  const selectOpt = arr.forEach((arrObj) => {
    const opt = document.createElement('option');
    opt.value = arrObj.user_roles_id;
    opt.textContent = arrObj.name;
    els.role_id.append(opt);
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

function errorNotFound(errObj) {
  const liEl = document.createElement('li');
  liEl.textContent = errObj.errorMsg;
  els.errorList.append(liEl);
}

function removeErrorClass(el) {
  if (el.classList.contains('is-invalid')) {
    el.classList.remove('is-invalid');
    el.nextElementSibling.textContent = '';
  }
}
