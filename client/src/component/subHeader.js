import React from 'react';


class SubHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state = {visible: true}
        this.close = this.close.bind(this);
    }

    close(){
        this.setState({visible: false})
    }

    render(){
        if(this.state.visible){
            return(
                <div className = 'subHeader'>
                    <span className= 'subHeader-close' onClick= {this.close}> X </span>
                        <div className= 'subHeader-content'>
                            <p>Hello {this.props.name}</p>
                            <p>Last visit: {new Date(this.props.lastVisit).toLocaleString()}</p>
                        </div>
                </div>
        )} else {
            return <div className = 'subHeader' id='notVisible'></div>
        }
    }
}

export default SubHeader