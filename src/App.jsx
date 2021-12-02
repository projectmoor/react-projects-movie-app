import React from 'react'

// React route
import { BrowserRouter, Route, Link } from 'react-router-dom'

// Ant Design UI components 
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

// modular css
import styles from './css/app.scss'

// components
import HomeContainer from './components/home/HomeContainer.jsx'
import MovieContainer from './components/movie/MovieContainer.jsx'
import AboutContainer from './components/about/AboutContainer.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
  }

  render() {
    return <BrowserRouter>
      <Layout className="layout" style={{ height: '100%' }}>

        {/* Header */}
        <Header>
          <div className={styles.logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[window.location.hash.split('/')[1]]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="home">
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="movie">
              <Link to="/movie/now_playing/1">Movie</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about">About</Link>
            </Menu.Item>
          </Menu>
        </Header>

        {/* Content */}
        <Content style={{ backgroundColor: '#fff', flex: 1 }}>
          <Route path="/home" component={HomeContainer}></Route>
          <Route path="/movie" component={MovieContainer}></Route>
          <Route path="/about" component={AboutContainer}></Route>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>
          A React Project
        </Footer>
        
      </Layout>
    </BrowserRouter>
  }
}