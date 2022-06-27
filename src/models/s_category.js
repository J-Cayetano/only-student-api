'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class s_category extends Model {

    static associate(models) {

    }

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
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
      type: DataTypes.STRING,
      allowNull: true
    },
    cate_createdBy: {
      type: DataTypes.UUID
    },
    cate_updatedBy: {
      type: DataTypes.UUID
    },
    cate_deletedBy: {
      type: DataTypes.UUID
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