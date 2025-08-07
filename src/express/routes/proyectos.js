const {models} = require('../../sequelize')
const { Sequelize } = require('sequelize')

async function getAll(req, res) {
    const { q } = req.query;
    let where = {};
    if (q) {
        where = {
            [Sequelize.Op.or]: [
                { nombre: { [Sequelize.Op.like]: `%${q}%` } }
            ]
        };
    }
    try {
        const proyectos = await models.proyecto.findAll({ where });
        res.status(200).json(proyectos);
    } catch (error) {
        console.error("ERROR EN GET ALL DE PROYECTO:", error);
        res.status(500).json({ message: "Error interno", error });
    }
}

async function getById(req, res) {
	const id = req.params.id;
	const proyecto = await models.proyecto.findByPk(id);
	if (proyecto) {
		res.status(200).json(proyecto);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.proyecto.create(req.body);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = req.params.id;
	if (req.body.id === id) {
		await models.proyecto.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function remove(req, res) {
	const id = req.params.id;
	await models.proyecto.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

//handlers
module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
