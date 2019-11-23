import { list } from './post.controllers';

export default [
    {
        method: 'GET',
        path: '/posts',
        handler: list

    }
]

/*
const Hapi = require('@hapi/hapi');

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite:blog.sqlite');
const { CREATED, NO_CONTENT } = require('http-status');




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

            return await Post.findByPk(id);
        }
    });

    server.route({
        method: 'POST',
        path: '/posts',
        handler: async (request, h) => {
            const { payload } = request;
            //return await Post.create(payload);
            const post = await Post.create(payload);

            return h.response(post).code(CREATED);
        }
    });

    server.route({
        method: 'PUT',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const { params: { id }, payload } = request; //recebe do request o id e os demais parametros vao para o payload
            await Post.update(payload, { where: { id }});
            const post = await Post.findByPk(id);
            return post;
        }
    });

    server.route({
        method: 'DELETE',
        path: '/posts/{id}',
        handler: async (request, h) => {
            const { id } = request.params; //extraindo apenas o id dos params
            await Post.destroy({ where: { id }});

            return h.response().code(NO_CONTENT);
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
*/