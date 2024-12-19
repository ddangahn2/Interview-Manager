package com.interviewapp.manager.repository;

import com.interviewapp.manager.domain.User;

public interface UserRepository {

    User createUser(String userName, String password);
    User deleteUser(Long id);
    boolean duplicatedUserName(String userName);
    User findByUserName(String userName);
    User isUser(String userName, String password);

}
