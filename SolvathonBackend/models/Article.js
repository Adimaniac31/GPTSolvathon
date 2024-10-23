import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    analysis: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    suggestedArticle: {
        type: DataTypes.TEXT, // Assuming this is a URL or title of the suggested article
        allowNull: true,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Use ARRAY to store multiple tags
        allowNull: true,
        validate: {
            isIn: [['no problem', 'obsolete industry terms', 'outdated data', 'broken links', 'misleading data', 'other']],
        },
    },
}, {
    tableName: 'articles',
    timestamps: true, // Automatically handle createdAt and updatedAt
});

export default Article;