/* What is shown to the user when they want to add an item */

import React from 'react';
import '../../style.css';
import defaultImage from '../../placeholder.png';

function AddItemComponent(props) {

    // Gets the tag names from the json file
    let keys = [];
    for(let k in props.state.tags) keys.push(k);

    // generate tag buttons for user when they type them in
    let i = 0;
    const tagComponents = keys.map(key => <button className="basicButton" key={i++} type="button">{key}</button>)

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
    console.log(items)

    i = 0;
    const itemComponents = items.map(item => 
    <option value={i} key={i++}>{item.name}</option>
    )
    console.log(itemComponents)

    return (
        <form onSubmit={e => { e.preventDefault(); }}>
            <h1 className="title">Add Item</h1>
            <h3 className="heading">Item Name:</h3>

            <input
                name="name"
                type="textbox"
                value={props.state.name}
                onChange={props.handleChange}
                placeholder="Type item name here"
                className="textbox"/>
            
            <input type="file" name="file" onChange={props.handleChange}/>

            <h3>Description:</h3>
            <input 
                placeholder="Simple Description of  object and stuff"
                className="descriptionbox"
                name="description"
                value={props.state.description}
                onChange={props.handleChange}
                />

            <h3>Tags:</h3>
            {tagComponents}
            <br></br>
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
                add tag
                </button>

            <h3>Collection:</h3>
            <select>
                <option value="collection1">collection1</option>
                <option value="collection2">collection2</option>
                <option value="collection3">collection3</option>
                <option value="newcollection">create new collection</option>
            </select>

            <h3>Location:</h3>
            <input placeholder="Type in location here" name="locationString" value={props.state.locationString} onChange={props.handleChange}/>
            <button onClick={props.locationSubmit}>Find location</button>
            {itemComponents ? <select name="choice" onChange={props.handleChange}>{itemComponents}</select>: <div></div>
            }

            <h3>Origin Date:</h3>
            <input/> <button>changeDate</button>

            <br></br>
            <button onClick={props.submit}>Submit</button>
        </form>

    );
};

export default AddItemComponent;