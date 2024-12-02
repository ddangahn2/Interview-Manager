package com.interviewapp.manager.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
public class VideoUploadController {

    // 업로드 처리 엔드포인트
    @PostMapping("/upload")
    public String handleVideoUpload(@RequestParam("video") MultipartFile file) {
        if (file.isEmpty()) {
            return "No file uploaded!";
        }

        try {
            // 업로드된 파일 저장 경로
            String uploadDir = "uploads/";
            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdir();
            }

            // 저장할 파일의 경로
            String filePath = uploadDir + file.getOriginalFilename();
            file.transferTo(new File(filePath));

            return "Video successfully uploaded to: " + filePath;
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload video: " + e.getMessage();
        }
    }
}
