import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Por favor, define la variable MONGODB_URI en .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Desactiva el almacenamiento en búfer de comandos
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Conectado a MongoDB Atlas');
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
