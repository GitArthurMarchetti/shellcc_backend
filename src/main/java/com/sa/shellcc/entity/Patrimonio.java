
package com.sa.shellcc.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private Set<Gasto> gasto;
    
}
