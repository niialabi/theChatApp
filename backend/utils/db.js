import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

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
    const user = await collection.findOne({ _id: new ObjectId(userId) });
    if (user) {
      return user;
    }
    return false;
  }

  async createUser(displayName, email, password) {
    const collection = this.db.collection("users");
    await collection.insertOne({ displayName, email, password });
  }

  async getUserRooms(roomIds) {
    const collection = this.db.collection("rooms");
    let rooms = [];
    for (const roomId of roomIds) {
      const room = await collection.findOne({ _id: new ObjectId(roomId) });
      if (room) rooms.push(room);
    }
    return rooms;
  }

  async createRoom(userId, name) {
    const usersCollection = this.db.collection("users");
    const roomsCollection = this.db.collection("rooms");

    const room = {
      name,
      owner: userId,
      members: [userId],
      messages: [],
    };
    const result = await roomsCollection.insertOne(room);
    const newRoom = await roomsCollection.findOne({ _id: result.insertedId });
    if (!newRoom) {
      console.log("didn't create new room");
      console.log("result", result);
      return false;
    }
    const updateUser = await usersCollection.updateOne(
      { _id: userId },
      { $push: { rooms: newRoom._id } }
    );
    if (!updateUser.acknowledged) return false;

    return newRoom;
  }

  async joinRoom(userId, roomId) {
    const usersCollection = this.db.collection("users");
    const roomsCollection = this.db.collection("rooms");
    try {
      new ObjectId(roomId);
    } catch (err) {
      console.log("not valid room id");
      return false;
    }

    const updateRoom = await roomsCollection.updateOne(
      { _id: new ObjectId(roomId) },
      { $push: { members: userId } }
    );
    if (!updateRoom.acknowledged) return false;

    const updateUser = await usersCollection.updateOne(
      { _id: userId },
      { $push: { rooms: roomId } }
    );
    if (!updateUser.acknowledged) return false;

    return true;
  }

  async getMessages(roomId) {
    const collection = this.db.collection("rooms");
    try {
      new ObjectId(roomId);
    } catch (err) {
      console.log("not valid room id");
      return false;
    }
    const room = await collection.findOne({ _id: new ObjectId(roomId) });
    if (!room) return false;
    return room.messages;
  }

  async updateBio(userId, bio) {
    const collection = this.db.collection("users");
    const result = await collection.updateOne(
      { _id: userId },
      { $set: { [bio]: bio } }
    );
    if (!result.acknowledged) return false;
    return true;
  }

  async findRoom(name) {
    const roomsCollection = this.db.collection("rooms");
    const room = await roomsCollection.findOne({ name: name});
    if (room) return room;
    else return false;
  }
}

const dbClient = new DBClient();
export default dbClient;
