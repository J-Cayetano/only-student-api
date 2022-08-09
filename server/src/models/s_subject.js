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

      // User -> created, updated, deleted
      this.belongsTo(models.user, {
        as: "createdBy",
        foreignKey: "subj_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "subj_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "subj_deletedBy",
      });

      // --------------------------

      this.hasMany(models.t_class, {
        as: "subjectClass",
        foreignKey: {
          name: 'class_subj_id',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsTo(models.s_level, {
        as: "subjectLevel",
        foreignKey: "subj_leve_id",
      });

      this.belongsTo(models.s_category, {
        as: "subjectCategory",
        foreignKey: "subj_cate_id",
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
      type: DataTypes.UUID,
      references: {
        model: sequelize.s_level,
        key: "leve_id",
      }
    },
    subj_cate_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.s_category,
        key: "cate_id",
      }
    },
    subj_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Subject name should not be empty." }
      }
    },
    subj_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    subj_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    subj_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    subj_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
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