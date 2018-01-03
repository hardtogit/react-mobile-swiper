/**
 * Created by Administrator on 2017/5/3.
 */
import React from 'react'
import RouteComponent from './pages/route/index'
import {BrowserRouter as Router,Route,MemoryRouter,Redirect} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Animation from './pages/components/animation/index'
import combineReducers from './reducer/index'
const store=createStore(combineReducers)
const App=()=>(
    <Provider store={store}>
        <Route path="/" component={PageTransition}>
            <Route path="home" component={SuccessTemplate}></Route>
            <Route path="dangerContract" component={DangerContract}></Route>
            <Route path="serviceContract/:id/:type" component={ServiceContract}></Route>
            <Route path="borrowContract/:id/:type" component={BorrowContract}></Route>
            <Route path="storeContract" component={StoreContract}></Route>
        </Route>
    </Provider>
)
export default App