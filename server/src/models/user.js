'use strict';

// Import Packages
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");


// Environment Variable
dotenv.config();
var SALT = parseInt(process.env.SALT_ROUNDS);

// Protected Attributes
const PROTECTED_ATTR = ["user_password"];

// -----------------------------------------------

module.exports = (sequelize, DataTypes) => {

  class user extends Model {

    toJSON() {
      const attr = { ...this.get() };

      for (const x of PROTECTED_ATTR) {
        delete attr[x];
      }
      return attr;
    }

    static associate(models) {

      // User -> created, updated, deleted
      this.belongsTo(user, {
        as: "createdBy",
        foreignKey: "user_createdBy",
      });

      this.belongsTo(user, {
        as: "updatedBy",
        foreignKey: "user_updatedBy",
      });

      this.belongsTo(user, {
        as: "deletedBy",
        foreignKey: "user_deletedBy",
      });

      // -------------------------------

      this.belongsTo(models.s_level, {
        as: "studentLevel",
        foreignKey: {
          name: "user_leve_id",
          allowNull: true
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsTo(models.s_type, {
        as: "professionType",
        foreignKey: {
          name: 'user_type_id',
          allowNull: true
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.belongsToMany(models.s_requirement, {
        through: models.t_tutor_requirement,
        as: "userRequirement",
        foreignKey: 'tutr_tutor_id',
        otherKey: 'tutr_requ_id'
      });

      this.hasMany(models.t_tutor_requirement, {
        as: "evaluatorOfRequirement",
        foreignKey: {
          name: 'tutr_evaluator_id',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.hasMany(models.t_class, {
        as: "tutorClass",
        foreignKey: {
          name: 'class_tutor_id',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.hasMany(models.t_class, {
        as: "studentClass",
        foreignKey: {
          name: 'class_student_id',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

      this.hasMany(models.r_feedback, {
        as: "studentFeedback",
        foreignKey: {
          name: 'feed_student_id',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'NO ACTION'
      });

    }

  }

  user.init({
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_leve_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.s_level,
        key: "leve_id",
      }
    },
    user_type_id: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.s_type,
        key: "type_id",
      }
    },
    user_access: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['evaluator', 'student', 'tutor', 'admin']],
          msg: "Must be evaluator, student, tutor"
        },
        notEmpty: true
      }
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "email",
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    user_isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false
    },
    user_firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "First name should not be null." },
        notEmpty: { msg: "First Name should not be empty." },
      }
    },
    user_middleName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Last Name should not be empty." }
      }
    },
    user_lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Last name should not be null." },
        notEmpty: { msg: "Last Name should not be empty." },
      }
    },
    user_fullName: {
      type: DataTypes.STRING,
      set(value) {
        if (this.user_middleName !== null) {
          this.setDataValue("user_fullName", this.user_firstName + " " + this.user_middleName + " " + this.user_lastName);
        } else {
          this.setDataValue("user_fullName", this.user_firstName + " " + this.user_lastName);
        }

      }
    },
    user_contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [11, 11]
      }
    },
    user_profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("user_profilePhoto");
        return rawValue ? "http://localhost:3600/public/" + rawValue : null;
      }
    },
    user_bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_isGraduated: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    user_evaluateStatus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_createdBy: {
      type: DataTypes.UUID,
      references: {
        model: user,
        key: "user_id",
      }
    },
    user_updatedBy: {
      type: DataTypes.UUID,
      references: {
        model: user,
        key: "user_id",
      }
    },
    user_deletedBy: {
      type: DataTypes.UUID,
      references: {
        model: user,
        key: "user_id",
      }
    }
  }, {
    sequelize,
    modelName: 'user',
    timestamps: true,
    createdAt: "user_createdAt",
    updatedAt: "user_updatedAt",
    paranoid: true,
    deletedAt: "user_deletedAt",
    indexes: [{ unique: true, fields: ["user_email"] }],
    hooks: {
      beforeCreate: async (user) => {
        if (user.user_password) {
          const salt = await bcrypt.genSaltSync(SALT);
          user.user_password = bcrypt.hashSync(user.user_password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.user_password) {
          const salt = await bcrypt.genSaltSync(SALT);
          user.user_password = bcrypt.hashSync(user.user_password, salt);
        }
      }
    }
  });

  return user;
};