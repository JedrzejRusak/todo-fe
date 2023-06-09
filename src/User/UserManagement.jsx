import React from "react";
import { BASE_URL } from "../constants";
import Navigation from "../Home/Navigation";




const UserManagement = () => {

  const [user, setUser] = React.useState({});
  const [userParameters, setUserParameters] = React.useState({
    email: '',
    password: ''
  });
  const [registerParameters, setRegisterParameters] = React.useState({
    email: '',
    name: '',
    password: ''
  });

  const fetchUser = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: userParameters.email,
          password: userParameters.password
        })
      };
      const response = await fetch(BASE_URL + '/api/login', requestOptions);
      if (response.status == 200) {
        const data = await response.json();
        setUser((prev) => data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
      }
      else {
        setUserParameters(prev => ({
          email: 'Błędny login lub hasło',
          password: ''
        }))
      }

    } catch (error) {
      console.log(error);
    }
  };

  const addNewUser = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          email: registerParameters.email,
          password: registerParameters.password,
          name: registerParameters.name
        })
      };
      const response = await fetch(BASE_URL + '/api/user', requestOptions);
      const data = await response.json();
      setUser((prev) => data.data);
      localStorage.setItem('user', JSON.stringify(data.data));
      setRegisterParameters(prev => ({
        email: '',
        name: '',
        password: ''
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const logout = () => {
    setUser({});
    setUserParameters(prev => ({
      email: '',
      password: ''
    }))
    localStorage.clear();
  }

  React.useEffect(() => {

    if (localStorage.getItem("user") !== null) {
      setUser((prev) => JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (<>
    <Navigation />
    <div className="w-full h-full max-w-screen bg-gradient-to-r from-violet-900  to-blue-500 flex flex-col flex-wrap items-center justify-start" style={{ minHeight: '100vh', paddingTop: "80px" }}>
      <div className="w-full h-full max-w-[1920px] mt-5 p-5 grid grid-cols-1 gap-5">
        {localStorage.getItem("user") !== null ?
          (<div className="w-full flex flex-col flex-wrap gap-5">
            <h1 className="w-full text-purple-50 font-bold text-xl text-center">{user.name}</h1>

            <button className="w-full text-purple-50 font-bold text-xl text-center" onClick={logout}>Wyloguj</button>
          </div>)
          : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="w-full flex flex-col flex-wrap gap-5">
                <h1 className="w-full text-purple-50 font-bold text-xl text-center">Login</h1>
                <div className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg max-h-[400px] overflow-x-hidden overflow-y-auto">
                  <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={userParameters.email} onChange={e => setUserParameters(prev => ({ ...prev, email: e.target.value }))} placeholder='Email'></input>
                  <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={userParameters.password} type="password" onChange={e => setUserParameters(prev => ({ ...prev, password: e.target.value }))} placeholder='Password'></input>
                  <button className="w-full text-purple-50 font-bold text-xl text-center" onClick={fetchUser}>Zaloguj</button>
                </div>
              </div>
              <div className="w-full flex flex-col flex-wrap gap-5">
                <h1 className="w-full text-purple-50 font-bold text-xl text-center">Register</h1>
                <div className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg max-h-[400px] overflow-x-hidden overflow-y-auto">
                  <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={registerParameters.name} onChange={e => setRegisterParameters(prev => ({ ...prev, name: e.target.value }))} placeholder='Name'></input>
                  <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={registerParameters.email} onChange={e => setRegisterParameters(prev => ({ ...prev, email: e.target.value }))} placeholder='Email'></input>
                  <input className="w-full flex flex-col flex-wrap border-2 border-indigo-900 p-3 rounded-lg  overflow-x-hidden overflow-y-auto" value={registerParameters.password} type="password" onChange={e => setRegisterParameters(prev => ({ ...prev, password: e.target.value }))} placeholder='Password'></input>
                  <button className="w-full text-purple-50 font-bold text-xl text-center" onClick={addNewUser}>Zrejestruj się</button>
                </div>
              </div>
            </div >

          )
        }

      </div>
    </div>
  </>)
};

export default UserManagement;