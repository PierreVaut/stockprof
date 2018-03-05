import React from 'react';



class Disconnect extends React.Component {

    constructor(props) {
        super(props);
        this.handleDisconnect = this.handleDisconnect.bind(this);

    }
    
    handleDisconnect(event){

        fetch('/disconnect', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.post)
        })
            .catch( (err) => {
                console.log('[React Fetch] Error:', err)
                /*** Dispatch ! ***/
                this.setState({'data': err})
            })    
            .then( (result) => {
                result.json().then(
                    json => {
                        console.log('[React Fetch] Register:', json)
                       /*** Dispatch ! ***/
                        this.setState({'data': json})
                    }
                )
            })

        event.preventDefault();

    }

    render(){
        return(
        <div>
        <h2>Disconnect</h2>
        <form action='/disconnect' onSubmit={this.handleDisconnect}>
            <button type='submit'>Disconnect</button>
        </form>
        </div>)
    }
}

export default Disconnect