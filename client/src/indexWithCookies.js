import App from './App';
import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
const domain = 'stockprof-carb11.herokuapp.com';

class IndexWithCookies extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { cookies } = this.props;

        // setting cookie
        if(!cookies.get(domain)){
            let rdm = Math.floor(Math.random() * 99999942 );
            cookies.set(domain, rdm, { path: '/' });
        }
        console.log('[React-cookies]', cookies.get(domain));
    }

    render() {return <App />}
}

export default withCookies(IndexWithCookies);