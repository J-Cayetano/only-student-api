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

      // User -> created, updated, deleted
      this.belongsTo(models.user, {
        as: "createdBy",
        foreignKey: "class_createdBy",
      });

      this.belongsTo(models.user, {
        as: "updatedBy",
        foreignKey: "class_updatedBy",
      });

      this.belongsTo(models.user, {
        as: "deletedBy",
        foreignKey: "class_deletedBy",
      });

      // ---------------------------------

      this.hasMany(models.r_feedback, {
        as: "classFeedback",
        foreignKey: {
          name: 'feed_class_id',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.hasMany(models.s_schedule, {
        as: "classSchedule",
        foreignKey: {
          name: 'sche_class_id',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      })

      this.belongsTo(models.user, {
        as: "tutorClass",
        foreignKey: "class_tutor_id",
      });

      this.belongsTo(models.user, {
        as: "studentClass",
        foreignKey: "class_student_id",
      });

      this.belongsTo(models.s_subject, {
        as: "subjectClass",
        foreignKey: "class_subj_id",
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
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    class_tutor_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    class_subj_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.s_subject,
        key: "subj_id",
      }
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
      type: DataTypes.TEXT,
      allowNull: true
    },
    class_status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [['On-going', 'Finished', 'Cancelled']],
          msg: "Must be On-going, Finished, or Cancelled"
        },
        notEmpty: { msg: "Status should not be empty." }
      }
    },
    type_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    class_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    class_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
    },
    class_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.user,
        key: "user_id",
      }
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