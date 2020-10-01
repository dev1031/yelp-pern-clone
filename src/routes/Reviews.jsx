import  React, { useContext , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResturantContext } from './../context/resturantsContext';
import getResturant from './../apis/fetchData';
import ReviewsStar from './../components/ReviewsStar';
import AddReviews from './../components/AddReview';

function Reviews() {
    const {id} = useParams();
    const {selectedResturants , setSelectedResturants} = useContext(ResturantContext);
    const {reviews ,setReviews} = useContext(ResturantContext);

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await getResturant.get(`/${id}`)
            const reviewData = await getResturant.get(`/reviews/${id}`);
            setSelectedResturants(response.data.data.resturants[0]);
            setReviews(reviewData.data.data.resturants);
        }
        fetchData();
    },[]);

    let reviewCards = reviews.map((item)=>{
        return(
        <div className="col-sm-4" key ={item.id}>
        <div className="card text-white bg-primary mb-3" >
            <div className="card-header" style ={{display:"flex"}}>
                <div><h5>{item.name}</h5></div>
                <div style={{marginLeft:"60%" , justifyContent:"flex-end"}}><ReviewsStar numbers = {item.rating}/></div>
            </div>
            <div className="card-body">
                <p className="card-text">{item.review}</p>
            </div>
        </div>
        </div>
        )
    })

    return (
        <div className="container">
            <div className="jumbotron jumbotron-fluid" style={{backgroundColor:"black" , textAlign:"center"}}>
                <h1 className="display-4" style={{color:"white" , fontWeight:"800",fontStretch:"semi-expanded"}}>{selectedResturants.name}</h1>
                <ReviewsStar numbers ={(reviews.map((a)=>a.rating).reduce((a,b)=>a+b,0))/reviews.length}/>
            </div>
            <div className="row" style={{ display:"flex" , overflow:"unset" }} >{reviewCards}</div>
            <div className="conatainer" style={{marginTop:"20px", marginBottom:"20px"}}> 
                <h1 style={{textAlign:"center" , color:"white" , fontWeight:"700"}}> Leave Your Feedback</h1>
                <AddReviews id ={id}/> 
            </div>
        </div>
    )
}

export default Reviews
