import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

if (!mongoose.connection.readyState) {
  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Connected to DB:", cached.conn.connection.db.databaseName);
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "test",
     // dbName: "cardealor",
      })
      .then((mongoose) => {
        console.log("Connected to DB:", mongoose.connection.db.databaseName);
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;




// import mongoose from "mongoose"

// const MONGODB_URI = process.env.MONGODB_URI

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable")
// }

// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// async function dbConnect() {
//   // If a connection is already established and ready (readyState 1 means connected), return it
//   if (cached.conn && cached.conn.connections[0].readyState === 1) {
//     console.log("Using existing DB connection:", cached.conn.connections[0].db.databaseName)
//     return cached.conn
//   }

//   // If there's an ongoing connection promise, wait for it
//   if (cached.promise) {
//     try {
//       cached.conn = await cached.promise
//       // After promise resolves, check if connection is ready
//       if (cached.conn.connections[0].readyState === 1) {
//         console.log("Reusing resolved DB connection:", cached.conn.connections[0].db.databaseName)
//         return cached.conn
//       } else {
//         // If promise resolved but connection isn't ready, something went wrong, reset
//         console.warn("Cached connection promise resolved but connection is not ready. Re-attempting connection.")
//         cached.promise = null
//         cached.conn = null
//       }
//     } catch (error) {
//       // If the cached promise itself rejected, clear it
//       console.error("Cached connection promise failed:", error)
//       cached.promise = null
//       cached.conn = null
//       throw error // Re-throw to propagate the error
//     }
//   }

//   // If no connection or promise, create a new one
//   if (!cached.promise) {
//     console.log("Creating new DB connection...")
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         dbName: "cardealor",
//         serverSelectionTimeoutMS: 5000, // Keep this
//         socketTimeoutMS: 45000, // Keep this
//       })
//       .then((mongooseInstance) => {
//         console.log("New DB connection established:", mongooseInstance.connections[0].db.databaseName)
//         return mongooseInstance
//       })
//       .catch((error) => {
//         console.error("MongoDB connection error:", error)
//         cached.promise = null // Clear promise on failure
//         cached.conn = null
//         throw error // Re-throw to propagate the error
//       })
//   }

//   cached.conn = await cached.promise
//   return cached.conn
// }

// export default dbConnect

