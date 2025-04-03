'use client'

import { useState, useEffect } from "react"

export default function Home(){

    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const [Tasks, setTasks] = useState([])


    useEffect(() => {
      const storedTasks = localStorage.getItem("tasks")
      if(storedTasks){
        setTasks(JSON.parse(storedTasks))
      }
    
     
    }, []);


    useEffect(()=>{

        localStorage.setItem('tasks', JSON.stringify(Tasks))

    }, [Tasks])


    const addTask = (e)=>{
        e.preventDefault()
        if(!task.trim() || !description.trim() )return
        const newTask = 
        {id : Date.now(),
            text : task,
            description : description,
            completed : false
         }

         setTasks([...Tasks, newTask])
         setTask("")
         setDescription('')
    }

   const ToggleTask = (id)=>{
    const toggledTask = Tasks.map((t)=>
    t.id===id ? {...t, completed : !t.completed} : t)
    setTasks(toggledTask)
    const updatedTasks = toggledTask.find((t)=> t.id ==id)
    console.log('toggle task triggered')
   }

const DeleteTask = (id)=>{
    const updatedTasks = Tasks.filter((t)=> t.id !== id )
    setTasks(updatedTasks)
}



    

    return(
        <div className="mx-auto max-w-2xl  rounded-2xl shadow-2xl bg-gray-900 p-4">
            <h1 className="font-bold text-4xl text-center">Todo List</h1>

            <form 
            onSubmit={addTask}

            
            >
                <div className="p-2 border rounded-2xl flex " >
                    <input type="text"
                     className=" bg-gray-600 rounded-xl focus:outline-0 mr-2 px-3 focus:ring-amber-400" placeholder="ToDo title" 
                     value={task}
                     onChange={(e)=>setTask (e.target.value)}/>
                    
                    <input type="text"
                     className=" bg-gray-600 rounded-xl focus:outline-0 px-3" placeholder="Add description" 
                     value={description}
                     onChange={(e)=>setDescription (e.target.value)}/>
                     
                    <button className="border rounded px-2 py-1 ml-auto bg-amber-600"
                    type="submit">
                        Add todo</button>
                </div>
            </form>

            <ul>
                {Tasks.map((t)=>(
                    <li
                    className= {`flex overflow-hidden relative  p-2 border rounded-xl  mt-2 ${t.completed ? "h-14  items-center" : ''}`}
                    key={t.id}
                    >
                     <div className={`  flex flex-col w-[80%] transition duration-300 break-all text-ellipsis ${t.completed ? '-translate-x-full' : ''}`}>
                       <span className={`font-bold text-sky-400 ${t.completed ? 'text-red-500' : ''}`}> {t.completed ? ``  : t.text } </span> 
                    <span className={`${t.completed ? 'line-through' : ''}`}>{t.description}</span>
                    </div>
                    <div className={`absolute transition duration-500 text-green-500 font-bold text-xl  ${t.completed ? '' : '-translate-y-9 '}`}>Task Completed</div>
                    <div className="flex gap-2">

                    <button
                    onClick={()=>DeleteTask(t.id)} className="border h-9 my-auto rounded px-2 py-1 ml-auto bg-red-600">
                        Delete
                        </button>

                        <button className="border h-9 my-auto  rounded px-2 py-1 ml-auto bg-sky-500"
                        onClick={()=>ToggleTask(t.id)}>{t.completed ? "Incomplete" : "Completed"}</button>
                        </div>
                     </li>
                    
                ))}
            </ul>
        </div>
    )
}