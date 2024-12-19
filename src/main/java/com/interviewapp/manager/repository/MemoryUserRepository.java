package com.interviewapp.manager.repository;

import com.interviewapp.manager.domain.User;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemoryUserRepository implements UserRepository{

    long id = 0L;
    Map<Long, User> userMap = new HashMap<>();

    @Override
    public User createUser(String userName, String password) {
        User user = new User(id++, userName, password);
        userMap.put(user.getId(), user);
        return user;
    }

    @Override
    public User deleteUser(Long id) {
        return userMap.remove(id);
    }

    @Override
    public boolean duplicatedUserName(String userName) {
        User user = findByUserName(userName);

        return user != null;
    }

    @Override
    public User findByUserName(String userName) {
        List<Map.Entry<Long, User>> userList = new ArrayList<>(userMap.entrySet());

        for(Map.Entry<Long, User> entry : userList){
            if(userName.equals(entry.getValue().getUserName())) {
                return entry.getValue();
            }
        }
        return null;
    }

    @Override
    public User isUser(String userName, String password) {
        User user = findByUserName(userName);

        if(user == null) {
            throw new IllegalArgumentException("사용자가 존재하지 않습니다.");
        }
        if(!user.getPassword().equals(password)){
            throw new IllegalArgumentException("비밀번호가 틀렸습니다.");
        }
        return user;
    }
}
