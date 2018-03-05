import React from 'react';
import './App.css';

// Components
import Ws         from './component/ws';
import Btc        from './component/btc';
import Header     from './component/header';

import Login      from './component/login';
import Register   from './component/register';
import Disconnect   from './component/disconnect';



class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };



    }


    componentWillMount() {

            let params = {
                method: 'GET',
                accept: 'application/json',
                credentials: 'include'
            }
            fetch('/api/', params)
                .catch(function(err){
                    let result = {error: '[React-userInfo] Error:'+ err}
                    console.log(result.error)
                })   
                .then( (result) => {
                    console.log('[React-userInfo] Fetch ok', result);
                    result.json().then(
                        json => {
                            console.log('[React Fetch] API:', json)
                            this.setState({'data': json})
                        }
                    )
                }) 
        //}
    }

    



    render() {
        return (
                
                <div className="App">
                <Header />             

                <p>Data: {JSON.stringify(this.state.data)}</p>              
                <br/>


                <Login />
                <Register />
                <Disconnect />

                <Ws />
                <Btc />
            </div>

        );
    }
}


export default App

