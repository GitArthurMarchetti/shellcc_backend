package com.sa.shellcc.service;

import com.sa.shellcc.entity.Categoria;
import com.sa.shellcc.entity.Patrimonio;
import com.sa.shellcc.entity.Sala;
import com.sa.shellcc.repository.PatrimonioRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PatrimonioService {
    
    @Autowired
    private PatrimonioRepository patrimonioRepository;
    
    public Long incluirPatrimonio(Patrimonio patrimonio, Categoria categoria){
        
      if(patrimonio.getTituloPatrimonio()== null || patrimonio.getTituloPatrimonio() == ""){
            return null;
        }
        if(patrimonio.getCodigo()== null){
          return null;
        }
        if(patrimonio.getSituacao()== null){
            return null;
        }
        if(patrimonio.getLocal() == null || patrimonio.getLocal() == ""){
            return null;
        }
        patrimonio.setCategoria(patrimonio.getCategoria());
        return patrimonioRepository.save(patrimonio).getIdPatrimonio();
    }
    
    public boolean excluirPatrimonio(Long IdPatrimonio){
        if(patrimonioRepository.findById(IdPatrimonio).isPresent()){
            patrimonioRepository.deleteById(IdPatrimonio);
            return true;
        }
        return false;
    }
    
    
    public List<Patrimonio> listarPatrimonios(){
        return patrimonioRepository.findAll();
    }
    
    public boolean alterarPatrimonio(Patrimonio patrimonio){
        
        
         if(patrimonio.getCategoria()== null){
            return false;
        }
        if(patrimonio.getTituloPatrimonio()== null || patrimonio.getTituloPatrimonio() == ""){
            return false;
        }
        if(patrimonio.getDescricaoPatrimonio()== null || patrimonio.getDescricaoPatrimonio() == ""){
          return false;
        }
       
        if(patrimonio.getCodigo()== null || patrimonio.getCodigo() == ""){
            return false;
        }
        if(patrimonio.getValorDaAquisicao() == null || patrimonio.getValorDaAquisicao() == 0){
            return false;
        }
        if(patrimonio.getValorFinal() == null || patrimonio.getValorFinal() == 0){
            return false;
        }
         if(patrimonio.getSituacao() == null || patrimonio.getSituacao() == 0){
            return false;
        }
        if(patrimonio.getLocal()== null || patrimonio.getLocal() == ""){
            return false;
        }
  
        Patrimonio patrimonioDB = patrimonioRepository.getReferenceById(patrimonio.getIdPatrimonio());
        
       if(patrimonioDB != null){
        patrimonioDB.setCategoria(patrimonio.getCategoria());
        patrimonioDB.setTituloPatrimonio(patrimonio.getTituloPatrimonio());
        patrimonioDB.setDescricaoPatrimonio(patrimonio.getDescricaoPatrimonio());
        patrimonioDB.setCodigo(patrimonio.getCodigo());
        patrimonioDB.setValorDaAquisicao(patrimonio.getValorDaAquisicao()); 
        patrimonioDB.setValorFinal(patrimonio.getValorFinal()); 
        patrimonioDB.setGasto(patrimonio.getGasto()); 
        patrimonioDB.setLocal(patrimonio.getLocal()); 
        patrimonioDB.setSala(patrimonio.getSala()); 
        patrimonioRepository.save(patrimonioDB);
        return true;
        }
       return false;
     }
    
}
