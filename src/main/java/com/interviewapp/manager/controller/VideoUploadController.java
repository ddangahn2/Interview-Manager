package com.interviewapp.manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/upload")
public class VideoUploadController {

    private static final String UPLOAD_DIR = "/Users/hansang-ahn/Desktop/";

    @PostMapping
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        if(file.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일이 비어있습니다");
        }
        try{
            File destination = new File(UPLOAD_DIR + file.getOriginalFilename());
            file.transferTo(destination);

            return ResponseEntity.status(HttpStatus.OK).body("파일 업로드 성공");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패" + e.getMessage());
        }
    }
}