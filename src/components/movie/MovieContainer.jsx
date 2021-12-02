import React from 'react'

// Ant Design UI components 
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// React router
import { Link, Route, Switch } from 'react-router-dom'
// child components
import MovieList from './MovieList.jsx'
import MovieDetail from './MovieDetail.jsx'

export default class MovieContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Layout style={{ height: '100%' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[window.location.hash.split('/')[2]]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="now_playing">
            <Link to="/movie/now_playing/1">Now Playing</Link>
          </Menu.Item>
          <Menu.Item key="upcoming">
            <Link to="/movie/upcoming/1">Coming Soon</Link>
          </Menu.Item>
          <Menu.Item key="top_rated">
            <Link to="/movie/top_rated/1">Top Rated</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ paddingLeft: '1px' }}>
        <Content style={{ background: '#fff', padding: 10, margin: 0, minHeight: 280 }}>
          <Switch>
            {/* Switch component: active only first match */}
            <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>
            <Route exact path="/movie/:type/:page" component={MovieList}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  }
}