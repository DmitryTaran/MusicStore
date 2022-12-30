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
import NoticeList from "./components/NoticeList/NoticeList";
import {getAllDevicesInOrder, getCurrentOrder} from "./http/orderAPI";

function App() {

    const {user, basket} = useContext(Context)

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
        if (user.user.isAuth){
            await getCurrentOrder(user.user.id).then(data => basket.setBasket(data))
            await getAllDevicesInOrder(basket.basket.id).then(data => basket.setDevices(data))
        }
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
              <NoticeList/>
          </div>
      </BrowserRouter>
  );
}

export default App;
