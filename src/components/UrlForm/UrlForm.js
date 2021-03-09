import React, { Component } from 'react';

class UrlForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.makeNewUrL)
    if (this.state.title && this.state.urlToShorten) {
      const newUrl = this.state;

      this.props.makeNewUrL(newUrl);
  
      this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleChange(e)}
        />

        <button onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
