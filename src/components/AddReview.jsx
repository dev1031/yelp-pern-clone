import React,{ useState} from  'react';
import { useParams, useHistory , useLocation} from 'react-router-dom';
import sendData from './../apis/fetchData';

function AddReview(props){
    let {id} = useParams();
    let history = useHistory();
    let location = useLocation();
    const [name , setName] = useState('');
    const [rating , setRating ] = useState('');
    const [ review , setReview ] = useState('');

    const handleSubmit =async (e)=>{
        e.preventDefault();
        let response = await sendData.post(`/reviews/${id}` ,{ name , rating , review});
        history.push("/");
        history.push(location.pathname);
    }

    return(
        <div className="container">
        <form onSubmit ={ handleSubmit }> 
            <div className="form-row">
                <div className="form-group col-md-6">
                <label  style={{color : "white"}}>Name</label>
                <input type="text" className="form-control"  value = { name } onChange ={(e)=>setName(e.target.value)}required/>
                </div>
                <div className="form-group col-md-6">
                <label  style={{color : "white"}}>Rating</label>
                <div className="col">     
                <select className="custom-select" value ={rating} onChange={(e)=>setRating(e.target.value)} required>
                    <option disabled>Rating</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                </div>
                </div>
            </div>
            <div className="form-group">
                <label style={{color : "white"}}>Review</label>
                <textarea type="text" className="form-control"  style={{height:"20vh"}} value={review}  onChange ={(e)=>setReview(e.target.value)}required />
            </div>   
            <button type="submit" className="btn btn-primary">Review</button>
        </form>
        </div>
    )
}

export default AddReview;