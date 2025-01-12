// DeviceRepository.java

package com.example.devicemanagement.repository;

import com.example.devicemanagement.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByUserId(Long userId); // Find devices by user ID
}
