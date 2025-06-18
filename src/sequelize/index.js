const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'db.sqlite',
	logQueryParameters: true,
	benchmark: true
});

//modelos
sequelize.define('stock',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    material: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grosor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
  timestamps: false
})

sequelize.define('proyecto',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patron: {
        type: DataTypes.STRING,
        allowNull: false
    },
    temporada: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoría: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    terminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    notas: {
    type: DataTypes.TEXT, 
    allowNull: true
    }
}, {
  timestamps: false
})

sequelize.define('cuentavueltas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vueltas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, { 
    timestamps: false 
})



//asociaciones
const {
    stock,
    proyecto,
    cuentavueltas
} = sequelize.models;

cuentavueltas.belongsTo(proyecto, {
    onDelete: 'CASCADE'
});
proyecto.hasOne(cuentavueltas, {
  foreignKey: {
    allowNull: true,
    name: 'cuentavueltasId'
  }
});


module.exports = sequelize;
