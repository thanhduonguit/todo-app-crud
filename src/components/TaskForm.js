import React, { Component } from 'react'

class TaskForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      id: '',
      name : '',
      status: false
    }
  }

  // Update
  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      })
    }
  }

  componentWillReceiveProps(nextPprops) {
    if (nextPprops && nextPprops.task) {
      this.setState({
        id: nextPprops.task.id,
        name: nextPprops.task.name,
        status: nextPprops.task.status
      })
    } else if (!nextPprops.task) {
      // console.log('update -> add')
      this.setState({
        id: '',
        name : '',
        status: false
      })
    }
  }

  // Close Form
  onCloseForm = () => {
    this.props.onCloseForm()
  }

  //onChange
  onChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.value
    if(name === 'status'){
        value = target.value === 'true' ? true : false;
    }
    this.setState({
        [name] : value
    })
  }

  // Submit Form
  onSubmit = (event) => {
    event.preventDefault()   // ngăn load lai trang
    this.props.onSubmit(this.state)
    // Then close form
    this.onCloseForm()
  }

  // Clear Form
  onClear = () => {
    this.setState({
      name: '',
      status: false
    })
  }

  render() {

    let { id } = this.state

    return (
      <div className="card">
        <h3  className="card-header text-center">
          {/* title form */}
          { id !== '' ? 'Update ToDo' : 'Add ToDo'}   
          <i 
            className="fas fa-times-circle ml-5"
            onClick={ this.onCloseForm }
          ></i>
        </h3>
        <div className="card-body">

          <form onSubmit={ this.onSubmit }>

            <div className="form-group">
              <label>Name: </label>
              <input 
                type="text" 
                className="form-control" 
                name="name" 
                value={ this.state.name }
                onChange={ this.onChange }
              />
            </div>

            <label>Status: </label>
            <select 
              className="form-control"
              name="status"
              value={ this.state.status }
              onChange={ this.onChange }
            >
              <option value={ true }>Done</option>
              <option value={ false }>Not Done</option>
            </select>

            <div className="mt-4 ">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-plus mr-2"></i>Save
              </button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={ this.onClear }
              >
                <i className="fas fa-times mr-2"></i>Exit
              </button>
            </div>

          </form>

        </div>
      </div>
    )
  }
}

export default TaskForm;

