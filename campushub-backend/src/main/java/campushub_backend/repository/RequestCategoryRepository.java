package campushub_backend.repository;

import campushub_backend.entity.RequestCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestCategoryRepository extends JpaRepository<RequestCategory, Long> {
}
