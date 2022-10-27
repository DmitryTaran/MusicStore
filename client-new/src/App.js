import './styles/App.css'
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import React, {useContext, useEffect} from "react";
import Footer from "./components/Footer/Footer";
import {useFetching} from "./hooks/useFetching";
import {check} from "./http/userAPI";
import {Context} from "./index";
import Loading from "./components/UI/Loading/Loading";
import Notice from "./components/UI/Notice/Notice";

function App() {

    const {user} = useContext(Context)

    const [
        authorizationCheck,
        isAuthorizationCheckLoading,
        authorizationCheckError
    ] = useFetching( async () => {
        await check().then((data) => {
            if (data){
                user.setUser(data)
                user.setIsAuth(true)
            }
        })
    })

    useEffect(() => {
        authorizationCheck()
    },[])


    return (
      <BrowserRouter>
          <div className="App">
              <Loading isLoading={isAuthorizationCheckLoading}/>
              <NavBar/>
              <AppRouter/>
              <Footer/>
          </div>
      </BrowserRouter>
  );
}

export default App;
