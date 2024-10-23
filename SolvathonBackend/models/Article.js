import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';  // Import the Sequelize instance

const Article = sequelize.define('Article', {
    // Define columns
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    analysis: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    // Model options
    tableName: 'articles',
    timestamps: true
});

export default Article;