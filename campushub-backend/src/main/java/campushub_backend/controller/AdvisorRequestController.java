package campushub_backend.controller;

import campushub_backend.dto.CreateAdvisorRequest;
import campushub_backend.entity.AdvisorRequest;
import campushub_backend.entity.RequestCategory;
import campushub_backend.entity.RequestStatus;
import campushub_backend.entity.User;
import campushub_backend.repository.AdvisorRequestRepository;
import campushub_backend.repository.RequestCategoryRepository;
import campushub_backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
public class AdvisorRequestController {

    private final AdvisorRequestRepository advisorRequestRepository;
    private final UserRepository userRepository;
    private final RequestCategoryRepository requestCategoryRepository;

    public AdvisorRequestController(
            AdvisorRequestRepository advisorRequestRepository,
            UserRepository userRepository,
            RequestCategoryRepository requestCategoryRepository
    ) {
        this.advisorRequestRepository = advisorRequestRepository;
        this.userRepository = userRepository;
        this.requestCategoryRepository = requestCategoryRepository;
    }

    @GetMapping
    public List<AdvisorRequest> getAllRequests() {
        return advisorRequestRepository.findAll();
    }

    @PostMapping
    public Object createRequest(@RequestBody CreateAdvisorRequest request) {

        User student = userRepository.findById(request.getStudentId()).orElse(null);
        if (student == null) {
            return "Student not found";
        }

        User advisor = userRepository.findById(request.getAdvisorId()).orElse(null);
        if (advisor == null) {
            return "Advisor not found";
        }

        RequestCategory category = requestCategoryRepository.findById(request.getCategoryId()).orElse(null);
        if (category == null) {
            return "Category not found";
        }

        AdvisorRequest advisorRequest = AdvisorRequest.builder()
                .student(student)
                .advisor(advisor)
                .category(category)
                .message(request.getMessage())
                .status(RequestStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        return advisorRequestRepository.save(advisorRequest);
    }

    @GetMapping("/student/{studentId}")
    public List<AdvisorRequest> getRequestsByStudent(@PathVariable Long studentId) {
        return advisorRequestRepository.findByStudentId(studentId);
    }

    @GetMapping("/advisor/{advisorId}")
    public List<AdvisorRequest> getRequestsByAdvisor(@PathVariable Long advisorId) {
        return advisorRequestRepository.findByAdvisorId(advisorId);
    }
    @PutMapping("/{requestId}/accept")
public Object acceptRequest(@PathVariable Long requestId) {
    Optional<AdvisorRequest> optionalRequest = advisorRequestRepository.findById(requestId);

    if (optionalRequest.isEmpty()) {
        return "Request not found";
    }

    AdvisorRequest advisorRequest = optionalRequest.get();
    advisorRequest.setStatus(RequestStatus.ACCEPTED);

    return advisorRequestRepository.save(advisorRequest);
}

@PutMapping("/{requestId}/reject")
public Object rejectRequest(@PathVariable Long requestId) {
    Optional<AdvisorRequest> optionalRequest = advisorRequestRepository.findById(requestId);

    if (optionalRequest.isEmpty()) {
        return "Request not found";
    }

    AdvisorRequest advisorRequest = optionalRequest.get();
    advisorRequest.setStatus(RequestStatus.REJECTED);

    return advisorRequestRepository.save(advisorRequest);
}
}
