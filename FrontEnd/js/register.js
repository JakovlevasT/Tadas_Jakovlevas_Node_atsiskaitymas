/* eslint-disable no-use-before-define */
/* eslint-disable guard-for-in */
import { rolesUrl, registerUrl, usersUrl } from './modules/helper.js';

console.log('register.js file was loaded');

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
  selectField: document.getElementById('role'),
};

els.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const registerObj = {
    user_name: els.user_name.value.trim(),
    email: els.email.value.trim(),
    password: els.password.value.trim(),
    role_id: els.selectField.value,
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
      checkEmail(registerObj.email);
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
});

function checkEmail(words) {
  fetch(usersUrl)
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data ===', data);
      data.forEach((dObj) => {
        console.log(dObj.email);
        console.log('els.email.val ===', words);
        if (dObj.email !== words) {
          console.log('all good, emailas laisvas');
          return;
        }
        console.log('toks email jau egzistuoja');
      });
    })
    .catch((error) => {
      console.warn('ivyko klaida:', error);
    });
}

function createSelectOpt(arr) {
  const selectOpt = arr.forEach((arrObj) => {
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
