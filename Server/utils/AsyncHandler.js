const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            // console.log("Error is",err)
            next(err)
        })
    }
}

export {asyncHandler}