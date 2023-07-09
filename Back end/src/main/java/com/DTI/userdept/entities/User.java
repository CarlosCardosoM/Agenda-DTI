package com.DTI.userdept.entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "tb_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    private String nome_do_lembrete;

    public String getNome_do_lembrete() {
        return nome_do_lembrete;
    }

    public void setNome_do_lembrete(String nome_do_lembrete) {
        this.nome_do_lembrete = nome_do_lembrete;
    }


    private Date data;

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }
    @ManyToOne
    @JoinColumn(name ="departament_id")
    private Departament departament;

    public Departament getDepartament() {
        return departament;
    }

    public void setDepartament(Departament departament) {
        this.departament = departament;
    }

    public User() {

    }
}
