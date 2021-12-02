import React from 'react'

// Ant Design UI components 
import { Spin, Alert, Pagination } from 'antd';

// fetch-jsonp
import fetchJSONP from 'fetch-jsonp'

// child component
import MovieItem from './MovieItem.jsx'

export default class MovieList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [], // movie list
      nowPage: parseInt(props.match.params.page) || 1, // current page
      pageSize: 20, // number of movies per page
      total: 0, // total number of movies
      isloading: true, // loading 
      movieType: props.match.params.type // movie genre
    }
  }

  // fetch data
  componentWillMount() {
    this.loadMovieListByTypeAndPage()
  }

  // when route path changes, fetch new data
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.match);
    // 1. update state
    this.setState({
      isloading: true, // load new data
      nowPage: parseInt(nextProps.match.params.page) || 1, // which page to load
      movieType: nextProps.match.params.type // movie type
    }, function () {
      this.loadMovieListByTypeAndPage() // 2. fetch data
    })
  }

  // render page
  render() {
    return <div>
      {this.renderList()}
    </div>
  }

  // method to fetch data by type and page
  loadMovieListByTypeAndPage = () => {
    /* fetch('')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      }) */

    // fetch moive data
    const url = `https://api.themoviedb.org/3/movie/${this.state.movieType}?api_key=${process.env.API_KEY}&page=${this.state.nowPage}`

    fetchJSONP(url)
      .then(response => response.json())
      .then(data => {
        // setTimeout used to check loading effect
        setTimeout(() => {
          this.setState({
            isloading: false, 
            movies: data.results, 
            total: data.total_results 
          })
        }, 1000)
      }) 
  }

  // method to render page with data
  renderList = () => {
    if (this.state.isloading) { // loading
      return <Spin tip="Loading...">
        <Alert
          message="Requesting movie list"
          description="Content loading soon....."
          type="info"
        />
      </Spin>
    } else { // loading completed
      return <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {this.state.movies.map(item => {
            return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
          })}
        </div>
        {/* Pagination */}
        <Pagination defaultCurrent={this.state.nowPage} pageSize={this.state.pageSize} total={this.state.total} onChange={this.pageChanged} />
      </div>
    }
  }

  // when user click on different page
  pageChanged = (page) => {
    // Method 1: manipulate DOM 
    // console.log(this.props);
    // window.location.href = '/#/movie/' + this.state.movieType + '/' + page

    // Method 2: use react-router-dom
    this.props.history.push('/movie/' + this.state.movieType + '/' + page)
  }
}