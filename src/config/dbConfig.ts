import mongoose from 'mongoose';

export async function connecctToDb() {
  try {
    await mongoose.connect(process.env.DB_URI!);
      const connection  : any =  await mongoose.connection

      connection.on('connected', () => {
        console.log('Connected to MongoDB');
      });

      connection.on('error', (error : any) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}