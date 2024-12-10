package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Course;
import com.example.demo.repository.CourseRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get a course by its ID
    public Course getCourseById(Long id) {
        Optional<Course> course = courseRepository.findById(id);
        return course.orElse(null);  // Return null if not found
    }

    // Create a new course
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    // Update an existing course
    public Course updateCourse(Long id, Course updatedCourse) {
        Optional<Course> existingCourseOptional = courseRepository.findById(id);
        if (existingCourseOptional.isPresent()) {
            Course existingCourse = existingCourseOptional.get();
            existingCourse.setCourseName(updatedCourse.getCourseName());
            existingCourse.setDescription(updatedCourse.getDescription());
            existingCourse.setPhoto(updatedCourse.getPhoto());
            existingCourse.setPrice(updatedCourse.getPrice());
            existingCourse.setTutor(updatedCourse.getTutor());
            existingCourse.setVideo(updatedCourse.getVideo());
            return courseRepository.save(existingCourse);
        }
        return null;  // Return null if the course with the given ID doesn't exist
    }

    // Delete a course by its ID
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}