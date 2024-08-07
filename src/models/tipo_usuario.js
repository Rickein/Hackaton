module.exports = (sequelize, DataTypes) => {
  const Tipo_usuario = sequelize.define('Tipo_usuario', {
    id_tipo_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Tipo_usuario', 
    timestamps: false, 
  });

  return Tipo_usuario;
};