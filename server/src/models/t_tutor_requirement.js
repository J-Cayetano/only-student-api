'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class t_tutor_requirement extends Model {

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
        foreignKey: "tutr_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "tutr_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "tutr_deletedBy",
      });

      // ---------------------------------



    }
  }

  t_tutor_requirement.init({

    tutr_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    tutr_evaluator_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id"
      }
    },
    tutr_remarks: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Remarks should not be empty." }
      }
    },
    tutr_requirementLink: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    tutr_fileLink: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("tutr_fileLink");
        return rawValue ? "http://localhost:3600/public/" + rawValue : null;
      }
    },
    tutr_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    tutr_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    tutr_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    }
  }, {
    sequelize,
    modelName: 't_tutor_requirement',
    timestamps: true,
    createdAt: "tutr_createdAt",
    updatedAt: "tutr_updatedAt",
    paranoid: true,
    deletedAt: "tutr_deletedAt"
  });
  return t_tutor_requirement;
};