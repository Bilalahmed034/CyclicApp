
const validatorHandler = (req, res, next, schema) => {
    const { error } = schema.validate(req.body);

    if (error) {
       res.status(200).json({
            status: 'false',
            check:"i am coming from here",
            message: error.details[0].message.replace('/[^a-zA-Z0-9 ]/g', '')
        });
        return;
    }
    next();
};

module.exports = validatorHandler;