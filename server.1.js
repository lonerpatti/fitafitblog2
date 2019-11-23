const Hapi = require('@hapi/hapi');

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite:blog.sqlite');




const data = [
    {
        title: 'Novo post',
        content: 'Ola abigos, nosso primeiro post'
    },
    {
        title: 'Outro post',
        content: 'Ola abigos, estamos à todo vapor produzindo conteúdo por aqui ;)'
    }
];

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    class Post extends Model {}
    Post.init({
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, { sequelize, modelName: 'post'});

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return 'Hello hapi';
        }
    });

    server.route({
        method: 'GET',
        path: '/posts',
        handler: async (request, h) => {
            return await Post.findAll();
        }
    });

    server.route({
        method: 'GET',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const { id } = request.params;
            const post = data.find(post => post.id === +id);

            return post || {};
        }
    });

    try {
        //await sequelize.sync({ force: true });
        await sequelize.sync();
        Post.bulkCreate(data);
    } catch (error) {
        throw new Error(error);
    }

    await server.start();
    
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();