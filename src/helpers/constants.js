const cookie = require('react-cookies');
const CryptoJS = require('crypto-js');

export const hasErrors = fieldsError  => Object.keys(fieldsError).some(field => fieldsError[field]);
export const pageSizeOptions = ['10', '20', '30', '40', '50'];
export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

export const formButtonLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

export const defaultHorizontalFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

export const defaultHorizontalFormButtonLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const currencyFormat = (n, currency) => {
  const number = n || 0;
  return currency + ' ' + number.toFixed(2).replace('.', ',').replace(/./g, function (c, i, a) { //eslint-disable-line
    const counter = a[0] === '-' ? 1 : 0;
    return i > counter && c !== ',' && ((a.length - i) % 3 === 0) ? '.' + c : c; //eslint-disable-line
  });
};

export const getCookie = (cookieName, str) => {
  if (cookie.load(cookieName) !== undefined) {
    const bytes = CryptoJS.AES.decrypt(
      cookie.load(cookieName),
      process.env.REACT_APP_SECRET_ENCRYPTER,
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData[str];
  }
  return null;
};

export const setCookie = (cookieName, objCookies) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(objCookies), process.env.REACT_APP_SECRET_ENCRYPTER);

  cookie.save(cookieName, ciphertext.toString(), { path: '/' });

  return cookie;
};

export const clearCookie = cookieName => cookie.remove(cookieName, { path: '/' });

export const setSessionLogin = (resp) => {
  const _ = require('lodash');

  const data = resp.data;

  const authCookies = _.assign({
    [`${process.env.REACT_APP_PROJECT}_isLoggedIn`]: true,
    [`${process.env.REACT_APP_PROJECT}_accessToken`]: data.access,
    [`${process.env.REACT_APP_PROJECT}_refreshToken`]: data.refresh,
    [`${process.env.REACT_APP_PROJECT}_expiredToken`]: data.expires_in,
  });

  const profileCookies = _.assign({
    [`${process.env.REACT_APP_PROJECT}_username`]: data.profile.username,
    [`${process.env.REACT_APP_PROJECT}_email`]: data.profile.email,
    [`${process.env.REACT_APP_PROJECT}_fullname`]: data.profile.fullname,
  });

  const groups = data.profile.register_groups;
  let privileges = {};

  if (groups && groups.module !== undefined) {
    groups.module.map((module) => {
      Object.assign(privileges, {
        [module.model]: {
          create: module.group_permissions.find(i => i.codename.includes('add_')) ? true : false,
          read: module.group_permissions.find(i => i.codename.includes('view_')) ? true : false,
          update: module.group_permissions.find(i => i.codename.includes('change_')) ? true : false,
          delete: module.group_permissions.find(i => i.codename.includes('delete_')) ? true : false,
        },
      });

      return null;
    });
  }

  const permissionCookies = _.assign({
    [`${process.env.REACT_APP_PROJECT}_privileges`]: privileges,
  });

  setCookie('auth', authCookies);
  setCookie('profileCookies', profileCookies);
  setCookie('permissionCookies', permissionCookies);
};

export const getPrivileges = (str) => {
  const cookiePrivileges = getCookie('permissionCookies', `${process.env.REACT_APP_PROJECT}_privileges`);
  return cookiePrivileges[str];
};

export const defaultPrivileges = () => Object.assign({}, {
  create: false,
  update: false,
  delete: false,
});


export const breadcrumbsPath = {
  '/': ['--Beranda'],
  '/sample': ['--Beranda', 'Parent Menu', '--Sample'],
  '/keluar': ['--Beranda', 'Pengaturan', 'Keluar'],
};

export default {
  hasErrors,
  pageSizeOptions,
  formItemLayout,
  formButtonLayout,
  defaultHorizontalFormItemLayout,
  defaultHorizontalFormButtonLayout,
  setSessionLogin,
  getCookie,
  setCookie,
  clearCookie,
  currencyFormat,
  getPrivileges,
  defaultPrivileges,
  breadcrumbsPath,
};
