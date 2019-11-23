import PostDAO from './post.dao';

const postDAO = new PostDAO();

export async function list(request, h) {
    
    return await postDAO.findAll();

}
