
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
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Set;


@Entity
@Table(name="salas")
public class Sala {
    
   @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long IdSala;

     //@ManyToMany(mappedBy = "sala")
     //@JsonBackReference
     //private Set<Usuario> usuarios;

    @OneToMany(mappedBy = "sala", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonManagedReference

    private Set<Categoria> categorias;

    @OneToMany(mappedBy = "sala", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Categoria> categoria;
    
    //@ManyToMany(mappedBy="sala")
   // private Set<Usuario> usuarios;
   
    @Column(nullable=false)
    private Long IdHost;
    
    @OneToMany(mappedBy="sala", fetch=FetchType.LAZY,
            orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Patrimonio> patrimonios;
    
    
    @Column(nullable=false)
    private String nome;
    
    @Column(nullable=false)
    private String descricao;
        
    @Column(nullable=false)
    private String cor;
    
    @Column(nullable=false)
    private Long totalMembros;
    
    @Column(nullable=false)
    private Long maximoTotalMembros;
    
    @Column(nullable=false, unique=true)
    private String token;
    
    //-------------------------G&S---------------------------------------------

    public Long getIdSala() {
        return IdSala;
    }

    public void setIdSala(Long IdSala) {
        this.IdSala = IdSala;
    }

    public Set<Categoria> getCategoria() {
        return categorias;
    }

    public void setCategoria(Set<Categoria> categoria) {
        this.categorias = categoria;
    }

    


    public Long getIdHost() {
        return IdHost;
    }

    public void setIdHost(Long IdHost) {
        this.IdHost = IdHost;
    }

    public Set<Patrimonio> getPatrimonios() {
        return patrimonios;
    }

    public void setPatrimonios(Set<Patrimonio> patrimonios) {
        this.patrimonios = patrimonios;
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

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public Long getTotalMembros() {
        return totalMembros;
    }

    public void setTotalMembros(Long totalMembros) {
        this.totalMembros = totalMembros;
    }

    public Long getMaximoTotalMembros() {
        return maximoTotalMembros;
    }

    public void setMaximoTotalMembros(Long maximoTotalMembros) {
        this.maximoTotalMembros = maximoTotalMembros;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    
    
}
