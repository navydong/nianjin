import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
import {siderMenu} from './siderMenu'


const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


class SiderCustom extends Component {
    state = {
        collapsed: true,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        menuList: []
    };
    componentDidMount() {
        this.setMenuOpen(this.props);
        this.setState({
            menuList: siderMenu.data
        })

    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }d
    setMenuOpen = props => {
        const { path } = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        console.log(this.state);
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v,
            firstHide: false,
        })
    };
    //openKeys={this.state.firstHide ? null : [...this.state.openKey]}
    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo" />
                <Menu
                    onClick={this.menuClick}
                    theme="light"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                   
                    onOpenChange={this.openMenu}
                >
                    <Menu.Item key="/app/dashboard/index">
                        <Link to={'/app/dashboard/index'}><Icon type="mobile" /><span className="nav-text">首页</span></Link>
                    </Menu.Item>


                    {/*菜单树*/}
                    {this.state.menuList.map((list, index) => {
                        return list.submenu !== undefined ?
                            (<SubMenu
                                key={list.name}
                                title={<span><Icon type={list.icon} /><span className="nav-text">{list.name}</span></span>}>
                                {list.submenu.map((item) => {
                                    return item.submenu !== undefined
                                        ? <SubMenu
                                            title={item.name}
                                            key={item.name}>
                                            {item.submenu.map((third) => {
                                                return <Menu.Item key={third.url}>
                                                    <Link to={third.url}>{third.name}</Link>
                                                </Menu.Item>
                                            })}
                                        </SubMenu>
                                        : <Menu.Item key={item.url}>
                                            <Link to={item.url}>{item.name}</Link>
                                        </Menu.Item>
                                })}
                            </SubMenu>)
                            : <Menu.Item key={list.url}>
                                <Link to={list.url}>{<span><Icon type={list.icon} /><span className="nav-text">{list.name}</span></span>}</Link>
                            </Menu.Item>
                    })}

                </Menu>
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    .ant-layout-sider{
                        background: #fff;
                    }
                    ::-webkit-scrollbar-thumb{
                        background-color: #c5d0d6;
                    }
                    .ant-layout .logo{
                        background: #29d;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

export default SiderCustom;
