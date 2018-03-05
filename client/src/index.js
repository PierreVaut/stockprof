import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { CookiesProvider } from 'react-cookie';
import reducer from './reducers'
import IndexWithCookies from './indexWithCookies';
import './index.css';
import { unregister } from './registerServiceWorker';
// import registerServiceWorker from './registerServiceWorker';

let store = createStore(reducer)

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <IndexWithCookies />
        </Provider>
    </CookiesProvider>
    , document.getElementById('root'));


unregister();
// registerServiceWorker();
