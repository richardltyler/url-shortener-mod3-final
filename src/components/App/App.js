import React, { Component } from 'react';
import './App.css';
import { getUrls, addUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: false
    }
  }

  componentDidMount = () => {
    this.getAllUrls();
  }

  getAllUrls = () => {
    getUrls()
      .then(response => this.setState({ urls: response.urls }));
  }

  makeNewUrl = (newURL) => {
    addUrls(newURL)
      .then(response => this.setState({ urls: [...this.state.urls, response] }))
  }


  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm  makeNewUrL={newUrl => this.makeNewUrl(newUrl)} />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
