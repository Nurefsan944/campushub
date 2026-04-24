package campushub_backend.controller;

import campushub_backend.entity.Announcement;
import campushub_backend.repository.AnnouncementRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementController(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    @GetMapping
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    @PostMapping
    public Announcement createAnnouncement(@RequestBody Announcement announcement) {
        announcement.setCreatedAt(LocalDateTime.now());
        return announcementRepository.save(announcement);
    }

    @PutMapping("/{id}")
    public Object updateAnnouncement(@PathVariable Long id, @RequestBody Announcement updatedAnnouncement) {
        Optional<Announcement> optionalAnnouncement = announcementRepository.findById(id);

        if (optionalAnnouncement.isEmpty()) {
            return "Announcement not found";
        }

        Announcement announcement = optionalAnnouncement.get();
        announcement.setTitle(updatedAnnouncement.getTitle());
        announcement.setContent(updatedAnnouncement.getContent());

        return announcementRepository.save(announcement);
    }

    @DeleteMapping("/{id}")
    public String deleteAnnouncement(@PathVariable Long id) {
        if (!announcementRepository.existsById(id)) {
            return "Announcement not found";
        }

        announcementRepository.deleteById(id);
        return "Announcement deleted successfully";
    }
}
