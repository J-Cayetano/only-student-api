'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {

  class s_requirement extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

      // User -> created, updated, deleted
      this.belongsTo(models.user, {
        as: "createdBy",
        foreignKey: "requ_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "requ_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "requ_deletedBy",
      });

      // ---------------------------------

      this.belongsToMany(models.user, { through: models.t_tutor_requirement, as: "requirementforUser", foreignKey: 'tutr_requ_id', otherKey: 'tutr_tutor_id' })

    }
  }

  s_requirement.init({

    requ_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    requ_type_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.s_type,
        key: "type_id"
      }
    },
    requ_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Requirement name should not be empty." }
      }
    },
    requ_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    requ_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    requ_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    requ_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    }
  }, {
    sequelize,
    modelName: 's_requirement',
    timestamps: true,
    createdAt: "requ_createdAt",
    updatedAt: "requ_updatedAt",
    paranoid: true,
    deletedAt: "requ_deletedAt"
  });
  return s_requirement;
};