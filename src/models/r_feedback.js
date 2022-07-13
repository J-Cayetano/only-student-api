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

      // User -> created, updated, deleted
      this.belongsTo(models.user, {
        as: "createdBy",
        foreignKey: "feed_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "feed_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "feed_deletedBy",
      });

      // -------------------------------



    }
  }

  r_feedback.init({
    feed_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    feed_student_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    feed_class_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.t_class,
        key: "class_id",
      }
    },
    feed_rate: {
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
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    feed_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    feed_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
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