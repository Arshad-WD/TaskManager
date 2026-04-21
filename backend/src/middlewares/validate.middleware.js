export const validate = (schema) => (req, res, next) => {
    try{
        const result = schema.parse(req.body);
        req.body = result; // sanitized data;
        next();
    }catch(error){
        return res.status(400).json({
            message: error.errors?.[0]?.message || "Validation error",
        });
    }
};

