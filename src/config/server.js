//const Hapi = require('@hapi/hapi');

console.log('src/config/server.js');

import Hapi from '@hapi/hapi';

// const { CREATED, NO_CONTENT } = require('http-status');
import { CREATED, NO_CONTENT } from 'http-status';

//const { Sequelize, Model, DataTypes } = require('sequelize');
import { Sequelize, Model, DataTypes } from 'sequelize';

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

    await server.register([
        {
            plugin: require('hapi-sequelizejs'),
            options: [
                {
                    name: 'fitafit',
                    models: [
                        'src/api/**/**.models.js'
                    ],
                    sequelize,
                    sync:true
                }
            ]
        },{
        
            plugin: require('hapi-router'),
            options:  {
                routes: 'src/api/**/**.routes.js'
            }
        }
    ])  
    

    server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
            return 'Hello hapi';
        }
    });

    // server.route({
    //     method: 'GET',
    //     path: '/posts',
    //     handler: async (request, h) => {
    //         return await Post.findAll();
    //     }
    // });

    // server.route({
    //     method: 'GET',
    //     path: '/posts/{id}',
    //     handler: async (request, h) => {
    //         const { id } = request.params;

    //         return await Post.findByPk(id);
    //     }
    // });

    // server.route({
    //     method: 'POST',
    //     path: '/posts',
    //     handler: async (request, h) => {
    //         const { payload } = request;
    //         //return await Post.create(payload);
    //         const post = await Post.create(payload);

    //         return h.response(post).code(CREATED);
    //     }
    // });

    // server.route({
    //     method: 'PUT',
    //     path: '/posts/{id}',
    //     handler: async (request, h) => {
    //         const { params: { id }, payload } = request; //recebe do request o id e os demais parametros vao para o payload
    //         await Post.update(payload, { where: { id }});
    //         const post = await Post.findByPk(id);
    //         return post;
    //     }
    // });

    // server.route({
    //     method: 'DELETE',
    //     path: '/posts/{id}',
    //     handler: async (request, h) => {
    //         const { id } = request.params; //extraindo apenas o id dos params
    //         await Post.destroy({ where: { id }});

    //         return h.response().code(NO_CONTENT);
    //     }
    // });

    try {
        //await sequelize.sync({ force: true });
        await sequelize.sync();
        // Post.bulkCreate(data);
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