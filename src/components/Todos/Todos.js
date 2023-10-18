import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css'
import { useParams } from "react-router-dom";
import Modal from '../../Modal';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';




const Todos = () => {

   const [todos, setTodos] = useState([]);
   const [accessToken ,setAccessToken] = useState(null)
   const [userObject ,setuserObject] = useState({})
   const [todoFilter ,setTodoFilter ] = useState('all')
   const [isModalOpen, setModalOpen] = useState(false);
   const [title, setTitle] = useState('');
   const [toDate, setToDate] = useState('');
   const [fromDate, setFromDate] = useState('');
   const [message ,setMessage] = useState('');
   const [error ,setError] = useState('');
   const [isSuccessMessage ,setIsSuccessMessage] = useState(false);
   const [isErrorMessage ,setIsErrorMessage] = useState(false);

   const navigate = useNavigate();

   const baseUrl = process.env.REACT_APP_BASE_URL;




   const openModal = () => {
    setModalOpen(true);
    };

  const closeModal = () => {
     setModalOpen(false);
    };

   const handleTodoSubmit = (e) => {

      e.preventDefault()

      const storedToken = sessionStorage.getItem('token');
    
      const tokenWithoutString = storedToken.slice(1,-1)
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
           Authorization: `Bearer ${tokenWithoutString}`,
        },
      };

   
      axios.post(`${baseUrl}/todos/create`,{
        'title':title,
        'to':toDate,
        'from':fromDate
      },config)
       .then((response) => {

       if(response.data.success){
           setMessage(response.data.message)
           todos.unshift(response.data.data);
           setIsErrorMessage(false)
           setIsSuccessMessage(true)
           closeModal()
       }else{
        setError(response.data.errors)
        setIsSuccessMessage(false)
        setIsErrorMessage(true)
        closeModal()
       }
       
       })
        .catch((error) => {
          console.error('Error fetching todos:', error);
          setError(error.message)
          setIsSuccessMessage(false)
          setIsErrorMessage(true)
          closeModal()
        });

    }


    const handleTodoDelete = (id) => {

      const storedToken = sessionStorage.getItem('token');
    
      const tokenWithoutString = storedToken.slice(1,-1)
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
           Authorization: `Bearer ${tokenWithoutString}`,
        },
      };

   
      axios.delete(`${baseUrl}/todos/delete/${id}`,config)
       .then((response) => {

       if(response.data.success){
           setMessage(response.data.message)
          //  todos.unshift(response.data.data);

           const updatedTodo = todos.filter((todo) => todo.id !== id);

           setTodos(updatedTodo)


           setIsErrorMessage(false)
           setIsSuccessMessage(true)
           
       }else{
        setError(response.data.errors)
        setIsSuccessMessage(false)
        setIsErrorMessage(true)
       }
       
       })
        .catch((error) => {
          console.error('Error fetching todos:', error);
          setError(error.message)
          setIsSuccessMessage(false)
          setIsErrorMessage(true)
        });

    }


    const handleTodoCompletion = (id) => {

      const storedToken = sessionStorage.getItem('token');
    
      const tokenWithoutString = storedToken.slice(1,-1)
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
           Authorization: `Bearer ${tokenWithoutString}`,
        },
      };

   
      axios.get(`${baseUrl}/todos/mark-as-complete/${id}`,config)
       .then((response) => {

       if(response.data.success){

          const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, status: 'complete' }; 
            }
            return todo;
          });
    
           setTodos(updatedTodos); 

           setMessage(response.data.message)
          //  todos.unshift(response.data.data);
           setIsErrorMessage(false)
           setIsSuccessMessage(true)
          
           
       }else{
        setError(response.data.errors)
        setIsSuccessMessage(false)
        setIsErrorMessage(true)
        
       }
       
       })
        .catch((error) => {
          console.error('Error fetching todos:', error);
          setError(error.message)
          setIsSuccessMessage(false)
          setIsErrorMessage(true)
          
        });

    }

    const handleClearData = () => {
      setTodos([]);
    }

    const handleRestoreData = () => {
      window.location.reload();
    }

    const handleLogout = () => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      navigate('/'); 
    };

    
    

   useEffect(() => {
      const storedToken = sessionStorage.getItem('token');
      const storedUser = sessionStorage.getItem('user');
      const tokenWithoutString = storedToken.slice(1,-1)
      setAccessToken(tokenWithoutString);
      const userDataObject = JSON.parse(storedUser);
      setuserObject(userDataObject)
     
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
            Authorization: `Bearer ${tokenWithoutString}`,
        },
      };
  
      axios.get(`${baseUrl}/todos/my-todos?filter=${todoFilter}`,config)
        .then((response) => {

     
            setTodos(response.data.data);
        })
        .catch((error) => {
          console.error('Error fetching todos:', error);
        });
      
    }, [todoFilter]); 



   return ( 
      <div>
        <div>
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
           <div className="top-container">
           <div>
                <button  onClick={openModal} className='addTodo'>Add New Todo</button> 
                { todos.length > 0 ?
                  <button onClick={handleClearData} className='clearTodo'>Clear All Todo</button> :
                  <button onClick={handleRestoreData} className='clearTodo'>Restore Todo</button>
                }
                
            </div>
            <div>
              <button className='logout' onClick={handleLogout}>Log Out</button>
            </div>
            
           </div>
        </div>
        <br/>
        {
          isSuccessMessage ? 
          <div className="success">{message}</div> :
          ''
        }

        {
          isErrorMessage ? 
          <div className="error">{error}</div> :
          ''
        }
        
        <br/>
        <div className="todos-container">
            {
              todos.length > 0 ? (
               todos.map((todo) => (
                  <div  className="todo"  key={todo.id}>
                  Title: {todo.title} <br/> <br/>
                  <span>Date :{todo.from} - {todo.to}</span> <br/> <br/>
                  Status :{todo.status}<br/><br/>
                   <button 
                   className='delete_todos'
                   onClick={() => handleTodoDelete(todo.id)}
                   >Delete Todos</button>
                   {
                    todo.status !== 'complete'?
                    <button 
                      className='complete_todos'
                      onClick={() => handleTodoCompletion(todo.id)}
                      >Mark as Complete</button> :''
                   }
                   
                  </div>))
              ):(
                <h2>No Data</h2>
                )
          }
        </div>

        {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Add New Todos</h2>
          <form >
                <div className="input-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" 
                     placeholder="Title" 
                    //  onChange={e => setEmail(e.target.value)}
                     />
                </div>
                <div className="input-group">
                    <label htmlFor="date">From</label>
                    <input type="date" id="date" 
                   
                  //  onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="date">To</label>
                    <input type="date" id="date" 
                   
                  //  onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn">Submit Todos</button>
            </form>
       </Modal> */}
       <ReactModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
          >
         <div className='modal_content'>
         <h2>Add Your Todos</h2>
         <form onSubmit={handleTodoSubmit}>
                <div className="input-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" 
                     placeholder="Title" 
                     onChange={e => setTitle(e.target.value)}
                     />
                </div>
                <div className="input-group">
                    <label htmlFor="date">From</label>
                    <input type="date" id="date" 
                   
                   onChange={e => setFromDate(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="date">To</label>
                    <input type="date" id="date" 
                   onChange={e => setToDate(e.target.value)}
                    />
                </div>
                <button className="closeModalbtn" onClick={closeModal}>Close</button>
                <button className="submitModalbtn">Submit Todos</button>
            </form>
         </div>
      </ReactModal>
      </div>

      
    );
}
 
export default Todos;