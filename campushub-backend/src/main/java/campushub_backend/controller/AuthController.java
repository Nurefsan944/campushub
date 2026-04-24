package campushub_backend.controller;

import campushub_backend.dto.LoginRequest;
import campushub_backend.dto.LoginResponse;
import campushub_backend.dto.RegisterRequest;
import campushub_backend.entity.Role;
import campushub_backend.entity.User;
import campushub_backend.repository.UserRepository;
import campushub_backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email is already in use";
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            return "Username is already taken";
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {

        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            return "Invalid email or password";
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid email or password";
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(
                user.getId(),
                "Login successful",
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                token
        );
    }

    @GetMapping("/users")
    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/advisors")
    public java.util.List<User> getAllAdvisors() {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole().name().equals("ADVISOR"))
                .toList();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return "User not found";
        }

        userRepository.deleteById(id);
        return "User deleted successfully";
    }

    @PutMapping("/users/{id}/role")
    public Object updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        String roleValue = request.get("role");

        if (roleValue == null) {
            return "Role is required";
        }

        User user = optionalUser.get();
        user.setRole(Role.valueOf(roleValue));
        userRepository.save(user);

        return user;
    }
}
