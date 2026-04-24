package campushub_backend.dto;

public class LoginResponse {
    private Long id;
    private String message;
    private String username;
    private String email;
    private String role;
    private String token;

    public LoginResponse() {
    }

    public LoginResponse(Long id, String message, String username, String email, String role, String token) {
        this.id = id;
        this.message = message;
        this.username = username;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getToken() {
        return token;
    }
}
