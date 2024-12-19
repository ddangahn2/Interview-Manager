package com.interviewapp.manager.domain;

public class Post {

    private final Long id;
    private final String userName;
    private String content;

    public Post(Long id, String userName, String content){
        this.id = id;
        this.userName = userName;
        this.content = content;
    }

    public Long getId(){
        return id;
    }

    public String getUserName(){
        return userName;
    }

    public String getContent(){
        return content;
    }

    public void setContent(String content){
        this.content = content;
    }
}
