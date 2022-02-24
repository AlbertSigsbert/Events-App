function handler(req,res) {
    if(req.method === 'POST'){
        console.log(req.body.email);
    }
    res.status(201).json({message:'Succesfully Registered'});
}

export default handler;