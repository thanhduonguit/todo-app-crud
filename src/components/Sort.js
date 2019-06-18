import React, { Component } from 'react'

class Sort extends Component {
  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue)
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div onClick={ () => { this.onClick('name', 1)} }>
              <a className={ (this.props.sortBy === 'name' && this.props.sortValue === 1) ? 'dropdown-item font-weight-bold' : 'dropdown-item' }>
                A -> Z
              </a>
            </div>
            <div onClick={ () => { this.onClick('name', -1)} }>
              <a className={ (this.props.sortBy === 'name' && this.props.sortValue === -1) ? 'dropdown-item font-weight-bold' : 'dropdown-item'} >
                Z -> A
              </a>
            </div>
            <div onClick={ () => { this.onClick('status', 1)} }>
              <a className={ (this.props.sortBy === 'status' && this.props.sortValue === 1) ? 'dropdown-item font-weight-bold' : 'dropdown-item'} >
                Status: Done
              </a>
            </div>
            <div onClick={ () => { this.onClick('status', -1)} }>
              <a className={ (this.props.sortBy === 'status' && this.props.sortValue === -1) ? 'dropdown-item font-weight-bold' : 'dropdown-item'} >
                Status: Not Done
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sort;

