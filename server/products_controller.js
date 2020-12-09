module.exports = {
    create: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { name, description, price, image_url } = req.body;

        dbInstance.create_product([name, description, price, image_url])
            .then((product) => res.status(200).send(product))
            .catch((err) => {
                res.status(500).send({ error: 'Something went wrong related to the create controller!' });
                console.log(err)
            });
    },

    getOne: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params

        dbInstance.read_product(id)
            .then((product) => res.status(200).send(product))
            .catch((err) => {
                res.status(500).send({ error: 'Something went wrong related to the getOne controller' });
                console.log(err)
            })
    },
    getAll: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_products()
            .then((products) => res.status(200).send(products))
            .catch((err) => {
                res.status(500).send({ error: "Something went wrong related to the getAll controller" });
                console.log(err)
            })
    },
    update: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params
        const { desc } = req.query

        console.log(id, desc)

        dbInstance.update_product([id, desc])
            .then((product) => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ error: "Something went wrong related to the update controller" });
                console.log(err)
            })

    },
    delete: (req, res, next) => {
        const dbInstance = req.app.get('db')
        const { id } = req.params

        dbInstance.delete_product(id)
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ error: 'Something went wrong related to the delete controller' });
                console.log(err)
            })

    }

}