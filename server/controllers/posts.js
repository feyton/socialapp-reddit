import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose'


export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    }catch(error){
        res.status(404).json({message: error.message});

    }
}

export const createPost = async (req, res) =>{
    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()});
    try{
        await newPostMessage.save();
        res.status(201).json(newPostMessage);

    }catch(error){
        res.status(409).json({message: error.message});

    }

}


export const updatePost = async(req, res) => {
    const {id} = req.params;
    //mongoose.Types.ObjectId(req.params.id.trim());

    const {title, message, creator, selectedFile, tags}= req.body;
    // if (!mongoose.Types.ObjectID.isValid(_id)) return res.satus(404).send('No post with that id');

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id};
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);

}

export const deletePost = async(req, res) => {
    const{id} = req.params;
    await PostMessage.findByIdAndRemove(id);
    res.json({message: "Post Deleted successfully!"})
}


export const likePost = async(req, res) => {
    
    const{ id} = req.params;
    const  post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1},{new: true} )
    res.json(updatedPost);
}


export const dislikePost = async(req, res) => {
    const{ id} = req.params;
    const  post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount - 1},{new: true} )
    res.json(updatedPost);
}
