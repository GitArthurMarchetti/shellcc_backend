
package com.sa.shellcc.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Date;


@Entity
@Table(name="gastos")
public class Gasto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long IdGasto;
    
    @ManyToOne
    @JsonBackReference
    private Patrimonio patrimonio;
    
    @Column(nullable=false)
    private String nome;
    
    @Column(nullable=true)
    private String descricao;
    
    @Column(nullable=false)
    private Double preco;
    
    @Column(nullable=false)
    private Date dataGasto;
    
    @Column(nullable=false)
    private boolean repeticao;
    
    @Column(nullable=true)
    private String opcao;
    
    
    //---------------------------GET--AND--SETTERS-----------------------------

    public Long getIdGasto() {
        return IdGasto;
    }

    public void setIdGasto(Long IdGasto) {
        this.IdGasto = IdGasto;
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

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Date getDataGasto() {
        return dataGasto;
    }

    public void setDataGasto(Date dataGasto) {
        this.dataGasto = dataGasto;
    }

    public boolean isRepeticao() {
        return repeticao;
    }

    public void setRepeticao(boolean repeticao) {
        this.repeticao = repeticao;
    }

    public String getOpcao() {
        return opcao;
    }

    public void setOpcao(String opcao) {
        this.opcao = opcao;
    }
    
    
}
