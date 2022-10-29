package com.mihara.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mihara.backend.Model.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {

}
