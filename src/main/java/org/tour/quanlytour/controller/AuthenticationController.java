package org.tour.quanlytour.controller;

import com.nimbusds.jose.JOSEException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tour.quanlytour.dtos.request.AuthenticationRequest;
import org.tour.quanlytour.dtos.request.IntrospectRequest;
import org.tour.quanlytour.dtos.request.LogoutRequest;
import org.tour.quanlytour.dtos.request.RefreshRequest;
import org.tour.quanlytour.dtos.response.ApiResponse;
import org.tour.quanlytour.dtos.response.AuthenticationResponse;
import org.tour.quanlytour.dtos.response.IntrospectResponse;
import org.tour.quanlytour.services.impl.AuthenticationService;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor

@RequestMapping("${api.prefix}/auth")
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class AuthenticationController {
    AuthenticationService authenticationService;

    @PostMapping("/token")
    public ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            AuthenticationResponse result = authenticationService.authenticate(authenticationRequest);
            return ApiResponse.<AuthenticationResponse>builder().result(result).build();
        } catch (Exception e) {
            return ApiResponse.<AuthenticationResponse>builder()
                    .code(400)
                    .message(e.getMessage())
                    .result(null)
                    .build();
        }
    }
    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest introspectRequest) throws ParseException, JOSEException {
        try {
            IntrospectResponse result = authenticationService.introspect(introspectRequest);
            return ApiResponse.<IntrospectResponse>builder()
                    .code(200)
                    .message("success")
                    .result(result).build();
        } catch (Exception e) {
            IntrospectResponse result = IntrospectResponse.builder().valid(false).build();
            return ApiResponse.<IntrospectResponse>builder()
                    .code(400)
                    .message(e.getMessage())
                    .result(result)
                    .build();
        }
    }

    @PostMapping("/logout")
    public ApiResponse<?> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        try {
            authenticationService.logout(request);
            return ApiResponse.builder()
                    .code(200)
                    .message("success")
                    .result(null)
                    .build();
        } catch (Exception e) {
            return ApiResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .result(null)
                    .build();
        }
    }
//    @PostMapping("/refresh")
//    ApiResponse<AuthenticationResponse> refresh(@RequestBody RefreshRequest refreshRequest)
//            throws Exception {
//        AuthenticationResponse result = authenticationService.refreshToken(refreshRequest);
//        return ApiResponse.<AuthenticationResponse>builder().result(result).build();
//    }


}
