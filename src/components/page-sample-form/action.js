import { ActionTypes } from '../../store/action-types';
import { fetchData } from '../../utils/fetchData';
import { setLoader, setNotification } from '../base/action';
import Sample from '../../libraries/API/sample';

const setData = data => ({
  type: ActionTypes.SAMPLE_DATA_DETAIL,
  data: data,
});

export const clearData = data => ({
  type: ActionTypes.SAMPLE_DATA_DETAIL,
  data: {},
});

export const create = parameter => async (dispatch) => {
  dispatch(setLoader(true));

  const body = Object.assign({
    code: parameter.code,
    name: parameter.name,
  });

  try {
    await fetchData(Sample.insert(body));
    dispatch(setNotification('success', 'Berhasil', 'Insert Data'));
    dispatch(setLoader(false));
  } catch (e) {
    dispatch(setNotification('error', e, 'Insert Data'));
    dispatch(setLoader(false));
  }
};

export const update = (uid, parameter) => async (dispatch) => {
  dispatch(setLoader(true));

  const body = Object.assign({
    code: parameter.code,
    name: parameter.name,
  });

  try {
    await fetchData(Sample.update(uid, body));
    dispatch(setNotification('success', 'Berhasil', 'Edit Data'));
    dispatch(setLoader(false));
  } catch (e) {
    dispatch(setNotification('error', e, 'Edit Data'));
    dispatch(setLoader(false));
  }
};

export const fetchDetail = uid => async (dispatch) => {
  dispatch(setLoader(true));

  try {
    const response = await fetchData(Sample.detail(uid));
    
    if (response.status !== undefined && response.status === 200) {
      dispatch(setData(response.data.data.detail));
    }

    dispatch(setLoader(false));
  } catch (e) {
    console.error('Failed to get data sample detail');
    dispatch(setLoader(false));
  }
};

export default {
  create,
  update,
  fetchDetail,
  clearData,
};
