package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.AddressRequest;
import com.corely.corely_backend.dto.response.AddressResponse;
import com.corely.corely_backend.entity.Address;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.mapper.AddressMapper;
import com.corely.corely_backend.repository.AddressRepository;
import com.corely.corely_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class AddressService {
    AddressRepository addressRepository;
    UserRepository userRepository;
    AddressMapper addressMapper;

    public List<AddressResponse> getMyAddresses() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        return addressRepository.findByUserId(userId).stream()
                .map(addressMapper::toAddressResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public AddressResponse createAddress(AddressRequest request) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Address address = addressMapper.toAddress(request);
        address.setUser(userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
        if (Boolean.TRUE.equals(request.getIsDefault())) resetDefault(userId);
        return addressMapper.toAddressResponse(addressRepository.save(address));
    }

    @Transactional
    public AddressResponse updateAddress(UUID id, AddressRequest request) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Address address = addressRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        if (!address.getUser().getId().equals(userId)) throw new AppException(ErrorCode.UNAUTHORIZED);
        if (Boolean.TRUE.equals(request.getIsDefault())) resetDefault(userId);
        addressMapper.updateAddress(address, request);
        return addressMapper.toAddressResponse(addressRepository.save(address));
    }

    @Transactional
    public void deleteAddress(UUID id) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Address address = addressRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        if (!address.getUser().getId().equals(userId)) throw new AppException(ErrorCode.UNAUTHORIZED);
        addressRepository.delete(address);
    }

    @Transactional
    public void setDefault(UUID id) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        Address address = addressRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ADDRESS_NOT_FOUND));
        if (!address.getUser().getId().equals(userId)) throw new AppException(ErrorCode.UNAUTHORIZED);
        resetDefault(userId);
        address.setIsDefault(true);
        addressRepository.save(address);
    }

    private void resetDefault(String userId) {
        addressRepository.findByUserId(userId).forEach(a -> {
            a.setIsDefault(false);
            addressRepository.save(a);
        });
    }
}