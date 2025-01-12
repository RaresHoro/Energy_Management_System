package com.example.Chat.controller;

import com.example.Chat.entity.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatWebSocketController {

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Message broadcastMessage(Message message) {
        message.setTimestamp(LocalDateTime.now());
        return message;
    }
}

