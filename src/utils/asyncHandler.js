const asyncHandler = (requesthandler)=>{
    return (req,res,next)=> {
        Promise.resolve(requesthandler(re,res,next)).catch((err)=> next(err))
    }
    
}

export {asyncHandler}