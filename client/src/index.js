import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {unregister} from './registerServiceWorker';
// import registerServiceWorker from './registerServiceWorker';

import { CookiesProvider } from 'react-cookie';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'


const store = createStore(reducer);

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>
    , document.getElementById('root'));


unregister();
// registerServiceWorker();
