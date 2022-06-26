'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class s_subject extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

      this.belongsTo(models.s_level, {
        as: "subjectLevel",
        foreignKey: {
          name: "subj_leve_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsTo(models.s_category, {
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

  s_subject.init({
    subj_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    subj_leve_id: {
      type: DataTypes.UUID
    },
    subj_cate_id: {
      type: DataTypes.UUID
    },
    subj_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Subject name should not be empty." }
      }
    },
    subj_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subj_createdBy: {
      type: DataTypes.UUID
    },
    subj_updatedBy: {
      type: DataTypes.UUID
    },
    subj_deletedBy: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 's_subject',
    timestamps: true,
    createdAt: "subj_createdAt",
    updatedAt: "subj_updatedAt",
    paranoid: true,
    deletedAt: "subj_deletedAt"
  });
  return s_subject;
};