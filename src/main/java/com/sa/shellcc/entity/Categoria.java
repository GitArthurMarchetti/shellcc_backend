package com.sa.shellcc.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.Set;


@Entity
public class Categoria {
     
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private Long Id;
    
    @ManyToOne
    @JsonBackReference
    private Sala sala;
    
    @OneToMany(mappedBy="salas", fetch=FetchType.LAZY,
            orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Patrimonio> patrimonio;
    
    @Column(nullable=false)
    private String nome;
    
    @Column(nullable=true)
    private String descricao;
    
    @Column(nullable=false)
    private Double desvalorizacao;
    
    //--------------------------------S&G--------------------------------------

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public Set<Patrimonio> getPatrimonio() {
        return patrimonio;
    }

    public void setPatrimonio(Set<Patrimonio> patrimonio) {
        this.patrimonio = patrimonio;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getDesvalorizacao() {
        return desvalorizacao;
    }

    public void setDesvalorizacao(Double desvalorizacao) {
        this.desvalorizacao = desvalorizacao;
    }
    
    
}
