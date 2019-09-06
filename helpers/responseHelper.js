class ResponseHelper{
    static successRetrieval(status, data, res){
        res.status(status).json({
            status:status,
            data,
        });
    }

    static successMessage(status, message, data, res){
        res.status(status).json({
            status: status, 
            message,
            data,
        });
    }

    static errorMessage(status, message, res){
        res.status(status).json({
            status: status, 
            message
        });
    }
}

export default ResponseHelper;