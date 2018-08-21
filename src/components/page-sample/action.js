import { ActionTypes } from '../../store/action-types';
import { fetchData } from '../../utils/fetchData';
import {
  setLoader,
  setNotification,
} from '../base/action';
import Sample from '../../libraries/API/sample';

const setListData = data => ({
  type: ActionTypes.SAMPLE_DATA_LIST,
  data: data.list,
  meta: data.pagination,
});

export const fetchRecord = (params) => async (dispatch) => {
  dispatch(setLoader(true));

  const param = Object.assign({
    page: params.page || 1,
    limit: params.limit || 10,
  });

  try {
    const response = await fetchData(Sample.read(param));

    if (response.status === 200) { // success
      const data = response.data.data;
      dispatch(setListData(data));
    }

    dispatch(setLoader(false));
  } catch (e) {
    console.error('Failed to get data sample');
    dispatch(setLoader(false));
  }
};

export const deleteRecord = (uid) => async (dispatch) => {
  dispatch(setLoader(true));

  try {
    await fetchData(Sample.delete(uid));

    dispatch(setNotification('success', 'Berhasil', 'Hapus Data'));
    dispatch(setLoader(false));
  } catch (e) {
    dispatch(setNotification('error', e, 'Hapus Data'));
    dispatch(setLoader(false));
  }
};

export default {
  fetchRecord,
  deleteRecord,
};
