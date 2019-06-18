import React, { Component } from 'react'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  onChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.value
    this.setState({
        [name] : value
    })
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword)
  }

  render() {

    let { keyword } =this.state

    return (
      <div className="col-md-6">
        <div className="input-group">
          <input 
            className="form-control" 
            type="text"
            name="keyword"
            value={ keyword }
            onChange={ this.onChange }
          />
          <div className="input-group-btn">
            <span className="input-group-btn">
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={ this.onSearch }
              >
                <span className="fa fa-search mr-2"></span>Search
              </button>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;

