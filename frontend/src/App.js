import React from 'react';
import axios from "axios";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      todo:[],
      id:0,
      name:'',
      description:'',
      status:''
    }
  }
  componentDidMount(){
    axios.get("http://localhost:8081/api/")
    .then((res)=>{
      this.setState({
        todo:res.data,
        id:0,
        name:'',
        description:'',
        status:''
      })
    })
  }
  submit(event,id){
    event.preventDefault();
    if(id === 0){
      axios.post("http://localhost:8081/api/",{
        name:this.state.name,
        description:this.state.description,
        status:this.state.status
      })
      .then((res)=>{
        this.componentDidMount();
      })
    }else{
      axios.put("http://localhost:8081/api/",{
        id:this.state.id,
        name:this.state.name,
        description:this.state.description,
        status:this.state.status
      }).then(()=>{
        this.componentDidMount();
      })

    }
  }
  deleteTodo(id){
    axios.delete(`http://localhost:8081/api/${id}`)
    .then(()=>{
      this.componentDidMount();
    })
  }
  editTodo(id){
    axios.get(`http://localhost:8081/api/${id}`)
    .then((res)=>{
      console.log(res.data);
      this.setState({
        id:res.data.id,
        name:res.data.name,
        description:res.data.description,
        status:res.data.status
      })
    })
  }
  render(){
    return (
      <div className="container">
        <div className="row">
        <div className="col s6">
          <form onSubmit={(e)=>this.submit(e,this.state.id)}>
            <div class="input-field col s12">
              <i class="material-icons prefix">content_paste</i>
              <input onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name} type="text" id="name" class="autocomplete"/>
              <label for="name">Task Name</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">description</i>
              <input onChange={(e)=>this.setState({description:e.target.value})} value={this.state.description} type="text" id="description" class="autocomplete"/>
              <label for="description">Description</label>
            </div>
            <div class="input-field col s12">
              <i class="material-icons prefix">assignment_turned_in</i>
              <input onChange={(e)=>this.setState({status:e.target.value})} value={this.state.status} type="text" id="status" class="autocomplete"/>
              <label for="status">Status</label>
            </div>
            <button class="btn waves-effect waves-light right" type="submit" name="action" style={{background: "#ed3b3b"}}>Submit
              <i class="material-icons right">send</i>
            </button>
          </form>  
        </div>   
        <div className="col s6">          
          <table>
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
              </tr>
            </thead>

            <tbody>
                {
                  this.state.todo.map(todo=>
                    <tr key={todo.id}>
                      <td>{todo.name}</td>
                      <td>{todo.description}</td>
                      <td>{todo.status}</td>
                      <td>
                        <button onClick={(e)=>this.editTodo(todo.id)} type="submit" class="btn-floating waves-effect waves-light orange" name="action">
                          <i class="material-icons">edit</i>
                        </button>
                      </td>
                      <td>
                        <button onClick={(e)=>this.deleteTodo(todo.id)}  type="submit" class="btn-floating waves-effect waves-light red" name="action">
                          <i class="material-icons">delete</i>
                        </button>
                      </td>
                    </tr>
                  )
                }
            </tbody>
          </table>
         </div>
        </div>   
      </div>
    );
  }
}

export default App;
