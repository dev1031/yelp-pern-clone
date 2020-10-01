import React ,{useState , createContext} from 'react';

export const ResturantContext = createContext()

export const ResturantContextProvider = props=>{

    const [resturants , setResturents] =  useState([]);
    const [selectedResturants , setSelectedResturants] = useState([]);
    const [reviews , setReviews] = useState([]);

    const addResturants = (resturant)=>{
        setResturents([...resturants ,resturant] )
    }
    return(
        <ResturantContext.Provider value ={{resturants, setResturents , addResturants,selectedResturants ,setSelectedResturants ,reviews , setReviews}}>
            {props.children}
        </ResturantContext.Provider>
    )
}