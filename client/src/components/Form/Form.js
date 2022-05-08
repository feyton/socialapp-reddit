import React,  {useState, useEffect} from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


// Get the current ID of the post we are on


const Form = ({currentId,setCurrentId}) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: ''});
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(()  => {
    if(post) setPostData(post);

  }, [post])

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: ''});

  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(currentId)
      if (currentId === 0){
        dispatch(createPost({ ...postData, name: user?.result?.name}));
        clear();

      }else{
        dispatch(updatePost(currentId,{ ...postData, name: user?.result?.name}));
        clear();

      }
  };

  if(!user?.result?.name){
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Sign In to Create a Post

        </Typography>

      </Paper>
    )
  }


  return (
    <Paper className= {classes.paper}>
      < form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant='h6'> {currentId ? 'Editing' : 'Creating'} a Post</Typography>
      <TextField name="title" variant="outlined" label="Title" fullwidth value={postData.title}onChange={(e) => setPostData({...postData,title: e.target.value})}/>
      <TextField name="message" variant="outlined" label="Message" fullwidth value={postData.message}onChange={(e) => setPostData({...postData, message: e.target.value})}/>
      <TextField name="tags" variant="outlined" label="Tags" fullwidth value={postData.tags}onChange={(e) => setPostData({...postData,tags: e.target.value.split(',')})}/>
      <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone= {(base64) => setPostData({...postData,selectedFile:base64 })}/></div>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

      </form>
      </Paper>
    );
}

export default Form;
