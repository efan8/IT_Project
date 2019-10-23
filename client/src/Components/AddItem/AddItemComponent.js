 /* What is shown to the user when they want to add an item */

import React from 'react';
import '../../style.css';
import DatePicker from 'react-date-picker'

function AddItemComponent(props) {

    // Gets the tag names from the json file and adds them if they are true
    let keys = []
    if(props.state.tags){
        let tags = Object.keys(props.state.tags)
        keys = tags.filter(function(id){
            return props.state.tags[id]
        })
    }

    // generate tag buttons for user when they type them in
    let i = 0;
    const tagComponents = keys.map(key =>
        <button className="basicButton"
            key={i++}
            onClick={props.deleteTag}
            type="button"
            value={key.toString()}>{key}</button>)

    console.log(tagComponents)

    // get the resulting items from a location search
    let items = [];
    if(props.state.results.length > 0){
        items.push({
            name: "Please choose one of the following locations",
            lat: null,
            long: null
        })
        for(let i = 0; i < props.state.results.length; i ++){
            items.push({
                name: props.state.results[i].display_name,
                long: props.state.results[i].lon,
                lat: props.state.results[i].lat
            })
        }
    }
    //console.log(items)

    i = 0;
    const itemComponents = items.map(item =>
    <option value={i} key={i++}>{item.name}</option>
    )
    console.log(itemComponents)

    return (
        <div className="solid-page-container">
            <form className="center" onSubmit={e => { e.preventDefault(); }}>

                <h3 className="heading">Item Name:</h3>

                <input
                    name="name"
                    type="textbox"
                    value={props.state.name}
                    onChange={props.handleChange}
                    placeholder="Type item name here"
                    className="textbox"/>
                <br></br>
                <input
                    className="textbox"
                    type="file"
                    name="selectedFile"
                    multiple
                    onChange={props.handleImageUpload}
                    accept="image/*"
                    />

                <h3 className="centerText">Description:</h3>
                <textarea
                    placeholder="Simple Description of  object and stuff"
                    className="descriptionbox"
                    name="description"
                    value={props.state.description}
                    onChange={props.handleChange}
                    />

                <h3 className="centerText">Tags:</h3>
                <p className="centerText">{tagComponents}</p>
                <input
                    placeholder="Enter tag here"
                    name="currentTypedTag"
                    value={props.state.currentTypedTag}
                    onChange={props.handleChange}
                    onKeyDown={props.keyDown}
                    />
                <button
                    onClick={props.tagSubmit}
                    type="button">
                    Add tag
                    </button>

                <h3 className="centerText">Location:</h3>
                <input
                    className="textbox"
                    placeholder="Type in location here"
                    name="locationString"
                    value={props.state.locationString}
                    onChange={props.handleChange}/>

                {itemComponents ? <select
                                    className="textbox"
                                    name="choice"
                                    onChange=
                                        {props.handleChange}>{itemComponents}
                                    </select>: <div></div>
                }
                <button
                    className="centerButton"
                    onClick={props.locationSubmit}>Find location</button>
                <h3 className="centerText">Origin Date:</h3>

                <DatePicker className="centerDate" name="originDate" value={props.state.originDate}
                onChange={props.dateChange}/>


                <br></br>
                <br></br>
                <button
                    className="centerButton"
                    onClick={props.submit}
                    disabled={!props.isEnabled}>Submit</button>
            </form>
        </div>

    );
};

export default AddItemComponent;
