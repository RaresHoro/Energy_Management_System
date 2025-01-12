// DeviceService.java

package com.example.devicemanagement.service;

import com.example.devicemanagement.client.UserServiceClient;
import com.example.devicemanagement.dto.UserDTO;
import com.example.devicemanagement.entity.Device;
import com.example.devicemanagement.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {
    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private UserServiceClient userServiceClient; // Inject the User service client

    public Device save(Device device) {
        return deviceRepository.save(device);
    }

    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    public List<Device> findByUserId(Long userId) {
        return deviceRepository.findByUserId(userId);
    }

    public void deleteById(Long id) {
        deviceRepository.deleteById(id);
    }

    public UserDTO getUserForDevice(Long deviceId) {
        Device device = deviceRepository.findById(deviceId).orElse(null);
        if (device != null) {
            return userServiceClient.getUserById(device.getUserId());
        }
        return null;
    }

    public Device findById(Long id) {
        return deviceRepository.findById(id).orElse(null);
    }

    public void deleteByUserId(Long userId) {
        List<Device> devices = deviceRepository.findByUserId(userId);
        for (Device device : devices) {
            deviceRepository.deleteById(device.getId());
        }
    }

}
