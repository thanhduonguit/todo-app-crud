import React, { Component } from 'react'
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'

class App extends Component {

  // State
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '', 
        status: -1
      },
      keyword: '',
      sortBy: 'name',     // sap xep theo: ten, tang dan
      sortValue: 1
    }
  }

  // Save in localStorage
  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        this.setState({
            tasks: tasks
        })
    }
  }

  // Random ID
  generateString = () => {
    return Math.floor( (1+Math.random() ) * 0x10000).toString(16).substring(1);
  }
  generateID = () => {
    return this.generateString() + '-' + this.generateString() + '-' + this.generateString() + this.generateString() 
    + '-' + this.generateString() + this.generateString() + '-' + this.generateString();
  }

  // Toggle Form: add task
  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing) {
      this.setState({
        isDisplayForm: true,
        taskEditing: null
      })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      })
    }
  }

  // Close Form
  onCloseForm = () => {
    this.setState({
      isDisplayForm : false
    })
  }

  // Show Form
  onShowForm = () => {
    this.setState({
      isDisplayForm : true
    })
  }

  // Submit Form: Add To Do
  onSubmit = (data) => {
    let { tasks } = this.state
    if (data.id === '') {
      // Add
      data.id = this.generateID()
      tasks.push(data)
    } else {
      // Edit
      let index = this.findIndex(data.id)
      tasks[index] = data
    }
    this.setState({
        tasks: tasks,
        taskEditing: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // UPDATE STATUS
  onUpdateStatus = (id) => {
    let { tasks } = this.state
    let index = this.findIndex(id)
    // let index = findIndex(tasks, (task) => {      // su dung thu vien lodash
    //     return task.id === id;
    // });

    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
          tasks : tasks
      })
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }
  // Find index
  findIndex = (id) => {
    let { tasks } = this.state
    let result = -1
    tasks.forEach((task, index) => {
      if(task.id === id){
          result = index
      }
    })
    return result
  } 

  // Delete
  onDelete = (id) => {
    let { tasks } = this.state
    let index = this.findIndex(id)
    if(index !== -1){
      tasks.splice(index, 1)
      this.setState({
          tasks : tasks
      })
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    this.onCloseForm()
  }

  // UPDATE
  onUpdate = (id) => {
    let { tasks } = this.state
    let index = this.findIndex(id)
    let taskEditing = tasks[index]
    this.setState({
        taskEditing : taskEditing
    })
    this.onShowForm()
  }

  // Filter
  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10)
    this.setState({
      filter: {
        name: filterName.toLowerCase(), 
        status: filterStatus
      }
    })
  }

  // Search
  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    })
  }

  // Sort
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
  }

  // Render
  render() {

    let { tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state
    
    // Filter
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter( (task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1
        })
      }
      tasks = tasks.filter( (task) => {
        if (filter.status === -1){
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false)
        }
      })
    }

    // Search
    if (keyword) {
      tasks = tasks.filter( (task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1
      })
    }

    // Sort
    if (sortBy ===  'name') {
      tasks.sort( (a,b) => {
        if(a.name > b.name) return -sortValue
        else if(a.name < b.name) return sortValue
        else return 0
      })
    } else {
        tasks.sort( (a,b) => {
          if(a.status > b.status) return -sortValue
          else if(a.status < b.status) return sortValue
          else return 0;
        })
    }

    let elmTaskForm = isDisplayForm 
      ? <TaskForm 
        onCloseForm={ this.onCloseForm } 
        onSubmit={ this.onSubmit }
        task={ taskEditing }
      /> : ''
    
    return (
      <div className="container mt-3">
        <div>
          <h1 className="text-center">To Do App</h1>
        </div>
        <div className="row mt-5">
          <div className={ isDisplayForm ? 'col-md-4' : ''} >
            {/* TaskForm */}
            { elmTaskForm }
          </div>
  
          <div className={ isDisplayForm ? 'col-md-8' : 'col-md-12'}>
            <button 
              type="button" 
              className="btn btn-success"
              onClick={ this.onToggleForm }    // Toggle Form
            >
              <span className="fa fa-plus mr-2"></span> Add ToDo
            </button>
            
            {/* Control */}
            <Control 
              onSearch={ this.onSearch }
              onSort={ this.onSort }
              sortBy={ sortBy }
              sortValue={ sortValue }
            />
            <br />
  
            <div className="col-md-12">  
              {/* TaskList          */}
              <TaskList 
                tasks={ tasks }
                onUpdateStatus={ this.onUpdateStatus }
                onDelete={ this.onDelete }
                onUpdate={ this.onUpdate }
                onFilter={ this.onFilter }
              />         
            </div>
        
          </div>
        </div>
      </div>
    );
  }
}

export default App;

