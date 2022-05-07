import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost, dislikePost} from '../controllers/posts.js';
import auth from '../middleware/auth.js';


const router = express.Router();


router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id',auth, updatePost)
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', likePost);
router.patch('/:id/dislikePost', dislikePost);


export default router;