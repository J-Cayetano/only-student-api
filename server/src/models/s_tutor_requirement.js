'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class s_tutor_requirement extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

      this.belongsTo(models.user, {
        as: "tutorRequirements",
        foreignKey: {
          name: "tutr_tutor_id",
          allowNull: true
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsTo(models.s_requirement, {
        as: "requirementRequirements",
        foreignKey: {
          name: "tutr_requ_id",
          allowNull: true
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
    }
  }

  s_tutor_requirement.init({
    tutr_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    tutr_tutor_id: {
      type: DataTypes.UUID
    },
    tutr_requ_id: {
      type: DataTypes.UUID
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
      validate: {
        isUrl: true
      }
    },
    tutr_createdBy: {
      type: DataTypes.UUID
    },
    tutr_updatedBy: {
      type: DataTypes.UUID
    },
    tutr_deletedBy: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 's_tutor_requirement',
    timestamps: true,
    createdAt: "tutr_createdAt",
    updatedAt: "tutr_updatedAt",
    paranoid: true,
    deletedAt: "tutr_deletedAt"
  });
  return s_tutor_requirement;
};