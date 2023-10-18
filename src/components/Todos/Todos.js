import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css'
import { useParams } from "react-router-dom";
const Todos = () => {

   const [todos, setTodos] = useState([]);
   const [accessToken ,setAccessToken] = useState(null)
   const [userObject ,setuserObject] = useState({})
   const [todoFilter ,setTodoFilter ] = useState('all')




  

   useEffect(() => {
      
      const storedToken = sessionStorage.getItem('token');
      const storedUser = sessionStorage.getItem('user');
      console.log(storedUser )

      const tokenWithoutString = storedToken.slice(1,-1)
     
      setAccessToken(tokenWithoutString);

      const userDataObject = JSON.parse(storedUser );

      setuserObject(userDataObject)
     
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
             Authorization: `Bearer ${tokenWithoutString}`,
          },
        };
  
        axios.get(`https://todo_project.test/api/v1/todos/my-todos?filter=${todoFilter}`,config)

         .then((response) => {

         setTodos(response.data.data);
         console.log(response.data)
         
         })
          .catch((error) => {
            console.error('Error fetching todos:', error);
          });
      
    }, [todoFilter]); 

   return ( 
      <div >
        <div className="top-container">
          <div>
          <h2>Hey {userObject.name} here are your todo lists - {todoFilter}</h2>
          </div>

        <div className="filterOptions">
          <select  onChange={e => setTodoFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        </div>
        <div className="todos-container">
            {todos.map((todo) => (
            <div  className="todo"  key={todo.id}>
            Title: {todo.title} <br/> <br/>
            <span>Date :{todo.from} - {todo.to}</span> <br/> <br/>
            Status :{todo.status}
            </div>
          ))}
        </div>
      </div>
    );
}
 
export default Todos;