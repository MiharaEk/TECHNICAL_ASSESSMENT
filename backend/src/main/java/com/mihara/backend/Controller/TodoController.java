package com.mihara.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mihara.backend.Model.Todo;
import com.mihara.backend.Repository.TodoRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TodoController {
    @Autowired
    private TodoRepository todoRepository;

    // get all todo tasks
    @GetMapping("/")
    public List<Todo> GetAllTodo() {
        return todoRepository.findAll();
    }

    // get a single todo task
    @GetMapping("/{id}")
    public Todo GetTodo(@PathVariable Integer id) {
        return todoRepository.findById(id).orElse(null);
    }

    // add todo task
    @PostMapping("/")
    public Todo PostTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    // update todo task
    @PutMapping("/")
    public Todo putTodo(@RequestBody Todo todo) {
        Todo oldTodo = todoRepository.findById(todo.getId()).orElse(null);
        oldTodo.setName(todo.getName());
        oldTodo.setDescription(todo.getDescription());
        oldTodo.setStatus(todo.getStatus());
        return todoRepository.save(oldTodo);
    }

    // delete todo task
    @DeleteMapping("/{id}")
    public Integer DeleteTodo(@PathVariable Integer id) {
        todoRepository.deleteById(id);
        return id;
    }

    // mark todo task done
    @PutMapping("/{id}/marktodo")
    public Todo markTodo(@RequestBody Todo todo) {
        Todo oldTodo = todoRepository.findById(todo.getId()).orElse(null);
        oldTodo.setName(todo.getName());
        oldTodo.setDescription(todo.getDescription());
        oldTodo.setStatus(todo.getStatus());
        return todoRepository.save(oldTodo);
    }

}
