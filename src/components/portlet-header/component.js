import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
} from 'antd';

export class PortletHeader extends Component {
  static propTypes = {
    columnLeft: PropTypes.element,
    columnRight: PropTypes.element,
  }

  static defaultProps = {
    columnLeft: null,
    columnRight: null,
  }

  render() {
    return (
      <Row>
        <Col span={12}>{this.props.columnLeft}</Col>
        <Col span={12} style={{ textAlign: 'right' }}>{this.props.columnRight}</Col>
      </Row>
    );
  }
}

export default PortletHeader;
