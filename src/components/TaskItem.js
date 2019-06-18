import React, { Component } from 'react'

class TaskItem extends Component {

  // Update Status
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id)
  }

  // Delete
  onDelete = () => {
    this.props.onDelete(this.props.task.id)
  }

  // Update
  onUpdate = () => {
    this.props.onUpdate(this.props.task.id)
  }

  render() {

    let { task, index } = this.props

    return ( 
      <tr>
        <td>{ index + 1 }</td>
        <td>{ task.name }</td>
        <td className="text-center">
          <button 
            type="button" 
            className={ task.status === true ? 'btn btn-success' : 'btn btn-secondary'}
            onClick={ this.onUpdateStatus }
          >
            { task.status === true ? 'Done' : 'Not Done'}
          </button>
        </td>
        
        <td className="text-center">
          <button 
            type="button" 
            className="btn btn-warning"
            onClick={ this.onUpdate }
          >
            <i className="fas fa-pencil-alt mr-1"></i>Edit
          </button>&nbsp;&nbsp;
          <button 
            type="button" 
            className="btn btn-danger"
            onClick={ this.onDelete }
          >
            <i className="fas fa-trash-alt mr-1"></i>Delete
          </button>
        </td>
      </tr>
    )
  }
}

export default TaskItem;

