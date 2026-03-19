import mongoose from "mongoose";

global.mongoose = global.mongoose || {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  const conString = process.env.MONGO_URI;

  try {
    if (!conString) {
      throw new Error(
        "missing db connection string, define in environment variables",
      );
    }

    // if a connection is already established, return it
    if (global.mongoose.conn) {
      return global.mongoose.conn;
    }

    // if a connection is not established but a connection promise exists, wait for it to resolve and return the connection
    if (!global.mongoose.promise) {
      global.mongoose.promise = mongoose.connect(conString, {
        autoIndex: true,
      });
    }

    global.mongoose.conn = await global.mongoose.promise;
    console.log("DB CONNECTED");

    return global.mongoose.conn;
  } catch (error) {
    console.error("DB CONNECTION ERROR:", error.message);

    if (global.mongoose) {
      global.mongoose.promise = null; // reset promise so future calls can retry
    }
    // rethrow error to propagate
    throw error;
  }
}
