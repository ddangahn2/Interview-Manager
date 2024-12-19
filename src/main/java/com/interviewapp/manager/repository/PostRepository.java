package com.interviewapp.manager.repository;

import com.interviewapp.manager.domain.Post;

public interface PostRepository {

    Post createPost(String userName, String content);
    Post[] getPost(Long offset, int limit);
    Post[] getPost(Long offset);
    Post[] getPost();
    boolean updatePost(String userName, Long postId, String content);
    boolean deletePost(String userName, Long postId);

}
