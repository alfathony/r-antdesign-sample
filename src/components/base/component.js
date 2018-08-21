import React, {
  Component,
  Children,
  cloneElement,
} from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Breadcrumb,
  Menu,
  Icon,
  Spin,
  notification,
} from 'antd';
import { pathBreadCrumb } from '../../config/pathBreadCrumb';
import { breadcrumbsPath } from '../../helpers/constants';
import { Link } from 'react-router';
import _ from 'lodash';
import '../../assets/css/main.css';

const { Header, Content, Sider } = Layout;

const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;

export class Base extends Component {
  breadcrumbs = breadcrumbsPath

  static propTypes = {
    children: PropTypes.element,
    loader: PropTypes.bool,
    clearNotification: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    loader: false,
    clearNotification: () => {},
  }

  static previewNotification(status, title, message) {
    let previewMessage = null;

    if (status !== 'error') {
      previewMessage = message;
    } else if (typeof message === 'object') {
      previewMessage = message.map((msg, index) => (
        <div key={index}>{msg}</div>
      ));
    } else if (typeof message === 'string') {
      previewMessage = message;
    }

    notification.config({
      placement: 'topRight',
    });

    notification.open({
      type: status,
      message: title,
      description: previewMessage,
    });
  }

  renderMenuItem = (params) => {
    return (
      <Menu.Item key={params.key}>
        <Icon type={params.icon} />  
        <span>{params.title}</span>
      </Menu.Item>
    );
  }

  renderMenuGroup = (params) => {
    let child = null;

    if (params.child) {
      child = params.child.map(item => this.manageMenu(item));
    }

    return (
      <MenuItemGroup key={params.key} title={params.title}>
        {child}
      </MenuItemGroup>
    );
  }

  renderMenuSub = (params) => {
    let child = null;

    if (params.child) {
      child = params.child.map(item => this.manageMenu(item));
    }

    return (
      <SubMenu
        key={params.key}
        title={(<span><Icon type={params.icon} /><span>{params.title}</span></span>)}
      >
        {child}
      </SubMenu>
    );
  }

  manageMenu = (item) => {
    let output = null;

    switch (item.type) {
      case 'single':
        output = this.renderMenuItem(item);
      break;
      case 'group':
        output = this.renderMenuGroup(item);
      break;
      case 'sub':
        output = this.renderMenuSub(item);
      break;
      default:
        break;
    }

    return output;
  }

  state = {
    collapsed: false,
  };

  onCollapse = () => this.setState({ collapsed: !this.state.collapsed })

  handleNavClick = (e) => this.searchURL(e.key);

  searchURL = async (key) => {
    let allNavigation = [];

    const getMenuItem = params => allNavigation.push(params);
    const getMenuGroup = params => (params.child) ? params.child.map(item => getAllMenus(item)) : console.log(params);
    const getMenuSub = params => (params.child) ? params.child.map(item => getAllMenus(item)) : console.log(params);

    const getAllMenus = (item) => {
      switch (item.type) {
        case 'single':
          getMenuItem(item);
        break;
        case 'group':
          getMenuGroup(item);
        break;
        case 'sub':
          getMenuSub(item);
        break;
        default:
          break;
      }
    };

    await pathBreadCrumb.map(path => getAllMenus(path));
    const selectNavigation = await allNavigation.find(nav => nav.key === key);

    return await this.props.router.push(selectNavigation.url);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notification !== nextProps.notification) {
      const {
        status,
        message,
        title,
      } = nextProps.notification;

      if (status && message && title) {
        Base.previewNotification(status, title, message);
        this.props.clearNotification();
      }
    }
  }
  
  render () {
    let menuNavigation = pathBreadCrumb.map(path => this.manageMenu(path));

    const childrenWithExtraProp = Children.map(this.props.children, child =>
      cloneElement(child, {
        ...this.props,
        setGeneralNotification: (status, title, message) => Base.previewNotification(status, title, message),
      }),
    );

    const pathName = this.props.location.pathname.split('/');

    return (
      <div>
        <Spin
          spinning={this.props.loader}
          size="large"
          delay={30}
          tip="Please wait..."
          className="custom-spinner"
        >
          <Layout style={{ minHeight: '100vh' }}>
            <Sider
              onCollapse={this.onCollapse}
              width={270}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="logo">
                <img src={process.env.REACT_APP_LOGO} alt="" /> 
                <h1>{process.env.REACT_APP_PROJECT}</h1>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                onClick={this.handleNavClick}
              >
                {menuNavigation}
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.onCollapse}
                />
              </Header>

              <Breadcrumb>
                {this.breadcrumbs['/' + pathName[1]].map((item, index) => {
                  let content = item;

                  if (item.includes('--')) {
                    let url = _.kebabCase(item);

                    if (url === 'beranda') {
                      url = '';
                    }

                    content = (
                      <Link to={`/${url}`}>
                        {item.replace('--', '')}
                      </Link>
                    );
                  }

                  return (
                    <Breadcrumb.Item key={index}>{content}</Breadcrumb.Item>
                  );
                })}
              </Breadcrumb>

              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  {childrenWithExtraProp}
                </div>
              </Content>

            </Layout>
          </Layout>
        </Spin>
      </div>
    );
  }
}

export default Base;
