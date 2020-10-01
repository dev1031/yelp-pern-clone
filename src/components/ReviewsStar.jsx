import React from 'react'

function ReviewsStar(props) {
    let number = props.numbers
    let arr = []
    for(let i =0 ; i<Math.ceil(number) ; i++){
        if(number-i >= 1){
            arr.push (
                <i className="fas fa-star"style ={{color:"yellow"}} key ={i}></i>
            )
        }else{
            arr.push(
                <i className="fas fa-star-half-alt" style ={{color:"yellow"}} key={i}></i>
            )
        }
    }
    return arr
}

export default ReviewsStar;
