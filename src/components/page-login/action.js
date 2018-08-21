import { browserHistory } from 'react-router';
import { fetchData } from '../../utils/fetchData';
import { setSessionLogin } from '../../helpers/constants';
import Auth from '../../libraries/API/auth';

export const doLogin = params => async (dispatch) => {
  const body = Object.assign({
    username: params.username,
    password: params.password,
  });

  try {
    const response = await fetchData(Auth.login(body));
    if (response.status === 200) {
      const data = response.data;
      
      setSessionLogin(data);
      browserHistory.push('/');
    }

    return response;
  } catch (e) {
    console.error('Login failed', e);
  }
};

export default {
  doLogin,
};
