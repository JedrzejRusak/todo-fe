import React from "react";
import { BASE_URL } from "../constants";
import TaskItem from "./TaskItem";
import Navigation from "../Home/Navigation";




const TaskManagement = () => {

  const [categoryCollection, setCategroyCollection] = React.useState([]);
  const [taskCollection, setTaskCollection] = React.useState([]);
  const [taskParameters, setTaskParameters] = React.useState({
    id: '',
    name: '',
    description: '',
    priority: '',
    isDone: '',
    categoryId: '',
    userId: ''
  });
  const [user, setUser] = React.useState({});


  const fetchAllCategories = async () => {
    try {
      const requestOptions = {
        headers: new Headers({
          'Authorization': JSON.parse(localStorage.getItem("user")).token,
        })
      };
      const response = await fetch(BASE_URL + '/api/category', requestOptions);
      const data = await response.json();
      setCategroyCollection((prev) => data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllItems = async () => {
    try {
      const requestOptions = {
        headers: new Headers({
          'Authorization': JSON.parse(localStorage.getItem("user")).token,
        })
      };
      const response = await fetch(BASE_URL + '/api/task', requestOptions);
      const data = await response.json();
      setTaskCollection((prev) => data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewItem = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          'Authorization': user.token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          name: taskParameters.name,
          categoryId: taskParameters.categoryId,
          userId: user.id
        })
      };
      await fetch(BASE_URL + '/api/task', requestOptions);
      fetchAllItems();
      setTaskParameters({
        id: '',
        name: '',
        description: '',
        priority: '',
        isDone: '',
        categoryId: '',
        userId: ''
      });
    } catch (error) {
      console.log(error)
    }
  }

  const editItem = async () => {
    try {
      const data = {};
      if (taskParameters.name !== '') data.name = taskParameters.name;
      if (taskParameters.description !== '') data.description = taskParameters.description;
      if (taskParameters.priority !== '') data.priority = parseInt(taskParameters.priority);
      if (taskParameters.isDone !== '') data.isDone = parseInt(taskParameters.isDone);
      if (taskParameters.categoryId !== '') data.categoryId = taskParameters.categoryId;
      const requestOptions = {
        method: 'PATCH',
        headers: new Headers({
          'Authorization': user.token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      };
      await fetch(BASE_URL + '/api/task/' + taskParameters.id, requestOptions);
      fetchAllItems();
      setTaskParameters({
        id: '',
        name: '',
        description: '',
        priority: '',
        isDone: '',
        categoryId: '',
        userId: ''
      });
    } catch (error) {
      console.log(error)
    }
  }

  const removeItem = async () => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: new Headers({
          'Authorization': user.token,
        })
      };
      await fetch(BASE_URL + '/api/task/' + taskParameters.id, requestOptions);
      fetchAllItems();
      setTaskParameters({
        id: '',
        name: '',
        description: '',
        priority: '',
        isDone: '',
        categoryId: '',
        userId: ''
      });
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser((prev) => JSON.parse(localStorage.getItem("user")));
      fetchAllItems();
      fetchAllCategories();
    }

  }, []);

  return (<>
    {console.log(user)}
    <Navigation />
    <div className="w-full h-full max-w-screen bg-gradient-to-r from-violet-900  to-blue-500 flex flex-col flex-wrap items-center justify-start" style={{ minHeight: '100vh', paddingTop: "80px" }}>
      <div className="w-full h-full max-w-[1920px] mt-5 p-5 grid grid-cols-1 gap-5">
        {localStorage.getItem("user") !== null ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="w-full flex flex-col flex-wrap gap-5">
              <h1 className="w-full text-purple-50 font-bold text-xl text-center">Task Selector</h1>
              <div className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg mh-75 overflow-x-hidden overflow-y-auto">
                {taskCollection.length === 0
                  ? (<p className="w-full text-center text-base font-medium text-indigo-900">0 Tasks</p>)
                  : (
                    <div className="w-full grid grid-cols-1 gap-3">
                      {taskCollection.map((item) => (item.userId === user.id ? (<TaskItem item={item} categoryParameters={taskParameters} setCategoryParameters={setTaskParameters} key={item.id + item.name} />) : ('')))}
                    </div>
                  )}
              </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-5">
              <h1 className="w-full text-purple-50 font-bold text-xl text-center">Managment Panel</h1>
              <div className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg max-h-[400px] overflow-x-hidden overflow-y-auto">
                <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={taskParameters.name} onChange={e => setTaskParameters(prev => ({ ...prev, name: e.target.value }))} placeholder='Name'></input>
                <select className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" onChange={e => setTaskParameters(prev => ({ ...prev, categoryId: e.target.value }))}>
                  <option value="">--Please choose an option--</option>
                  {categoryCollection.map((item) => <option value={item.id} key={item.id + item.name}>{item.name}</option>)}
                </select>
                {taskParameters.id !== '' ? (
                  <>
                    <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={taskParameters.description} onChange={e => setTaskParameters(prev => ({ ...prev, description: e.target.value }))} placeholder='Descritpion'></input>
                    <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={taskParameters.isDone} onChange={e => setTaskParameters(prev => ({ ...prev, isDone: e.target.value }))} placeholder='Is Done'></input>
                    <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={taskParameters.priority} onChange={e => setTaskParameters(prev => ({ ...prev, priority: e.target.value > 100 ? 100 : e.target.value < 0 ? 0 : e.target.value }))} placeholder='Prioryty (0-100)' type="number" min={0} max={100}></input>
                  </>
                ) : ('')}
                {taskParameters.id === ''
                  ? (taskParameters.name !== ''
                    ? (<button className="w-full text-purple-50 font-bold text-xl text-center" onClick={addNewItem}>Dodaj</button>)
                    : ('')
                  )
                  : (taskParameters.name === '' && taskParameters.categoryId === '' && taskParameters.description === '' && taskParameters.isDone === '' && taskParameters.priority === ''
                    ? (<button className="w-full text-purple-50 font-bold text-xl text-center" onClick={removeItem}>Usuń</button>)
                    : (<button className="w-full text-purple-50 font-bold text-xl text-center" onClick={editItem}>Edytuj</button>)
                  )
                }

              </div>
            </div>
          </div>) :
          (<div className="w-full flex flex-col flex-wrap gap-5">
            <h1 className="w-full text-purple-50 font-bold text-xl text-center">Brak dostępu -- Zaloguj się</h1>
          </div>)}
      </div>
    </div >
  </>)
};

export default TaskManagement;