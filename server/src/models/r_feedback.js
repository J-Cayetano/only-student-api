'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class r_feedback extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

      this.belongsTo(models.user, {
        as: "studentRemarks",
        foreignKey: {
          name: "feed_student_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsTo(models.t_class, {
        as: "classRemarks",
        foreignKey: {
          name: "feed_class_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
    }
  }

  r_feedback.init({
    feed_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    feed_student_id: {
      type: DataTypes.UUID
    },
    feed_class_id: {
      type: DataTypes.UUID
    },
    type_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0,
        max: 5
      }
    },
    feed_remarks: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Remarks should not be empty." }
      }
    },
    feed_createdBy: {
      type: DataTypes.UUID
    },
    feed_updatedBy: {
      type: DataTypes.UUID
    },
    feed_deletedBy: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'r_feedback',
    timestamps: true,
    createdAt: "feed_createdAt",
    updatedAt: "feed_updatedAt",
    paranoid: true,
    deletedAt: "feed_deletedAt"
  });
  return r_feedback;
};