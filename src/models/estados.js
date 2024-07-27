module.exports = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
      id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome_estado: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sigla_estado: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      tableName: 'Estados',
      timestamps: false 
    });
  
    return Estado;
  };