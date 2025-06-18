const {models} = require('../../sequelize')

async function getAll(req, res) {
	const cuentavueltas = await models.cuentavueltas_item.findAll();
	res.status(200).json(cuentavueltas);
};

async function getById(req, res) {
	const id = req.params.id;
	const cuentavueltas_item = await models.cuentavueltas_item.findByPk(id);
	if (cuentavueltas_item) {
		res.status(200).json(cuentavueltas_item);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		await models.cuentavueltas_item.create(req.body);
		res.status(201).end();
	}
};

async function update(req, res) {
	const id = req.params.id;
	if (req.body.id === id) {
		await models.cuentavueltas_item.update(req.body, {
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
	await models.cuentavueltas_item.destroy({
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
