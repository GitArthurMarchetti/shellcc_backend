<<<<<<< HEAD
package com.sa.shellcc.service;

import com.sa.shellcc.entity.Usuario;
import com.sa.shellcc.repository.UsuarioRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
=======

package com.sa.shellcc.service;


>>>>>>> 433adc92a2e3db37a5b35e874a9645f510d99754
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public Long incluirUsuario(Usuario usuario){
        
          if(usuario.getEmail()== null || usuario.getEmail() == ""){
            return null;
        }
          if(usuario.getSenha()== null || usuario.getSenha() == ""){
            return null;
        }
          return usuarioRepository.save(usuario).getIdUsuario();
         }
    
    public boolean excluirUsuario(Long IdUsuario){
        if(usuarioRepository.findById(IdUsuario).isPresent()){
            usuarioRepository.deleteById(IdUsuario);
            return true;
        }
        return false;
    }
    
    public List<Usuario> listarUsuarios(){
        return usuarioRepository.findAll();
    }
    
    
     public boolean alterarUsuario(Usuario usuario){
        
        if(usuario.getEmail()== null || usuario.getEmail() == ""){
        return false;
    }
        if(usuario.getSenha() == null || usuario.getSenha() == ""){
        return false;
    }
  
         Usuario usuBD = usuarioRepository.getReferenceById(usuario.getIdUsuario());
        
       
        usuBD.setEmail(usuario.getEmail());
        usuBD.setSenha(usuario.getSenha());
        usuarioRepository.save(usuBD);
        return true;
        }
    }
