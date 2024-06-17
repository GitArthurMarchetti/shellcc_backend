
package com.sa.shellcc.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="usuarios")
public class Usuario {
       
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    
    @Column(nullable=false)
    private String email;
    
    @Column(nullable=false)
    private String senha;
     
    @Column(nullable=false)
    private String tokkenSenha;
     
    @Column(nullable=false)
    private Integer cargo;
    
    //------------------------------G&S----------------------------------------

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getTokkenSenha() {
        return tokkenSenha;
    }

    public void setTokkenSenha(String tokkenSenha) {
        this.tokkenSenha = tokkenSenha;
    }

    public Integer getCargo() {
        return cargo;
    }

    public void setCargo(Integer cargo) {
        this.cargo = cargo;
    }
    
    
    
}
