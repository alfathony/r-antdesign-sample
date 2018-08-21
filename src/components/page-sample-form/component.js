import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Button,
  Form,
  Input,
} from 'antd';
import { PortletHeader } from '../portlet-header';
import {
  hasErrors,
  formItemLayout,
  formButtonLayout,
} from '../../helpers/constants';

const FormItem = Form.Item;

class form extends Component {
  static propTypes = {
    detail: PropTypes.object,
    create: PropTypes.func,
    update: PropTypes.func,
    fetchDetail: PropTypes.func,
    clearData: PropTypes.func,
  }
  static defaultProps = {
    detail: {},
    create: () => {},
    update: () => {},
    fetchDetail: () => {},
    clearData: () => {},
  }
  setValue = (params) => {
    this.props.form.setFieldsValue({
      name: params.name,
      code: params.code,
    })
  }
  componentDidMount() {
    this.props.clearData(); // clear store

    // To disabled submit button at the beginning.
    this.props.form.validateFields();

    if (this.props.params.id) {
      this.props.fetchDetail(this.props.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.detail !== nextProps.detail) {
      this.setValue(nextProps.detail);
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const redirectAction = () => this.props.router.push('/sample');
        if (this.props.params.id) { //update
          this.props.update(this.props.params.id, values).then(redirectAction);
        } else { //insert
          this.props.create(values).then(redirectAction);
        }
      }
    });
  }
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    let pageForm = 'TAMBAH';

    if (this.props.params.id) {
      pageForm = 'UBAH';
    }

    // Only show error after a field is touched.
    const nameError = isFieldTouched('name') && getFieldError('name');
    const codeError = isFieldTouched('code') && getFieldError('code');

    return (
      <div>
        <PortletHeader
          columnLeft={(<h2>{pageForm} SAMPLE</h2>)}
        />
        <Divider type="horizontal" />
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            validateStatus={nameError ? 'error' : ''}
            help={nameError || ''}
            label="Nama"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Nama tidak boleh kosong.' }],
            })(
              <Input placeholder="input name" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            validateStatus={codeError ? 'error' : ''}
            help={codeError || ''}
            label="Kode"
          >
            {getFieldDecorator('code', {
              rules: [{ required: true, message: 'Kode tidak boleh kosong.' }],
            })(
              <Input placeholder="input code" />
            )}
          </FormItem>
          <FormItem {...formButtonLayout}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              {pageForm}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export const PageSampleForm = Form.create()(form);

export default PageSampleForm;
