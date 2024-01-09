/* eslint-disable guard-for-in */
const baseUrl = 'http://localhost:3000/api';
export const loginUrl = `${baseUrl}/auth/login`;
export const usersUrl = `${baseUrl}/auth/users`;
export const rolesUrl = `${baseUrl}/user_roles`;
export const registerUrl = `${baseUrl}/auth/register`;
export const shopItemsUrl = `${baseUrl}/shop_items`;

export async function getDataFetch(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok === false) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: resp.status,
        message: resp.statusText,
      };
    }
    const data = await resp.json();
    return [data, null];
  } catch (error) {
    console.log('error getDataFetch ===', error);
    return [null, error];
  }
}

export function niceDate(dbDate, format = '') {
  const dateObj = new Date(dbDate);
  let formatedDate = dateObj.tolocaleDateString('lt-LT');
  if (format === 'time') {
    formatedDate = dateObj.tolocaleDateString('lt-LT');
  }
  return formatedDate;
}

// cia tik trumpam
export function showIndividualErrors(errorArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in els) {
    const value = els[key];
    const found = errorArr.find((eObj) => eObj.field === key);
    if (found) {
      value.classList.add('is-invalid');
    }
  }
}
