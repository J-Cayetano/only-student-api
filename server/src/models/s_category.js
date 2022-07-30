'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {

  class s_category extends Model {

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
        foreignKey: "cate_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "cate_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "cate_deletedBy",
      });

      // -----------------------------

      this.hasMany(models.s_subject, {
        as: "subjectCategory",
        foreignKey: {
          name: "subj_cate_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
    }

  }

  s_category.init({
    cate_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    cate_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Category name should not be empty." }
      }
    },
    cate_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cate_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    cate_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    cate_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    }
  }, {
    sequelize,
    modelName: 's_category',
    timestamps: true,
    createdAt: "cate_createdAt",
    updatedAt: "cate_updatedAt",
    paranoid: true,
    deletedAt: "cate_deletedAt"
  });
  return s_category;
};