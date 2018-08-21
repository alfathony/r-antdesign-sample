import { connect } from 'react-redux';
import { PageSample } from './component';
import {
  fetchRecord,
  deleteRecord,
} from './action';

export const mapStateToProps = state => state.pageSample;
export const mapDispatchToProps = dispatch => ({
  fetchRecord: (params) => dispatch(fetchRecord(params)),
  deleteRecord: uid => dispatch(deleteRecord(uid)),
});

export const PageSampleWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageSample);

export default PageSampleWrapper;
