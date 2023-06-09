import React from "react";
import { BASE_URL } from "../constants";
import CategoryItem from "./CategoryItem";
import Navigation from "../Home/Navigation";




const CategoryManagement = () => {

  const [categoryCollection, setCategroyCollection] = React.useState([]);
  const [categoryParameters, setCategoryParameters] = React.useState({
    id: '',
    name: ''
  });
  const [token, setToken] = React.useState('');

  const fetchAllItems = async () => {
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

  const addNewItem = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          'Authorization': token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ name: categoryParameters.name })
      };
      await fetch(BASE_URL + '/api/category', requestOptions);
      fetchAllItems();
      setCategoryParameters({
        id: '',
        name: ''
      });
    } catch (error) {
      console.log(error)
    }
  }

  const editItem = async () => {
    try {
      const requestOptions = {
        method: 'PATCH',
        headers: new Headers({
          'Authorization': token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ name: categoryParameters.name })
      };
      await fetch(BASE_URL + '/api/category/' + categoryParameters.id, requestOptions);
      fetchAllItems();
      setCategoryParameters({
        id: '',
        name: ''
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
          'Authorization': token,
        })
      };
      await fetch(BASE_URL + '/api/category/' + categoryParameters.id, requestOptions);
      fetchAllItems();
      setCategoryParameters({
        id: '',
        name: ''
      });
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setToken((prev) => JSON.parse(localStorage.getItem("user")).token);
      fetchAllItems();
    }

  }, []);

  return (<>
    <Navigation />

    <div className="w-full h-full max-w-screen bg-gradient-to-r from-violet-900  to-blue-500 flex flex-col flex-wrap items-center justify-start" style={{ minHeight: '100vh', paddingTop: "80px" }}>
      <div className="w-full h-full max-w-[1920px] mt-5 p-5 grid grid-cols-1 gap-5">
        {localStorage.getItem("user") !== null ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="w-full flex flex-col flex-wrap gap-5">
              <h1 className="w-full text-purple-50 font-bold text-xl text-center">Category Selector</h1>
              <div className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg mh-75 overflow-x-hidden overflow-y-auto">
                {categoryCollection.length === 0
                  ? (<p className="w-full text-center text-base font-medium text-indigo-900">0 Categories</p>)
                  : (
                    <div className="w-full grid grid-cols-1 gap-3">
                      {categoryCollection.map((item) => <CategoryItem item={item} categoryParameters={categoryParameters} setCategoryParameters={setCategoryParameters} key={item.id + item.name} />)}
                    </div>
                  )}
              </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-5">
              <h1 className="w-full text-purple-50 font-bold text-xl text-center">Managment Panel</h1>
              <div className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg max-h-[400px] overflow-x-hidden overflow-y-auto">
                <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={categoryParameters.name} onChange={e => setCategoryParameters(prev => ({ ...prev, name: e.target.value }))} placeholder='Name'></input>
                {categoryParameters.id === ''
                  ? (categoryParameters.name !== ''
                    ? (<button className="w-full text-purple-50 font-bold text-xl text-center" onClick={addNewItem}>Dodaj</button>)
                    : ('')
                  )
                  : (categoryParameters.name === ''
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

export default CategoryManagement;