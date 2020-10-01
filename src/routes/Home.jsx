import React ,{ useContext , useEffect }from 'react';
import './Home.css';
import home from './../img/yelp2.png';
import Addfrom from './../components/Addform';
import fetchData from './../apis/fetchData';
import {ResturantContext} from './../context/resturantsContext';
import { useHistory } from "react-router-dom";
import ReviewStar from './../components/ReviewsStar';

function Home() {
  const { resturants, setResturents } = useContext(ResturantContext) ;
  let history = useHistory();
  useEffect(()=>{
    let data = async()=>{
    const response = await fetchData.get('/');
    setResturents(response.data.data.resturants);
   
 };
    data()
  },[setResturents])

  const handleClick = async (id ,e)=>{
    e.stopPropagation();
    const response = await fetchData.delete(`/${id}`);
    setResturents(resturants.filter((resturant)=>resturant.id !==id));
  }

  const handleUpdate = async (id ,e)=>{
    e.stopPropagation();
    history.push(`/${id}/update`);
  }

  const handleReviews = async (id)=>{
    history.push(`/reviews/${id}`);
  }

    return (
        <div className="container">
            <img src= {home} alt="wall" style={{height :"70vh" , width : "100%" , marginBottom:"20px" }}/>
            <div className="jumbotron jumbotron-fluid">
              <h1 className="display-4" style={{textAlign:"center", fontWeight:"800"}}>Add Restuarant</h1>
            </div>
            <div style={{marginBottom:"32px"}}><Addfrom /></div>
            <div>
            <table className="table table-striped table-dark">
                <thead style={{color:"white" , fontWeight:"800", fontSize:"1.2em" , backgroundColor:"#854085" }}> 
                  <tr>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  { resturants && resturants.map((resturant ,i)=>{
                    return(
                    <tr key={i} onClick ={()=>handleReviews(resturant.id)} style={{cursor:"pointer"}}>
                      <td>{resturant.name}</td>
                      <td>{resturant.location}</td>
                      <td>{"$".repeat(resturant.price_range)}</td>
                      <td><ReviewStar  numbers ={resturant.average_rating}/></td>
                      <td><button type="button" className="btn btn-outline-warning" style={{marginleft:"5px"}} onClick ={(e)=>handleUpdate(resturant.id ,e)}>Update</button></td>
                      <td><button type="button" className="btn btn-outline-danger" onClick ={(e)=>handleClick(resturant.id ,e)}>Delete</button></td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
        </div>
    )
}

export default Home
