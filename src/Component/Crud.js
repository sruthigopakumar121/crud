import React,{useState,useEffect} from 'react'
import "./Crud.css"
const getLocalData=()=>{
    const newlist=localStorage.getItem("fulllist");
    if(newlist){
        return JSON.parse(newlist);
    }
    else{
        return[];
    }
}
function Crud() {
const [input, setInput] = useState("");
const [list, setList] = useState(getLocalData());
const [toggle, setToggle] = useState(false);
const [editId, setEditId] = useState("");
const addItem=()=>{
    if(!input){
        alert("Please fill the data !");
    }
    else if(input && toggle){
        
        setList(list.map((ele, newindex)=>{
            if (newindex === editId){ 

                return [input];
                console.log(input);
            }
            return ele;
        }
        )); 
        setInput("");
        setEditId(null);
        setToggle(false);  
    }
    else{
        setList([...list,input]);
        setInput('');
    }

}

const deleteItem=(index)=>{
    const updatedItem=list.filter((ele,newindex)=>{
        return(newindex !==index)

    });
    setList(updatedItem);

}
const editItem = (index)=>{
    const editedItem = list.find((ele,newindex)=>{
        
        return( newindex === index)
    
    });
   
    setInput(editedItem);
    console.log(input); 
    setEditId(index);
    setToggle(true);
}

useEffect(() => {
    localStorage.setItem("fulllist",JSON.stringify(list));
}, [list])
    return (
        <div className="main-div">
            <h1>CRUD OPERATION</h1>
                <div className="addItems">
                    <input placeholder="enter the data" value={input} onChange={(e)=> setInput(e.target.value)}></input>
                    {(toggle==false)?
                    <i className="fa fa-plus add-btn" onClick={addItem}></i> :
                      <i className="fa fa-edit" onClick={addItem}></i>  
                    }

                </div>
                
                    <div className="showItems">
                        {list.map((ele,index)=>{
                            return (
                             <div className="eachItem" key={index}>
                                 <h3> {ele}</h3>
                               <div className="crud-btn">
                                <i className="fa fa-edit" onClick={()=>editItem(index)}></i>
                                <i className="fa fa-trash" onClick={()=>deleteItem(index)}></i>
                               </div>  
                             </div>

                            )
                        })}
                    </div>

                    <div className="showItems">
                        <button className="btn effect04"data-sm-link-text="Delete All" onClick={()=>{setList([])}}><span>Full List</span></button>
                    </div>     

            

        </div>
    )
}

export default Crud
