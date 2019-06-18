import React, { Component } from 'react'
import TaskItem from './TaskItem'

class TaskList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterName: '',
      filterStatus: -1  // all: -1,     done: 1,      not done: 0
    }
  }

  // onChange: filter
  onChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.value
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name ==='filterStatus' ? value : this.state.filterStatus
    )
    this.setState({
        [name] : value
    })
  }

  render() {

    let { tasks } = this.props
    let { filterName, filterStatus } = this.state
    let elmTasks = tasks.map( (task, index) => {
      return <TaskItem 
                key={ task.id } 
                index={ index }
                task={ task }
                onUpdateStatus={ this.props.onUpdateStatus }
                onDelete={ this.props.onDelete }
                onUpdate={ this.props.onUpdate }
              />
    })

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td >
              <input 
                className="form-control" 
                type="text" 
                name="filterName"
                value={ filterName }
                onChange={ this.onChange }
              />
            </td>
            <td>
              <select 
                className="form-control"
                name="filterStatus"
                value={ filterStatus }
                onChange={ this.onChange }
              >
                <option value={ -1 }>All Status</option>
                <option value={ 1 }>Done</option>
                <option value={ 0 }>Not Done</option>
              </select>
            </td>
            <td></td>
          </tr>
          
          { elmTasks }
        </tbody>
      </table>   
    )
  }
}

export default TaskList;

