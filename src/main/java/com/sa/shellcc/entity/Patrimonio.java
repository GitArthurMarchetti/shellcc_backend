
package com.sa.shellcc.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Set;


@Entity
@Table(name="patrimonios")
public class Patrimonio {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long IdPatrimonio;
    
    @OneToMany
    @JsonManagedReference
    private Set <Gasto> gasto;
    
    @Column(nullable=false)
    private String tituloPatrimonio;
    
    @Column(nullable=true)
    private String descricaoPatrimonio;
    
    @Column(nullable=false)
    private String codigo;
    
    @Column(nullable=false)
    private Double valorInicial;
    
    @Column(nullable=true)
    private Double valorFinal;
    
    @Column(nullable=true)
    private Double valorMaximo;
    
    @Column(nullable=false)
    private String estado;
    
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

    public Double getValorInicial() {
        return valorInicial;
    }

    public void setValorInicial(Double valorInicial) {
        this.valorInicial = valorInicial;
    }

    public Double getValorFinal() {
        return valorFinal;
    }

    public void setValorFinal(Double valorFinal) {
        this.valorFinal = valorFinal;
    }

    public Double getValorMaximo() {
        return valorMaximo;
    }

    public void setValorMaximo(Double valorMaximo) {
        this.valorMaximo = valorMaximo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }
    
    
}
