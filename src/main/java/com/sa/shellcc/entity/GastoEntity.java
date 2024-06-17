
package com.sa.shellcc.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="gastos")
public class GastoEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long IdGasto;
    
    @Column(nullable=false)
    private String nome;
    
    @Column(nullable=true)
    private String descricao;
}
