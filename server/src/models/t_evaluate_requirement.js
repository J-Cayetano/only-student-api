'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class t_evaluate_requirement extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

      this.belongsTo(models.user, {
        as: "evaluatorEval",
        foreignKey: {
          name: "evre_evaluator_id",
          allowNull: true
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsTo(models.user, {
        as: "tutorEval",
        foreignKey: {
          name: "evre_tutor_id",
          allowNull: true
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsTo(models.s_tutor_requirement, {
        as: "requirementsEval",
        foreignKey: {
          name: "evre_tutr_id",
          allowNull: true
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
    }
  }

  t_evaluate_requirement.init({
    evre_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    evre_evaluator_id: {
      type: DataTypes.UUID
    },
    evre_tutor_id: {
      type: DataTypes.UUID
    },
    evre_tutr_id: {
      type: DataTypes.UUID
    },
    evre_remarks: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Remarks should not be empty." }
      }
    },
    evre_status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Status should not be empty." }
      }
    },
    evre_createdBy: {
      type: DataTypes.UUID
    },
    evre_updatedBy: {
      type: DataTypes.UUID
    },
    evre_deletedBy: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 't_evaluate_requirement',
    timestamps: true,
    createdAt: "evre_createdAt",
    updatedAt: "evre_updatedAt",
    paranoid: true,
    deletedAt: "evre_deletedAt"
  });
  return t_evaluate_requirement;
};