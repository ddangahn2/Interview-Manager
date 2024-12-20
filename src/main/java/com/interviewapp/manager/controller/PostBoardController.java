package com.interviewapp.manager.controller;

import com.interviewapp.manager.DTO.PostDTO;
import com.interviewapp.manager.domain.Post;
import com.interviewapp.manager.repository.MemoryPostRepository;
import com.interviewapp.manager.repository.PostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostBoardController {

    private final PostRepository postRepository = new MemoryPostRepository();

    @GetMapping
    public PostDTO[] getPost(
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit
    ){
        Post[] posts = postRepository.getPost((long) offset, limit);

        PostDTO[] postDTOs = new PostDTO[posts.length];

        for(int i=0; i<posts.length; i++){
            postDTOs[i] = new PostDTO(posts[i].getUserName(), posts[i].getContent());
        }
        return postDTOs;
    }

    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostDTO postDTO){
        try{
            String userName = postDTO.getUserName();
            String content = postDTO.getContent();

            postRepository.createPost(userName, content);

            return ResponseEntity.status(HttpStatus.CREATED).body("게시글 생성 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 서버 에러");
        }
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deletePost(@PathVariable Long id, @RequestBody PostDTO postDTO){
//        try{
//            String userName = postDTO.getUserName();
//
//
//        }
//    }
}
