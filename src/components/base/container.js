import { connect } from 'react-redux';
import { Base } from './component';
import {
  setLoader,
  clearNotification,
} from './action';

export const mapStateToProps = state => state.base;
export const mapDispatchToProps = dispatch => ({
  setLoader: val => dispatch(setLoader(val)),
  clearNotification: () => dispatch(clearNotification()),
});

export const BaseWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Base);

export default BaseWrapper;
