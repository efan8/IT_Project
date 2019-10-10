import React from 'react';
import { NavLink } from 'react-router-dom';

function WelcomeComponent(props){

    
    if (!props.state.item.data) return null;
    let data = props.state.item.data;
    let search = props.state.search;

    //Sorting of items
    //Old and new case are kinda broken need to fix
    function sortData(sortType) {
        switch(sortType) {
            // case "old":
            //     data.sort(function(a, b) {
            //         var orderBool = a.dataAdded > b.dataAdded;
            //         return orderBool ? 1 : -1;
            //     });
            //     break;
            // case "new":
            //     data.sort(function(a, b) {
            //         var orderBool = a.dataAdded < b.dataAdded;
            //         return orderBool ? 1 : -1;
            //     });
            //     break;
            case "nameDesc":
                data.sort(function(a, b) {
                    var orderBool = a.name.toLowerCase() > b.name.toLowerCase();
                    return orderBool ? 1 : -1;
                });
                break;
            case "nameAsc":
                data.sort(function(a, b) {
                    var orderBool = a.name.toLowerCase() < b.name.toLowerCase();
                    return orderBool ? 1 : -1;
                });
                break;
            default:
                break;
        }
    }
    sortData(props.state.selectedOption);



    //Creates an array of all items needing to be displayed and puts them
    //into a list of items
    let items = [];
    for(let i = 0; i<data.length; i++) {
        if (search == "" | data[i].name.toLowerCase().includes(search) 
            | data[i].description.toLowerCase().includes(search)) {
            items.push(
                <div>
                    <h1>{data[i].name}</h1>
                    <img src={data[i].imageURL} alt="" className="smallImage"/>
                    <p className="para">{data[i].description}</p>
                    <NavLink to={{
                        pathname:"/ViewItem",
                        aboutProps:{
                            id:`${data[i].id}`
                        }
                    }} >Link to item</NavLink>
                    <br></br>
                    <NavLink to={{
                        pathname:"/EditItem",
                        aboutProps:{
                            id:`${data[i].id}`
                        }
                    }} >Edit item</NavLink>
                </div>
            );
        }
    }


    return(
        <div>
            <h1 className = "title"> Here are your items:</h1>
            <form onSubmit={props.handleSubmit}>
                <input
                    type="text" 
                    name="search" 
                    placeholder="Search"
                />
                <input type="submit"/>
                <p> Sort by:
                <select onChange={props.handleSelectChange} name="sort">
                    {/* <option value="old">Oldest</option>
                    <option value="new">Newest</option> */}
                    <option value="nameDesc">Name A-Z</option>
                    <option value="nameAsc">Name Z-A</option>
                </select>
                </p>
            </form>
            <button onClick={props.logoutPressed}>Logout</button>
            <p>{items}</p>
        </div>
    );

};

export default WelcomeComponent;