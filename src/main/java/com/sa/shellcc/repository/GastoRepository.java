package com.sa.shellcc.repository;

import com.sa.shellcc.entity.Gasto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GastoRepository extends JpaRepository<Gasto,Long>{
    
    Gasto findByNome(String nome);
    Gasto findByOpcao(String opcao);
    
}