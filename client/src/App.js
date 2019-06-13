import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import MovieForm from './Movies/MovieForm'
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: [],
      movies:[]
    }
  }

  componentDidMount() {
    // fill me in with an HTTP Request to `localhost:5000/api/movies`
    axios.get('http://localhost:5000/api/movies').then(data=>{
      this.setState({ movies: data.data });
    })
  }

  addToSavedList = (movie) => {
    console.log(this.state.savedList)
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

  addMovie=e=>{
    axios.post('http://localhost:5000/api/movies',e).then(data=>{
      this.setState({movies:data.data})
    })
    this.props.history.push('/')
  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" render={props=><MovieList {...props} movies={this.state.movies}/>} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
        <Route path="/movie/add" render={props=>{
          return <MovieForm {...props} submit={this.addMovie}/>
        }} />
      </div>
    )
  }
}
