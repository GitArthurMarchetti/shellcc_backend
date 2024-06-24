/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.sa.shellcc.service;

import com.sa.shellcc.entity.Sala;
import com.sa.shellcc.entity.Usuario;
import com.sa.shellcc.repository.SalaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author eduardoborges
 */

@Service
public class SalaService {
    
    
    @Autowired
    private SalaRepository salaRepository;
    
    public Long incluirSala(Sala sala){
        if(sala.getNome()== null || sala.getNome() == ""){
            return null;
        }
        if(sala.getDescricao()== null || sala.getDescricao() == ""){
          return null;
        }
        if(sala.getCor()== null || sala.getCor() == ""){
            return null;
        }
        if(sala.getMaximoTotalMembros() == null || sala.getMaximoTotalMembros() == 0){
            return null;
        }
        if(sala.getToken() == null || sala.getToken() == ""){
            return null;
        }
        return salaRepository.save(sala).getIdSala();
    }
    
    public boolean excluirSala(Long IdSala){
        if(salaRepository.findById(IdSala).isPresent()){
            salaRepository.deleteById(IdSala);
            return true;
        }
        return false;
    }
    
    public List<Sala> listarSalas(){
        return salaRepository.findAll();
    }
    
    
     public boolean alterarUsuario(Sala sala){
        
        if(sala.getNome()== null || sala.getNome() == ""){
            return false;
        }
        if(sala.getDescricao()== null || sala.getDescricao() == ""){
          return false;
        }
       
        if(sala.getCor()== null || sala.getCor() == ""){
            return false;
        }
        if(sala.getMaximoTotalMembros() == null || sala.getMaximoTotalMembros() == 0){
            return false;
        }
        if(sala.getToken() == null || sala.getToken() == ""){
            return false;
        }
  
        Sala salaBD = salaRepository.getReferenceById(sala.getIdSala());
        
       if(salaBD != null){
        salaBD.setNome(sala.getNome());
        salaBD.setDescricao(sala.getDescricao());
        salaBD.setCor(sala.getCor());
        salaBD.setMaximoTotalMembros(sala.getMaximoTotalMembros());
        salaBD.setToken(sala.getToken()); 
        salaRepository.save(salaBD);
        return true;
        }
       return false;
     }
     
     
     
}
