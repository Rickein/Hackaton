
module.exports = (sequelize, DataTypes) => {
  const Area_Atuacao = sequelize.define('Area_Atuacao', {
    id_Area_atuacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    atuacao: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'Area_Atuacao',
    timestamps: false,
  });

  return Area_Atuacao;
};