const { error, success } = require("../utils/responseWrapper");
const Post = require("../models/Post");
const User = require("../models/User");

const getAllPostsController = async (req, res) => {
  console.log(req._id);
  return res.send(success(200, "These are all the posts"));
};

const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;

    if(!caption){
      return res.send(error(400, 'Caption is required'));
    }

    const owner = req._id;

    const user = await User.findById(req._id);

    const post = await Post.create({
      owner,
      caption,
    });

    user.posts.push(post._id);
    await user.save();

    return res.send(success(201, post));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const likeAndUnlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.send(error(404, "Post not found"));
    }

    const userLiked = post.likes.includes(curUserId);

    if (userLiked) {
      // User already liked the post, so unlike it
      const index = post.likes.indexOf(curUserId);
      post.likes.splice(index, 1);
    } else {
      // User didn't like the post, so add a like
      post.likes.push(curUserId);
    }

    await post.save();
    return res.send(success(200, userLiked ? "Post unliked" : "Post liked"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const updatePostController = async (req, res) => {
  try {
    const { postId, caption } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.send(error(404, 'Post not found'));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, 'You are not authorized to update this post'));
    }

    if (caption) {
      post.caption = caption;
    }

    await post.save();
    return res.send(success(200, { post }));

  } catch (err) {
    return res.send(error(500, err.message));
  }

};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const curUserId = req._id;

    const post = await Post.findById(postId);
    const curUser = await User.findById(curUserId);
    if (!post) {
      return res.send(error(404, 'Post not found'));
    }

    if (post.owner.toString() !== curUserId) {
      return res.send(error(403, 'You are not authorized to delete this post'));
    }

    const index = curUser.posts.indexOf(postId);
    curUser.posts.splice(index, 1); // Use splice to remove the item from the array
    await curUser.save();
    
    // Use the remove method to delete the post
    await post.deleteOne();
    return res.send(success(200, 'Post deleted'));
  } catch (err) {
    return res.send(error(501, err.message));
  }
};




module.exports = {
  getAllPostsController,
  createPostController,
  likeAndUnlikePost,
  updatePostController,
  deletePost
};
