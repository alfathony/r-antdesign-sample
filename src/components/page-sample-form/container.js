import { connect } from 'react-redux';
import { PageSampleForm } from './component';
import {
  clearData,
  create,
  update,
  fetchDetail,
} from './action';

export const mapStateToProps = state => state.pageSampleForm;
export const mapDispatchToProps = dispatch => ({
  clearData: () => dispatch(clearData()),
  create: (params) => dispatch(create(params)),
  update: (uid, params) => dispatch(update(uid, params)),
  fetchDetail: uid => dispatch(fetchDetail(uid)),
});

export const PageSampleFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageSampleForm);

export default PageSampleFormWrapper;
