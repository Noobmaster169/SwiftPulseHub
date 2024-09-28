import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { create } from 'domain';

// // Function to list all databases
// async function listDatabases(client: MongoClient): Promise<string[]> {
//     const databasesList = await client.db().admin().listDatabases();
//     return databasesList.databases.map((db: { name: string }) => db.name);
// }

// async function findOneListingByName(client: MongoClient, nameOfListing:string) {
//     const result = await client.db("tasks").collection("sprints").findOne({ name: nameOfListing });

//     if (result) {
//         console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
//         console.log(result);
//     } else {
//         console.log(`No listings found with the name '${nameOfListing}'`);
//     }
// }

// async function createListing(client: MongoClient) {
//     const result = await client.db("tasks").collection("sprints").find({}).toArray();
//     if(result){
//         console.log("Found the following records:");
//         console.log(result);
//     }else{
//         console.log("No records found");
//     }
// }

export async function POST(req: NextRequest) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        return NextResponse.json({ error: 'MONGODB_URI environment variable is not defined' }, { status: 500 });
    }
    const client = new MongoClient(uri);
    
    if (!req.body) {
        return NextResponse.json({ error: 'No data provided' }, {status: 400});
    }
    const data = await req.json();
    console.log(data);
    try {
      const result = await client.db("tasks").collection("sprints").insertOne(data);
      return NextResponse.json({status: 200})
    } catch (error) {
      return NextResponse.json({ error: 'Unable to add data' }, {status: 500});
    }
}

// Handler for GET request
export async function GET(req: NextRequest): Promise<NextResponse> {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        return NextResponse.json({ error: 'MONGODB_URI environment variable is not defined' }, { status: 500 });
    }
    const client = new MongoClient(uri);

    try {
        // Get the list of databases
        const databases = await client.db("tasks").collection("sprints").find({}).toArray();

        // Return the list of databases as JSON
        return NextResponse.json({ databases });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }
}
