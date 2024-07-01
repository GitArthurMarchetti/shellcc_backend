
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
import jakarta.persistence.Table;
import java.util.Set;


@Entity
@Table(name="patrimonios")
public class Patrimonio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long IdPatrimonio;
    
    @OneToMany(mappedBy="patrimonio", fetch=FetchType.LAZY,
            orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Gasto> gasto;
    
    @ManyToOne
    @JsonBackReference
    private Categoria categoria;
    
    @ManyToOne
    @JsonBackReference
    private Sala sala;
    
    @Column(nullable=false)
    private String tituloPatrimonio;
    
    @Column(nullable=true)
    private String descricaoPatrimonio;
    
    @Column(nullable=false, unique=true)
    private String codigo;
    
    @Column(nullable=false)
    private Double valorDaAquisicao;
    
    @Column(nullable=true)
    private Double valorFinal;
    
    @Column(nullable=false)
    private Integer situacao;
    
    @Column(nullable=false)
    private String local;
    
    
    
    //------------------------------Get And Setters -----------------------------------

    public Long getIdPatrimonio() {
        return IdPatrimonio;
    }

    public void setIdPatrimonio(Long IdPatrimonio) {
        this.IdPatrimonio = IdPatrimonio;
    }

    public Set<Gasto> getGasto() {
        return gasto;
    }

    public void setGasto(Set<Gasto> gasto) {
        this.gasto = gasto;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getTituloPatrimonio() {
        return tituloPatrimonio;
    }

    public void setTituloPatrimonio(String tituloPatrimonio) {
        this.tituloPatrimonio = tituloPatrimonio;
    }

    public String getDescricaoPatrimonio() {
        return descricaoPatrimonio;
    }

    public void setDescricaoPatrimonio(String descricaoPatrimonio) {
        this.descricaoPatrimonio = descricaoPatrimonio;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Double getValorDaAquisicao() {
        return valorDaAquisicao;
    }

    public void setValorDaAquisicao(Double valorDaAquisicao) {
        this.valorDaAquisicao = valorDaAquisicao;
    }

    public Double getValorFinal() {
        return valorFinal;
    }

    public void setValorFinal(Double valorFinal) {
        this.valorFinal = valorFinal;
    }

    public Integer getSituacao() {
        return situacao;
    }

    public void setSituacao(Integer situacao) {
        this.situacao = situacao;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    
    
    
}
