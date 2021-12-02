import React from 'react'

import styles from '../../css/movie_item.scss'
import { Rate } from 'antd';

export default class MovieItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <div className={styles.box} onClick={this.goDetail}>
      <img src={`https://image.tmdb.org/t/p/w500/${this.props.poster_path}`} className={styles.img} />
      <h4>Name: {this.props.title}</h4>
      <h4>Release: {this.props.release_date}</h4>
      <Rate disabled defaultValue={Math.ceil(this.props.vote_average / 2)} />
    </div>
  }

  goDetail = () => {
    this.props.history.push('/movie/detail/' + this.props.id)
  }
}