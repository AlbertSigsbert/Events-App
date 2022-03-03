import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: "Invalid Email Address" });
      return;
    }

    const client = await MongoClient.connect(MONGODB_URI);
    console.log('Connected successfully to server');
    const db = client.db();
    await db.collection('emails').insertOne({email:userEmail});
    client.close();
   
    res.status(201).json({ message: "Succesfully Registered" });
  }
  
}

export default handler;
