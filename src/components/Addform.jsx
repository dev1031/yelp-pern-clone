import React ,{ useState , useContext } from 'react';
import ResturantApi from './../apis/fetchData';
import { ResturantContext } from '../context/resturantsContext';

export default function Addform() {
    const {addResturants} = useContext(ResturantContext);
    const [name , setName] = useState('');
    const [location , setLocation] = useState('');
    const [price , setPrice] = useState('');

    const  handleSubmit = async (e)=>{
        e.preventDefault();

        const response =  await ResturantApi.post('/' ,{
            name : name ,
            location : location,
            price : price
        })
        addResturants(response.data.data.resturants);
        
        setName('');
        setLocation('');
        setPrice('');
    }

    return (
        <div className="container">
        <form onSubmit = { handleSubmit}>
            <div className="row">
                <div className="col" style={{paddingLeft:"0px"}}>
                <input type="text" className="form-control" placeholder="Name" value = {name} onChange ={(e)=>setName(e.target.value)} required/>
                </div>
                <div className="col">
                <input type="text" className="form-control" placeholder="Location" value = {location } onChange ={(e)=>setLocation(e.target.value)} required/>
                </div>
                <div className="col">     
                <select className="custom-select" value = {price} onChange = {(e)=>setPrice(e.target.value)} required>
                    <option disabled>Price Range</option>
                    <option value={1}>$</option>
                    <option value={2}>$$</option>
                    <option value={3}>$$$</option>
                    <option value={4}>$$$$</option>
                    <option value={5}>$$$$$</option>
                </select>
                </div>
                <button type = "submit" className ="btn btn-outline-primary">Add </button>
            </div>
        </form>
        </div>
    )
}
