import mongoose from 'mongoose';

// creating a property called mongoose on the global object, accessible from anywhere in the application
global.mongoose = {
    conn: null,
    promise: null,
};


export async function dbConnect() {
    // checks whether there's already a connection, if so we use it
    if (global.mongoose && global.mongoose.conn) {
        console.log("connected from previous");
        return global.mongoose.conn;
    } else {
        // if not we define it
        const conString = process.env.MONGO_URL;
        const promise = mongoose.connect(conString, { autoIndex: true, });

        global.mongoose = {
            conn: await promise,
            promise
        };
        console.log("newly connected");

        return await promise;
    }
}


