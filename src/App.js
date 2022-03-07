import './App.css';
import React, {useEffect, useState} from "react"
import {db} from "../src/Config/firebase.js"
import { collection , addDoc ,doc, getDocs, updateDoc, deleteDoc} from 'firebase/firestore';
// import { async } from '@firebase/util';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Logo from "./component/img/logo.png"
import "./component/style.css"



const TodoApp = ()  => {
 
    
 const [inputValue,setInputValue] = useState ("") 
 const [todo, setTodo ] = useState([]);

 const [refresh, SetRefresh] = useState (false)


 useEffect(async () => {

   const dbRef = collection ( db , "todos"); 
   const getData = await getDocs(dbRef);

let getTodo = [];
   getData.forEach((doc) => {
    //  console.log (doc.id);
    //  console.log (doc.data());
     getTodo.push({key : doc.id, todo : doc.data().todo});

   });
   setTodo(getTodo)
  console.log ("getTodo" , getTodo)

  } , [refresh]);

  const addTodo = async () => {
      const dbRef = collection (db, "todos")
      

  
  
   try {
    const addData = await  addDoc ( dbRef , {
      todo : inputValue,
    });
    console.log (addData);
    setInputValue ("");
   }
   catch (error) {
       console.log (error)
   }

   
  
  };


  const editTodo = async (key) => {
    const editValue = prompt ("Enter Value")
    const dbRef = doc (db, "todos" , key);
    const updateData = await updateDoc(dbRef, {
      todo : editValue,
    });
    SetRefresh(!refresh);

    // console.log (updateData)

  };
  const delTodo = async (key)=> {
    const dbRef = doc(db, "todos", key);
    const delTodo = await deleteDoc(dbRef);
    SetRefresh(!refresh)

    // console.log(key)

 }

   return (

    <div >

<h1 className="text-center mt-5">
  <img src={Logo} alt="" />
<BiEdit color="#01A0C7"  size={90} />
</h1>

      <div className="w-50 mx-auto">


    <input value={inputValue} placeholder="ENTER TODO..."
          className="my-5 form-control input-group input1" onChange = { (e) => {setInputValue(e.target.value)}} type="text" />
    <button  className="btn btn-outline-dark mx-5 btn1 hello" onClick={addTodo}>ADD TODO</button>
    {/* <button  className="btn btn-outline-dark btn1">DELETE ALL TODO</button> */}

    </div>


    <div className="container">
      <ul>
        {
          todo.map ((val, ind) => {
            console.log(val);
            return(
              <div key={ind}>
                <li>
                  {val.todo}
                </li>

                <button className="btn btn-outline-dark btn1 marBtn" onClick={() => editTodo (val.key) } >EDIT</button>
                <button className="btn btn-outline-dark btn1"  onClick={() => delTodo (val.key)}>DELETE</button>


              </div>
            )
          })
        }
      </ul>
    </div>
    </div>


   );

  

 
} 


export default TodoApp;