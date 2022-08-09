'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {

  class s_level extends Model {

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
        foreignKey: "leve_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "leve_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "leve_deletedBy",
      });

      // ---------------------------

      this.hasMany(models.user, {
        as: "studentLevel",
        foreignKey: {
          name: "user_leve_id",
          allowNull: true
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.hasMany(models.s_subject, {
        as: "subjectLevel",
        foreignKey: {
          name: "subj_leve_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

    }
  }

  s_level.init({
    leve_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    leve_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Level name should not be empty." }
      }
    },
    leve_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    leve_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    leve_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    leve_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    }
  }, {
    sequelize,
    modelName: 's_level',
    timestamps: true,
    createdAt: "leve_createdAt",
    updatedAt: "leve_updatedAt",
    paranoid: true,
    deletedAt: "leve_deletedAt"
  });
  return s_level;
};