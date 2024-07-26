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
    tableName: 'Tipo_usuario', // Especifica o nome da tabela no banco de dados
    timestamps: false,  // Se não estiver usando as colunas createdAt e updatedAt
  });

  return Tipo_usuario;
};