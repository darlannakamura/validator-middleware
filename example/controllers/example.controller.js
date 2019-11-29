exports.helloWorld = async (req, res) => {
    res.status(200).send({
        message: 'Hello world!'
    });
}

exports.add = async (req, res) => {
    const { name, cpf } = req.body;

    res.status(200).send({
        user: { name, cpf }
    });
}
