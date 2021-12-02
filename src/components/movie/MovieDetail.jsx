import React from 'react'

import { Button, Icon, Spin, Alert } from 'antd'

import fetchJSONP from 'fetch-jsonp'

export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {}, 
      isloading: true
    }
  }

  componentWillMount() {
    const url = `https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${process.env.API_KEY}`
    fetchJSONP(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          info: data,
          isloading: false
        })
      })
  }

  render() {
    return <div>
      <Button type="primary" onClick={this.goBack}>
        <Icon type="left" />
      </Button>

      {this.renderInfo()}
    </div>
  }

  // go back to previous page
  goBack = () => {
    this.props.history.go(-1)
  }

  renderInfo = () => {
    if (this.state.isloading) {
      return <Spin tip="Loading...">
      <Alert
        message="Requesting movie list"
        description="Content loading soon....."
        type="info"
      />
    </Spin>
    } else {
      return <div>
        <div style={{ textAlign: 'center' }}>
          <h1>{this.state.info.title}</h1>

          <img src={`https://image.tmdb.org/t/p/w500/${this.state.info.poster_path}`} alt="" />
        </div>

        <p style={{ textIndent: '2em', lineHeight: '30px' }}>{this.state.info.overview}</p>
      </div>
    }
  }
}