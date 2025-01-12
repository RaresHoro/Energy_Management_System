// DeviceController.java

package com.example.devicemanagement.controller;

import com.example.devicemanagement.dto.UserDTO;
import com.example.devicemanagement.entity.Device;
import com.example.devicemanagement.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/device")
public class DeviceController {
    @Autowired
    private DeviceService deviceService;

    @PostMapping
    public Device createDevice(@RequestBody Device device) {
        return deviceService.save(device);
    }

    @GetMapping
    public List<Device> getAllDevices() {
        return deviceService.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Device> getDevicesByUserId(@PathVariable Long userId) {
        return deviceService.findByUserId(userId);
    }

    @GetMapping("/{id}/user")
    public ResponseEntity<UserDTO> getUserForDevice(@PathVariable Long id) {
        UserDTO user = deviceService.getUserForDevice(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        deviceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id, @RequestBody Device updatedDevice) {
        Device existingDevice = deviceService.findById(id);
        if (existingDevice != null) {
            existingDevice.setName(updatedDevice.getName());
            existingDevice.setType(updatedDevice.getType());
            existingDevice.setUserId(updatedDevice.getUserId()); // Update the userId as well


            deviceService.save(existingDevice);
            return ResponseEntity.ok(existingDevice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteDevicesByUserId(@PathVariable Long userId) {
        deviceService.deleteByUserId(userId); // This method should delete devices with the given userId
        return ResponseEntity.noContent().build(); // Return 204 No Content if deletion is successful
    }





}
