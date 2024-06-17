package com.sa.shellcc.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class CategoriaEntity {
     
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;
    
}
