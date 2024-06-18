package com.sa.shellcc.repository;

import com.sa.shellcc.entity.Sala;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalaRepository extends JpaRepository<Sala,Long>{
    
    Sala findByNome(String nome);
    
}
