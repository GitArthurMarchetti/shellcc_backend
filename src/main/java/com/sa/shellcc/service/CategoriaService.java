
package com.sa.shellcc.service;

import com.sa.shellcc.entity.Categoria;
import com.sa.shellcc.repository.CategoriaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;


public class CategoriaService {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    public Long incluirCategoria(Categoria categoria){
        if(categoria.getNome() == null ||
            categoria.getDesvalorizacao()== null){
            return null; 
        }
        return categoriaRepository.save(categoria).getIdCategoria();
    }
    
    public boolean excluirCategoria(Long IdCategoria){
      if(categoriaRepository.findById(IdCategoria).isPresent()){
          categoriaRepository.deleteById(IdCategoria);
          return true;
      }
        return false;
    }
    
    public List<Categoria> listarCategoria(){
         return categoriaRepository.findAll();
     }
    
    
    public boolean alterarCategoria(Categoria categoria){
        if(categoria.getNome() == null ||
            categoria.getDesvalorizacao()== null){
            return false; 
        }
        
        Categoria catDB = categoriaRepository.getReferenceById(categoria.getIdCategoria());
        
         if(catDB != null){
             catDB.setDescricao(categoria.getDescricao());
             catDB.setNome(categoria.getNome());
             catDB.setDesvalorizacao(categoria.getDesvalorizacao());
             categoriaRepository.save(catDB);
             return true;
         }
         return false;
         
    }
    
    
    
    
    
    
    
    
    
    
    
    
}
