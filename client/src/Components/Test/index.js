import React from 'react';
import axios from 'axios';

class Test extends React.Component {

    constructor(){
        super();
        this.state = {
            location: "",
            results: {},
            choice: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.onClick = this.onClick.bind(this);
        this.upload = this.upload.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        
        this.setState(
            {[name]: value}    
        )
        
        console.log(this.state)
    }

    onClick(){
        let self = this;
        axios.get(`https://us1.locationiq.com/v1/search.php?key=5bbb3f798e3174&q=${this.state.location}&format=json`)
        .then(function (response) {

            self.setState({
                results: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    upload(){
        console.log(this.state.results[this.state.choice]);
    }

    render(){
        let items = [];
        for(let i = 0; i < this.state.results.length; i ++){
            items.push({
                name: this.state.results[i].display_name,
                long: this.state.results[i].lon,
                lat: this.state.results[i].lat
            })

        }
        let i = 0;
        const itemComponents = items.map(item => 
        <option value={i} key={i++}>{item.name}</option>
        )

        return (
            <div>
                <h3>Enter location</h3>
                <input name="location" value={this.state.location}
                onChange={this.handleChange}/>
                <button onClick={this.onClick}>Check</button>
                {itemComponents.length > 0 ? <select name="choice" onChange={this.handleChange}>{itemComponents}</select>: <div></div>}

                <button onClick={this.upload}>Upload</button>
                
            </div>
        )
    }
}

export default Test;