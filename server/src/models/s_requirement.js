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

      this.belongsTo(models.s_type, {
        as: "requirementType",
        foreignKey: {
          name: "requ_type_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

    }
  }

  s_requirement.init({
    requ_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    requ_type_id: {
      type: DataTypes.UUID
    },
    requ_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Requirement name should not be empty." }
      }
    },
    requ_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    requ_createdBy: {
      type: DataTypes.UUID
    },
    requ_updatedBy: {
      type: DataTypes.UUID
    },
    requ_deletedBy: {
      type: DataTypes.UUID
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