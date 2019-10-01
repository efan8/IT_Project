
import React from 'react';
import '../../style.css';
import defaultImage from '../../placeholder.png';

function EditItemComponent(props) {

    // Gets the tag names from the json file
    let keys = [];
    for(let k in props.state.item.tags) keys.push(k);

    // Generates the tag buttons from the list of tags
    let i = 0;
    const tagComponents = keys.map(key => <button className="basicButton" key={i++}>{key}</button>)


    const {originLocation} = props.state.item;
    const {lat, long} = originLocation ? originLocation : "";

    let dateObj = new Date(props.state.item.originDate * 1000);


    return(
        <form onSubmit={props.onSubmit}>
            <h1 className="title">Edit Item</h1>
            <h3>Name: </h3>
            <input name="name"
                type="textbox"
                value={props.state.item.name}
                onChange={props.handleChange}
                placeholder="Type item name here"
                className="textbox"/>

            <img src={props.state.item.imageURL} alt="" className="mediumImage"/>

            <h3>Description:</h3>
            <input 
                placeholder="Simple Description of  object and stuff"
                className="descriptionbox"
                name="description"
                value={props.state.item.description}
                onChange={props.handleChange}
                />

            <h3>Tags:</h3>
            {tagComponents}
            <br></br>
            <input
                placeholder="Enter tag here"
                name="currentTypedTag"
                value={props.state.item.currentTypedTag}
                onChange={props.handleChange} 
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
            <p>Lat: {lat} Long: {long}</p>
            
            <h3>Origin Date:</h3>
            <p>{dateObj.toString()}</p>

            
            <br></br>
            <button>Update Item</button>
        </form>

    );
};

export default EditItemComponent;