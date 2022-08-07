'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {

  class s_type extends Model {

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
        foreignKey: "type_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "type_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "type_deletedBy",
      });

      // ---------------------------

      this.hasMany(models.user, {
        as: "professionType",
        foreignKey: {
          name: 'user_type_id',
          allowNull: true
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.hasMany(models.s_requirement, {
        as: "requirementType",
        foreignKey: {
          name: 'requ_type_id',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
    }
  }


  s_type.init({
    type_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Type name should not be empty." }
      }
    },
    type_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    type_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    type_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    }
  }, {
    sequelize,
    modelName: 's_type',
    timestamps: true,
    createdAt: "type_createdAt",
    updatedAt: "type_updatedAt",
    paranoid: true,
    deletedAt: "type_deletedAt"
  });
  return s_type;
};