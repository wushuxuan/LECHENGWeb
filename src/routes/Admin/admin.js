import React from 'react';
import { connect } from 'dva';
import {HashRouter as Router, Route, Link,Switch  } from 'react-router-dom';
import { Layout, Menu, Icon,Breadcrumb,Modal,Button,Avatar } from 'antd';
import $ from 'jquery';
import session from '../../utils/jquerySession';
import ShufflingModule from '../../components/ShufflingModule/ShufflingModule';
import AllHome from '../../components/AllHome/AllHome';
import AllHomeAdd from "../../components/AllhomeAdd/AllhomeAdd";
import AllhomeUpdate from "../../components/AllhomeUpdate/AllhomeUpdate";
import AllhomeRec from "../../components/AllhomeRec/AllhomeRec";
import About from '../../components/About/About';
import AllUser from '../../components/AllUser/AllUser';
import AllUserAdd from '../../components/AllUserAdd/AllUserAdd';
import AllUserDemand from '../../components/AllUserDemand/AllUserDemand';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import 'ant-design-pro/dist/ant-design-pro.css';
import styles from './admin.css';

const { Header,Footer,  Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;

class Users extends React.Component{
  state = {
    collapsed: false,
    title:'轮播设置',
    allTitle:'系统设置',
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
	console.log(this.state.UserSession)
	console.log(this.state.headerImg)
	console.log(this.state.username)
  }
  componentDidMount(){
	var lechengUser = $.session.get('lechengUser');
	if(!lechengUser){
		window.location.href="http://localhost:8080/lecheng/public/#/";
	}else{
		this.setState({
			UserSession:JSON.parse(lechengUser),
			headerImg:JSON.parse(lechengUser).avatarurl,
			username:JSON.parse(lechengUser).username,
		})
	}
  }
  /*是否退出登录*/
  showDeleteConfirm = () => {
    confirm({
      title: '你确定要退出登录么？',
      content: '现在退出',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        $.session.remove('lechengUser');
		    window.location.href="http://localhost:8080/lecheng/public/#/";
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /*点击menu*/
  handleClick = (e) =>{
    this.setState({
      title:e.keyPath[0],
      allTitle:e.keyPath[1],
    })
  }
  render(){
	  const headerImg = this.state.headerImg;
	  const username = this.state.username;
    return (
      <Router>
        <Layout className={styles.admin_layout}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{boxShadow: '0 1px 4px rgba(0,21,41,.12)',}}
          >
            <div className={styles.logo}/>
            <Menu
              theme='dark'
              onClick={this.handleClick}
              defaultOpenKeys={['系统设置']}
              defaultSelectedKeys={['轮播设置']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu key="系统设置" title={<span><Icon type="setting" /><span>系统设置</span></span>}>
                <Menu.Item key="轮播设置"><Link to='/admin/'>轮播设置</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="房屋" title={<span><Icon type="home" /><span>房屋</span></span>}>
                <Menu.Item key="全部房屋"><Link to='/admin/AllHome'>全部房屋</Link></Menu.Item>
                <Menu.Item key="房屋推荐"><Link to='/admin/AllHome/AllhomeRec'>房屋推荐</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="用户" title={<span><Icon type="user" /><span>用户</span></span>}>
                <Menu.Item key="全部用户"><Link to='/admin/AllUser'>全部用户</Link></Menu.Item>
                <Menu.Item key="用户约看">用户约看</Menu.Item>
                <Menu.Item key="用户需求"><Link to='/admin/AllUserDemand'>用户需求</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="专享分期"><Icon type="disconnect"/><span>专享分期</span></Menu.Item>
              <Menu.Item key="共享家具"><Icon type="disconnect"/><span>共享家具</span></Menu.Item>
              <Menu.Item key="关于乐程"><Link to='/admin/About'><Icon type="exclamation-circle-o" /><span>关于乐程</span></Link></Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0,display:'flex',flexFlow:'row',position: 'relative',boxShadow: '0 1px 8px rgba(0,21,41,.12)', }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={styles.headerSearch}>
                <HeaderSearch
                  placeholder="站内搜索"
                  dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                  onSearch={(value) => {
                    console.log('input', value); // eslint-disable-line
                  }}
                  onPressEnter={(value) => {
                    console.log('enter', value); // eslint-disable-line
                  }}
                />
              </div>
              <div className={styles.AvatarDiv}>
                {username}
              </div>
              <Avatar className={styles.Avatar} src={headerImg} />
              <Button onClick={this.showDeleteConfirm} className={styles.logout}>
                <Icon style={{fontSize:'18px',color:'#999'}} type="logout" />
              </Button>
            </Header>
            <Breadcrumb style={{ background:'#fff',padding:'20px 16px',marginBottom:'20px'}}>
              <Breadcrumb.Item>LECHENG</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.allTitle}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ margin: '0px 16px',padding:'10px', background: '#fff',}}>
              <Switch>
              <Route exact path="/admin/" component={ShufflingModule}/>
              <Route  path="/admin/AllHome"
                      render={() =>
                        <div>
                          <Switch>
                            <Route path="/admin/AllHome/AllHomeAdd" component={AllHomeAdd}></Route>
                            <Route path="/admin/AllHome/AllhomeUpdate" component={AllhomeUpdate}></Route>
                            <Route path="/admin/AllHome/AllhomeRec" component={AllhomeRec}></Route>
                            <Route path="/admin/AllHome" component={AllHome}></Route>
                          </Switch>
                        </div>
                      }
              >
              </Route>
              <Route  path="/admin/AllUser"
                      render={() =>
                        <div>
                          <Switch>
                            <Route path="/admin/AllUser/AllUserAdd" component={AllUserAdd}></Route>
                            <Route path="/admin/AllUser" component={AllUser}></Route>
                          </Switch>
                        </div>
                      }
              >
              </Route>
                <Route path="/admin/AllUserDemand" component={AllUserDemand}/>
			        <Route path="/admin/About" component={About}/>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Copyright © 2017 LECHENG 短租
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default connect()(Users);
