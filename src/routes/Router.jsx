import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import { AuthContextProvider } from '../context/UserContext'
import PrivateRouter from './PrivateRouter'
import Login from '../pages/Login'
import Register from '../pages/Register'
import RequestsContext from '../context/RequestContext'
import settings from '../app.setting.json'
import Exit from '../pages/Exit'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ClientList from '../pages/ClientList'
import EmployeesList from '../pages/EmployeesList'
import Edit from '../pages/Edit'
import ProductList from '../pages/ProductList'
import CreateProduct from '../pages/CreateProduct'

settings["uri"] = `${settings.app_protocol}://${settings.app_host}:${settings.app_port}`

export default function Router() {
    return (
        <>
            <AuthContextProvider>
                <RequestsContext.Provider value={settings}>

                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/access' element={
                                <PrivateRouter
                                    require_authentication={false}
                                    redirect_to="/"
                                    component={<Login />}
                                />
                            } />

                            <Route path='/join' element={<Register />} />

                            <Route path='/cart' element={
                                <PrivateRouter
                                    require_authentication={true}
                                    redirect_to="/"
                                    roles_admisibles={["client"]}
                                    component={<Cart />}
                                />
                            } />

                            <Route path='/clients' element={
                                <PrivateRouter
                                    require_authentication={true}
                                    redirect_to="/"
                                    roles_admisibles={["admin"]}
                                    component={<ClientList />}
                                />
                            } />

                            <Route path='/employees' element={
                                <PrivateRouter
                                    require_authentication={true}
                                    redirect_to="/"
                                    roles_admisibles={["admin"]}
                                    component={<EmployeesList />}
                                />
                            } />

                            <Route path='/add' element={
                                <PrivateRouter
                                    require_authentication={true}
                                    redirect_to="/"
                                    roles_admisibles={["admin"]}
                                    component={<CreateProduct />}
                                />
                            } />

                            <Route path='/edit/:id' element={
                                <PrivateRouter
                                    require_authentication={true}
                                    redirect_to="/"
                                    roles_admisibles={["admin"]}
                                    component={<Edit />}
                                />
                            } />

                            <Route path='/products/' element={
                                <PrivateRouter
                                    require_authentication={true}
                                    redirect_to="/"
                                    roles_admisibles={["admin"]}
                                    component={<ProductList />}
                                />
                            } />

                            <Route path='/shop' element={<Shop />} />
                            <Route path='/exit' element={<Exit />} />
                        </Routes>
                    </BrowserRouter>
                </RequestsContext.Provider>
            </AuthContextProvider>
        </>
    )
}