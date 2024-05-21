import { MongoClient, ServerApiVersion } from "mongodb";

// const host = process.env.DB_HOST || 'localhost';
// const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || "chat_app";
// const url = `mongodb://${host}:${port}/`;
const url =
  "mongodb+srv://zaid:5siggKarh7Nf0Nqg@chatapp.pc4oix7.mongodb.net/?retryWrites=true&w=majority&appName=chatApp";

class DBClient {
  constructor() {
    this.db = null;
    // MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    //   if (error) console.log(error);
    //   this.db = client.db(database);
    //   console.log("hey")
    // });
    this.client = new MongoClient(url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.run();
  }

  async run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      this.db = this.client.db("chat_app");
    } catch (e) {
      // Ensures that the client will close when you finish/error
      console.log(e);
    }
  }

  isAlive() {
    return !!this.db;
  }

  async findUser(email) {
    const collection = this.db.collection("users");
    const user = await collection.findOne({ email });
    if (user) {
      return user;
    }
    return false;
  }

  async findUserById(userId) {
    const collection = this.db.collection("users");
    const user = await collection.findOne({ _id: userId });
    if (user) {
      return user;
    }
    return false;
  }

  async createUser(displayName, email, password) {
    const collection = this.db.collection("users");
    await collection.insertOne({ displayName, email, password });
  }
}

const dbClient = new DBClient();
export default dbClient;
