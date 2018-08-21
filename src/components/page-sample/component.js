import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Divider,
  Button,
  Popconfirm,
} from 'antd';
import { Link } from 'react-router';
import { PortletHeader } from '../portlet-header';
import { pageSizeOptions } from '../../helpers/constants';

export class PageSample extends Component {

  static propTypes = {
    data: PropTypes.array,
    meta: PropTypes.object,
    fetchRecord: PropTypes.func,
    deleteRecord: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    meta: {},
    fetchRecord: () => {},
    deleteRecord: () => {},
  }

  componentDidMount() {
    this.loadData();
  }

  handleChangeTable = (pagination) => this.loadData({
    page: pagination.current,
    limit: pagination.pageSize,
  })

  loadData = (params = {}) => this.props.fetchRecord(params)

  handleDelete = (uid) => {
    this.props.deleteRecord(uid).then(() => this.loadData());
  }

  render() {
    const addButton = (
      <Button
        type="primary"
        icon="plus"
        size="default"
        onClick={() => this.props.router.push('/sample/form')}
      >
        TAMBAH DATA
      </Button>
    );
    
    return (
      <div>
        <PortletHeader
          columnLeft={(<h2>SAMPLE</h2>)}
          columnRight={addButton}
        />
        <Divider type="horizontal" />
        <Table
          columns={[
            {
              title: 'Kode',
              dataIndex: 'code',
              key: 'code',
              width: 70,
            },
            {
              title: 'Nama',
              dataIndex: 'name',
              key: 'name',
              width: 150,
            },
            {
              title: 'Aksi',
              key: 'action',
              width: 170,
              render: (text, record) => {
                const editBtn = (
                  <Link to={`/sample/form/${record.id}`}>Ubah</Link>
                );

                const delBtn = (
                  <Popconfirm
                    title="Yakin ingin hapus data?"
                    onConfirm={() => this.handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Link>Hapus</Link>
                  </Popconfirm>
                );

                return (
                  <span>
                    <Divider type="vertical" />
                    {editBtn}
                    <Divider type="vertical" />
                    {delBtn}
                  </span>
                );
              },
            },
          ]}
          dataSource={this.props.data}
          bordered
          pagination={{
            position: 'bottom',
            total: this.props.meta.total_rows,
            showSizeChanger: true,
            pageSizeOptions,
          }}
          onChange={this.handleChangeTable}
          size="middle"
          showHeader
        />
      </div>
    );
  }
}

export default PageSample;
