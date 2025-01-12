package com.example.Chat.service;

import com.example.Chat.entity.ChatRoom;
import com.example.Chat.entity.Message;
import com.example.Chat.repository.ChatRoomRepository;
import com.example.Chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private MessageRepository messageRepository;

    public ChatRoom createChatRoom(String name) {
        ChatRoom chatRoom = new ChatRoom();
        if (name != null && !name.trim().isEmpty()) {
            chatRoom.setName(name); // Assuming ChatRoom has a `setName` method
        } else {
            chatRoom.setName("Default Chat Room"); // Set a default name if none is provided
        }
        return chatRoomRepository.save(chatRoom);
    }

    public Message sendMessage(Long chatRoomId, String sender, String content) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("ChatRoom not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        message.setChatRoom(chatRoom);

        return messageRepository.save(message);
    }

    public List<Message> getMessages(Long chatRoomId) {
        return messageRepository.findByChatRoomId(chatRoomId);
    }

    public List<ChatRoom> getAllChatRooms() {
        return chatRoomRepository.findAll();
    }
}
