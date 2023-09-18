module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("student", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull : false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull:false
      },
      
    
    });
    return Student;
  };