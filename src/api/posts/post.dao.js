import { instances } from 'hapi-sequelizejs'

const Post = instances.getModel('Post');

export default class PostsDAO {
    
    findAll(){
        return Post.findAll();
    }
}