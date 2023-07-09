package com.DTI.userdept.controller;

import com.DTI.userdept.entities.User;
import com.DTI.userdept.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/users")
public class UserController {


@Autowired
    private UserRepository repository;
    private Long id;
/** listar todos os lembretes */
    @GetMapping
    public List<User> findAll(){
       List<User> result = repository.findAll();
        return result;
    }
    /** buscar lembrete */
    @GetMapping(value = "/{id}")
    public User findById(@PathVariable Long id){
        User result = repository.findById(id).get();
        return result;
    }
/** salvar lembrete */
    @PostMapping
    public User insert(@RequestBody User user){
        User result = repository.save(user);
    return result;
    }

/** editar lembrete*/

    @PutMapping
    public User editarUser (@RequestBody User user){
        User result = repository.save(user);
        return result;
    }

/** exluir lembrete*/

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirUser(@PathVariable Long id) {
        Optional<User> user = repository.findById(id);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
