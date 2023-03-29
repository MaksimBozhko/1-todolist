import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './reducer/store';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';
import {store2} from './toolkit/store';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store2}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

