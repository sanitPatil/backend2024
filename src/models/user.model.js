import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String, //  CLOUDINARY URI
        required:true
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video",
        }
    ],
    password:{
        type:String,
        required:[true,"password must be provided and have length >=8 "]
    },
    refreshToken:{
        type:String,

    },

},{timestamps:true});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt(this.password, 10);
    next()
})

UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


UserSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id:this._id,
            username:this.username,
            fullname:this.fullname,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

UserSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            id:this._id,
            
        },
        process.env.PEFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.PREFRESH_TOKEN_EXPIRY
        }

    )
}


const User = mongoose.model("User",UserSchema)


