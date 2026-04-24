package campushub_backend.controller;

import campushub_backend.entity.RequestCategory;
import campushub_backend.repository.RequestCategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class RequestCategoryController {

    private final RequestCategoryRepository requestCategoryRepository;

    public RequestCategoryController(RequestCategoryRepository requestCategoryRepository) {
        this.requestCategoryRepository = requestCategoryRepository;
    }

    @GetMapping
    public List<RequestCategory> getAllCategories() {
        return requestCategoryRepository.findAll();
    }

    @PostMapping
    public RequestCategory createCategory(@RequestBody RequestCategory requestCategory) {
        return requestCategoryRepository.save(requestCategory);
    }

    @PutMapping("/{id}")
    public Object updateCategory(@PathVariable Long id, @RequestBody RequestCategory updatedCategory) {
        Optional<RequestCategory> optionalCategory = requestCategoryRepository.findById(id);

        if (optionalCategory.isEmpty()) {
            return "Category not found";
        }

        RequestCategory category = optionalCategory.get();
        category.setName(updatedCategory.getName());

        return requestCategoryRepository.save(category);
    }

    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {
        if (!requestCategoryRepository.existsById(id)) {
            return "Category not found";
        }

        requestCategoryRepository.deleteById(id);
        return "Category deleted successfully";
    }
}
