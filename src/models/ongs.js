module.exports = (sequelize, DataTypes) => {
    const Ong = sequelize.define('Ong', {
      id_ong: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome_ong: {
        type: DataTypes.STRING,
        allowNull: false
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao_ong: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      id_Area_atuacao: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      contato: {
        type: DataTypes.STRING,
        allowNull: true
      },
      voluntarios_inscritos_ong:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      tableName: 'Ongs',
      timestamps: false 
    });
  
    return Ong;
  };