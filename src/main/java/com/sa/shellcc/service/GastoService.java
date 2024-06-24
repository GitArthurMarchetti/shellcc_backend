package com.sa.shellcc.service;

import com.sa.shellcc.entity.Categoria;
import com.sa.shellcc.entity.Gasto;
import com.sa.shellcc.repository.GastoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GastoService {
    
    
    @Autowired 
    private GastoRepository gastoRepository;
    
    public Long incluirGssto(Gasto gasto){
        if(gasto.getNome() == null || gasto.getNome() == ""||
           gasto.getPreco() == null || gasto.getDataGasto() == null){
            return null;
        }
   return gastoRepository.save(gasto).getIdGasto();      
    }
    
    public boolean excluirGasto(Long idGasto){
        if(gastoRepository.findById(idGasto).isPresent()){
            gastoRepository.deleteById(idGasto);
            return true;
        }
        return false;
    }
    
     public List<Gasto> listarGastos() {
        return gastoRepository.findAll();
    }
     
      public boolean alterarGasto(Gasto gasto){
        if(gasto.getNome() == null ||
            gasto.getDataGasto()== null){
            return false; 
        }

        Gasto gastoDB = gastoRepository.getReferenceById(gasto.getIdGasto());

         if(gastoDB != null){
             gastoDB.setDescricao(gasto.getDescricao());
             gastoDB.setNome(gasto.getNome());
             gastoDB.setPreco(gasto.getPreco());
             gastoDB.setDataGasto(gasto.getDataGasto());
             gastoDB.setOpcao(gasto.getOpcao());
             gastoDB.setRepeticao(gasto.isRepeticao());
             gastoRepository.save(gastoDB);
             return true;
         }
         return false;

    }
}
