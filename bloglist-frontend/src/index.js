/* eslint-disable linebreak-style */
import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
/* eslint-disable indent */


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)
