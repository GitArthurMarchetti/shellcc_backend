package com.sa.shellcc.repository;


import com.sa.shellcc.entity.Patrimonio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatrimonioRepository extends JpaRepository<Patrimonio,Long>{
    
    Patrimonio findByCodigo(String codigo);
    Patrimonio findByTitulo(String tituloPatrimonio);
    Patrimonio findByEstado(Integer estado);
    
}