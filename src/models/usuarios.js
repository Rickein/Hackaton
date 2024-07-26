const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id_usuarios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_completo_usuarios: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_usuarios: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha_usuarios: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_tipo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tipo_usuario',
        key: 'id_tipo_usuario',
      },
    },
    nivel_usuarios: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'Usuarios',
    timestamps: false,
  });

  Usuario.associate = models => {
    Usuario.belongsTo(models.Tipo_usuario, {
      foreignKey: 'id_tipo_usuario',
      as: 'tipo_usuario'
    });
  };

  return Usuario;
};