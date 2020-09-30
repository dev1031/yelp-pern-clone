const express = require("express");
const router = express.Router();
const db = require('./../db/index');
const path = require("path");

router.get('/api/resturants' ,async (req, res)=>{
    //const results = await db.query('SELECT * FROM resturants');
    const resturantRatingData = await db.query('SELECT * FROM resturants LEFT JOIN (SELECT resturant_id , COUNT(*), TRUNC(AVG(RATING),1) as average_rating  FROM reviews GROUP BY resturant_id ) reviews on resturant_id = reviews.resturant_id')
    //console.log(resturantRatingData)
    res.status(200).json({
        status:"success",
        results : resturantRatingData.rows.length,
        data : {
            resturants :resturantRatingData.rows
        }
    })
})

router.get('/api/resturants/:id',async (req, res)=>{
    const results = await db.query("SELECT * FROM resturants WHERE id =$1" ,[req.params.id]);
    res.status(200).json({
        status:"success",
        results : results.rows.length,
        data :{
            resturants : results.rows
        }
    })
})

router.post('/api/resturants', async (req, res)=>{
    const results = await db.query("INSERT INTO resturants( name , location , price_range) VALUES($1, $2, $3) RETURNING *" , [req.body.name , req.body.location, req.body.price]);
    res.status(200).json({
        status: "success",
        data:{
            resturants :results.rows[0]
        }
    })
})

router.put('/api/resturants/:id' , async (req, res)=>{
    let results = await db.query("UPDATE resturants SET name =$1 , location =$2 , price_range =$3 WHERE id = $4 RETURNING *" ,[req.body.name ,req.body.location , req.body.price_range , req.params.id] )
    res.status(200).json({
        status:"success",
        data :{
            resturants: results.rows[0]
        }
    })
})

router.delete('/api/resturants/:id' ,async (req, res)=>{
    let results = await db.query("DELETE FROM resturants WHERE id = $1 RETURNING *" ,[req.params.id] )
    res.status(200).json({
        status:"200",
        data:{
            resturants: results.rows[0]
        }
    })
})

router.get('/api/resturants/reviews/:id' , async (req, res)=>{
    let results = await db.query("SELECT * FROM reviews WHERE resturant_id =$1" ,[req.params.id])
    res.status(200).json({
        status:"200",
        results : results.rows.length,
        data:{
            resturants: results.rows
        }
    })
});

router.post('/api/resturants/reviews/:id' , async (req, res)=>{
    let results = await db.query("INSERT INTO reviews(  resturant_id ,name , review , rating) VALUES($1, $2, $3,$4 ) RETURNING *", [req.params.id,req.body.name , req.body.review, req.body.rating ]);
    res.status(200).json({
        status:"200",
        results : results.rows.length,
        data:{
            resturants: results.rows
        }
    })
})

module.exports = router;