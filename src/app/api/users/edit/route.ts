import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function PUT(req: NextRequest) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        return NextResponse.json({ error: 'MONGODB_URI environment variable is not defined' }, { status: 500 });
    }
    const client = new MongoClient(uri);
    
    if (!req.body) {
        return NextResponse.json({ error: 'No data provided' }, {status: 400});
    }
    const data = await req.json();
    const {_id, ...newData} = data;
    console.log("Updating data with id:", _id);
    console.log(newData);
    try {
      const result = await client.db("tasks").collection("users").updateOne(
        {_id: new ObjectId(_id)},
        {$set: newData}
      );
      console.log("Result:", result);
      return NextResponse.json({status: 200})
    } catch (error) {
      return NextResponse.json({ error: 'Unable to add data' }, {status: 500});
    }
}