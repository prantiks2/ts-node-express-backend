import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASS}@cluster0.0s6o7.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

export const client = new MongoClient(uri, { serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
}});

