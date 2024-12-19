package com.interviewapp.manager.repository;

import com.interviewapp.manager.domain.Post;

import java.util.HashMap;
import java.util.Map;

public class MemoryPostRepository implements PostRepository{

    long id = 0L;
    Map<Long, Post> postMap = new HashMap<>();

    @Override
    public Post createPost(String userName, String content) {
        Post post = new Post(id++, userName, content);
        postMap.put(post.getId(), post);
        return post;
    }

    @Override
    public Post[] getPost(Long offset, int limit) {
        Post[] posts;
        if(postMap.size() < limit)
            posts = new Post[postMap.size()];
        else
            posts = new Post[limit];

        for(int i=0; i<posts.length; i++) {
            posts[i] = postMap.get(offset + i);
        }
        return posts;
    }

    @Override
    public Post[] getPost(Long offset) {
        return getPost(offset, 10);
    }

    @Override
    public Post[] getPost() {
        return getPost(0L, 10);
    }

    @Override
    public boolean updatePost(String userName, Long postId, String content) {
        Post post = postMap.get(postId);

        if(userName.equals(post.getUserName())){
            post.setContent(content);
            return true;
        }
        return false;
    }

    @Override
    public boolean deletePost(String userName, Long postId) {
        Post post = postMap.get(postId);

        if(userName.equals(post.getUserName())){
            postMap.remove(post.getId());
            return true;
        }
        return false;
    }
}
