import MongoClient from 'mongodb';
import 'dotenv/config';
const url = process.env.MONGOURL;
const db = process.env.MONGODB;
const collection = process.env.MONGOCOLLECTION;
const client = new MongoClient.MongoClient(url);
export let mongodb = null;
export async function connectToMongoDB() {
    await client.connect().then(() => {
        console.log('Connected successfully to mongodb ' + url);
        mongodb = client.db(db);
    }).catch(err => { console.log('Connection to mongodb error: ', err); });
}
export async function insertDocument(doc, collectionParam) {
    const col = mongodb.collection(collectionParam ? collectionParam : collection);
    doc.updateTime = new Date();
    const res = await col.insertOne(doc);
    console.log('Insert result: ', res);
}
//# sourceMappingURL=mongoDB.js.map