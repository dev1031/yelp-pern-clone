import React , { useState , useEffect } from 'react';
import fetchResturant from './../apis/fetchData';
import { useHistory } from 'react-router-dom';

function UpdatePage(props) {
    const id = props.match.params.id;
    const [name , setName] = useState('');
    const [location , setLocation] = useState('');
    const [price , setPrice ] = useState('');
    let history = useHistory();
    
    useEffect(()=>{
        const fetchData = async ()=>{
            let response = await fetchResturant.get(`/${id}`);
            setName(response.data.data.resturants[0].name);
            setLocation(response.data.data.resturants[0].location );
            setPrice(response.data.data.resturants[0].price_range)
        };
        fetchData()
    },[])

    const handleSubmit =(e)=>{
        e.preventDefault();
        fetchResturant.put(`/${id}`,{
            name : name,
            location:location,
            price_range:price,
            id : id
        });
        history.push('/');
    }

    return (
        <div className="container">
        <div className="jumbotron jumbotron-fluid" style={{textAlign:"center"}}>
                <h1 className="display-4" style={{fontWeight:"800"}}>Update Restaurant</h1>
        </div>
            <form onSubmit = {handleSubmit}>
                <div className="form-group">
                    <label style={{color:"white" , fontWeight:"500", fontSize :"1.2em"}}>Name</label>
                    <input type="text" className="form-control" value ={name} onChange ={(e)=>setName(e.target.value)}  style={{fontWeight:"700" ,fontSize:"1em"}}/>
                </div>
                <div className="form-group">
                <label style={{color:"white" ,fontWeight:"500", fontSize :"1.2em"}}>Location</label>
                    <input type="text" className="form-control"  value ={location} onChange ={(e)=>setLocation(e.target.value)} style={{fontWeight:"700" ,fontSize:"1em"}} />
                </div>
                <div className="form-group">
                <label htmlFor="exampleFormControlSelect1" style={{color:"white" ,fontWeight:"500", fontSize :"1.2em"}}>Price Range</label>
                    <select className="form-control" id="exampleFormControlSelect1" value = {price} onChange = {(e)=>setPrice(e.target.value)} style={{fontWeight:"700" ,fontSize:"1em"}}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <button type="submit" className ="btn btn-outline-primary">Update</button>
            </form>
        </div>
    )
}

export default UpdatePage
