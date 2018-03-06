import './index.css';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware     from 'redux-thunk'
import { CookiesProvider } from 'react-cookie';
import reducer             from './reducers'
import { unregister }      from './registerServiceWorker';
import IndexWithCookies    from './indexWithCookies';
import { apiFetch }       from './actions/'

const store = createStore(reducer, applyMiddleware(thunkMiddleware) )

store.dispatch( () => apiFetch() );

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <IndexWithCookies />
        </Provider>
    </CookiesProvider>
    , document.getElementById('root'));


unregister();
// registerServiceWorker();
