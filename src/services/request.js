export const API_ROOT = 'https://useapptest.rrs.com/api/v1';

export async function request(url, token, options) {
  const requestUrl = API_ROOT + url;
  const defaultOptions = {
    mode: 'cors',
  };

  defaultOptions.headers = {
    token: token,
  };

  const newOptions = {
    ...defaultOptions,
    ...options,
  };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    newOptions.headers = {
      Accept: 'application/json',
      // 'Content-Type': 'application/json; charset=utf-8',
      ...defaultOptions.headers,
      ...newOptions.headers,
      'rrs-user-agent': 'mytoucher',
    };
  } else {
    newOptions.headers = {
      Accept: 'application/json',
      ...defaultOptions.headers,
      ...newOptions.headers,
      'rrs-user-agent': 'mytoucher',
    };
  }
  const response = await fetch(requestUrl, newOptions);
  const result = await response.json();
  console.log(
    requestUrl,
    '\nheader==👉🏻',
    newOptions,
    '\nresponse👉🏽',
    response,
    '\nresult==👉🏿',
    result
  );
  if (result.code !== 1000) {
    const error = new Error(result.message || '请求失败');
    if (result.code === 10011 || result.code === 10010) {
      // 过期了token
      if (url !== '/login/logout') {
        // dvaStore.dispatch({ type: 'user/logout'});
      }
    } else if (result.code === 10016) {
      // 需要绑定手机号..
    }
    throw error;
  }
  return result;
}

export function json(url, token, body) {
  return request(url, token, { method: 'POST', body: JSON.stringify(body) });
}

export function postForm(url, data) {
  const formData = new FormData();
  if (data) {
    for (const key in data) {
      formData.append(key, data[key]);
    }
  }
  return request(url, {
    method: 'POST',
    body: formData,
  });
}

export const getSmsCode = async (mobile, token) => {
  return request(`/login/verifycode/${mobile}`, token);
};

export async function getAuth(mobile, verifycode, token) {
  return json('/login/login', token, { mobile, verifycode });
}

export async function getToucherList(token) {
  return request('/touch/touchers', token);
}

export async function addToucher(token, title, option) {
  return request(`/touch/toucher/${title}`, token, option);
}

export async function getToucherDetail(token, toucherId, option) {
  return request(`/touch/toucher/${toucherId}`, token, option);
}

export async function getTotalServices(token, option) {
  return request(`/touch/touch/services`, token, option);
}

export async function uploadLogoRequest(token, option) {
  return request(`/files/files/`, token, option);
}

export async function updateDetailRequest(token, id, data) {
  return json(`/touch/toucher/${id}`, token, data);
}

export async function deleteToucher(token, id, option) {
  return request(`/touch/touch/${id}`, token, option);
}

export async function logout() {
  return request('/login/logout');
}

export async function getUserInfo() {
  return request(`/user/userInfo/profile`);
}
