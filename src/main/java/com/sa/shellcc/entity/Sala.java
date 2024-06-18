
package com.sa.shellcc.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.Set;


@Entity
@Table(name="salas")
public class Sala {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    
    @OneToMany
    @JsonManagedReference
    private Set<Categoria> categoria;
    
    @OneToOne
    private Usuario IdHost;
    
    @OneToMany
    @JsonManagedReference
    private Patrimonio IdPatrimonio;
    
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
    
    @Column(nullable=false)
    private String token;
    
    //-------------------------G&S---------------------------------------------

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public Set<Categoria> getCategoria() {
        return categoria;
    }

    public void setCategoria(Set<Categoria> categoria) {
        this.categoria = categoria;
    }

    public Usuario getIdHost() {
        return IdHost;
    }

    public void setIdHost(Usuario IdHost) {
        this.IdHost = IdHost;
    }

    public Patrimonio getIdPatrimonio() {
        return IdPatrimonio;
    }

    public void setIdPatrimonio(Patrimonio IdPatrimonio) {
        this.IdPatrimonio = IdPatrimonio;
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
