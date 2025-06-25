import React, { useState } from 'react'
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


function Todo() {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit]= useState(true);
  const [editId, setEditId] = useState(null);


 
  function handleChange(data){
    setInputData(data);

  }
  const addItems = (e) => {
  e.preventDefault();
  if (inputData.trim() === '') return;

  if (!toggleSubmit && editId !== null) {
    setItems(
      items.map((item) =>
        item.id === editId ? { ...item, data: inputData } : item
      )
    );
    setToggleSubmit(true);
    setEditId(null);
  } else {
    setItems([...items, { id: new Date().getTime().toString(), data: inputData }]);
  }

  setInputData('');
};

const deleteItem=(index)=>{
  // console.log(id);
  const updateditems = items.filter((elem)=>{
    return index !== elem.id;

  });
  setItems(updateditems);
  

}
const editItem = (id) => {
  const itemToEdit = items.find((elem) => elem.id === id);
  setToggleSubmit(false);
  setInputData(itemToEdit.data);
  setEditId(id); // Track the ID being edited
};

const removeAll = () => {
  setItems([]);
};




  return (
    <div className='todo-back'>
       
        <form action="" className='todo-form'>
             <h3 className='main-text'>Enter Your Task</h3>
            <div className="form-group">
              <input type="text" className="form-control" autoComplete="off" placeholder="Enter task..." onChange={(e)=> handleChange(e.target.value)} value={inputData} />
              {
                toggleSubmit?  <button type="submit" className="add-btn" onClick={addItems}>Add</button> :<button type="submit" className="add-btn" onClick={addItems}> <FaEdit/></button>
              }
             
            </div>


        </form>
      <div className='myUnorderList'>
        <ul>
          {items.map((elem) => (
            <li key={elem.id}>
             <span className='task-text'>{elem.data}</span> 
              <div className='btn-group'>
                <button className='check-btn' onClick={()=>
                  editItem(elem.id)}>
                  <FaEdit/>
                </button>
                <button className='delete-btn' onClick={()=> deleteItem(elem.id)}>
                  <MdDeleteForever />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="button-container">
  <button className="my-button" onClick={removeAll}>Remove All</button>
</div>

      
    </div>
  )
}

export default Todo;
