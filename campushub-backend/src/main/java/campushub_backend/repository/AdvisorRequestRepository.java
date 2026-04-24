package campushub_backend.repository;

import campushub_backend.entity.AdvisorRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdvisorRequestRepository extends JpaRepository<AdvisorRequest, Long> {
    List<AdvisorRequest> findByStudentId(Long studentId);
    List<AdvisorRequest> findByAdvisorId(Long advisorId);
}
