import { connect } from 'react-redux';
import { PageLogin } from './component';
import {
	doLogin,	
} from './action';

export const mapStateToProps = state => state.base;
export const mapDispatchToProps = dispatch => ({
  doLogin: (params) => dispatch(doLogin(params)),
});

export const PageLoginWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageLogin);

export default PageLoginWrapper;
