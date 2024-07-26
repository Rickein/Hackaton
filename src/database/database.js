const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres.ggjuytdnorpbymeyxfnx', '9rtpIwhvzacatQvq', {
  host: 'aws-0-us-west-1.pooler.supabase.com',
  dialect: 'postgres',
});

module.exports = sequelize;