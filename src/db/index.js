import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDB = async ()=>{
    try{
        const connInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n DB Connected!! DB HOST: ${connInstance.connection.host}`);
    }catch(error){
        console.log(`MONGODB CONNECTION FAILED:${error}`);
        process.exit(1);
    }
}

export default connectDB