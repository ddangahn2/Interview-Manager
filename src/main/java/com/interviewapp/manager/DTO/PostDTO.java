package com.interviewapp.manager.DTO;

public class PostDTO {
    private String userName;
    private String content;

    private PostDTO() {
    }

    public PostDTO(String userName, String content){
        this.userName = userName;
        this.content = content;
    }

    public PostDTO(String userName){
        this(userName, "");
    }

    public String getUserName(){
        return userName;
    }

    public String getContent(){
        return content;
    }
}
