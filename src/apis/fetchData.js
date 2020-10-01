import axios from 'axios';

export default axios.create({
    baseURL :"https://postgres-yelp-clone.herokuapp.com/api/resturants"
})