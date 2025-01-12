package com.example.Chat.controller;

import com.example.Chat.entity.ChatRoom;
import com.example.Chat.entity.Message;
import com.example.Chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ChatRoom createChatRoom(@RequestBody(required = false) Map<String, String> requestData) {
        String name = requestData != null ? requestData.get("name") : null;
        return chatService.createChatRoom(name);
    }

    @PostMapping("/{chatRoomId}/message")
    public Message sendMessage(
            @PathVariable Long chatRoomId,
            @RequestBody Map<String, String> messageData) {
        return chatService.sendMessage(
                chatRoomId,
                messageData.get("sender"),
                messageData.get("content")
        );
    }

    @GetMapping("/{chatRoomId}/messages")
    public List<Message> getMessages(@PathVariable Long chatRoomId) {
        return chatService.getMessages(chatRoomId);
    }

    @GetMapping
    public List<ChatRoom> getAllChatRooms() {
        return chatService.getAllChatRooms();
    }



}

