const app = require('./express/app');
const sequelize = require('./sequelize');
const PORT = 3001;

async function init() {
	// test database connection
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}

    // sync models (create tables if they don't exist)
   	sequelize.sync({ force: false })
	.then(() => {
		console.log('Tablas sincronizadas');
	})
	.catch(err => console.error('Error al sincronizar:', err));

	// start express server
    app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/users'.`);
	});
}

init();