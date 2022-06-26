'use strict';

// Import Packages
const { Model } = require('sequelize');

// Protected Attributes
const PROTECTED_ATTR = [""];

// -----------------------------------------

module.exports = (sequelize, DataTypes) => {
  class t_class extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

      this.belongsTo(models.user, {
        as: "studentClass",
        foreignKey: {
          name: "class_student_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsTo(models.user, {
        as: "tutorClass",
        foreignKey: {
          name: "class_tutor_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsTo(models.s_subject, {
        as: "subjectClass",
        foreignKey: {
          name: "class_subj_id",
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });
    }
  }

  t_class.init({
    class_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    class_student_id: {
      type: DataTypes.UUID
    },
    class_tutor_id: {
      type: DataTypes.UUID
    },
    class_subj_id: {
      type: DataTypes.UUID
    },
    class_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: { msg: "Class name should not be empty." }
      }
    },
    type_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    class_status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Status should not be empty." }
      }
    },
    type_description: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    class_createdBy: {
      type: DataTypes.UUID
    },
    class_updatedBy: {
      type: DataTypes.UUID
    },
    class_deletedBy: {
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 't_class',
    timestamps: true,
    createdAt: "class_createdAt",
    updatedAt: "class_updatedAt",
    paranoid: true,
    deletedAt: "class_deletedAt"
  });
  return t_class;
};