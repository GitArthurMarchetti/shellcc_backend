
package com.sa.shellcc.controller;

import com.sa.shellcc.entity.Usuario;
import com.sa.shellcc.service.UsuarioService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @PostMapping("/user")
    public ResponseEntity<Long> incluirNovoUsuario(@RequestBody Usuario usuario) {
        Long idUser = usuarioService.incluirUsuario(usuario);
        if (idUser != null) {
            return new ResponseEntity<>(idUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }// http://localhost:8010/shellcc/user
    
    @DeleteMapping("/user/{IdUsuario}")
    public ResponseEntity<Long> exluirUsuario(@PathVariable ("IdUsuario")Long IdUsuario){
        if(usuarioService.excluirUsuario(IdUsuario)){
            return new ResponseEntity<>(HttpStatus.OK);
        }       
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @PutMapping("/user")
    public ResponseEntity<Boolean> alterarCliente(@RequestBody Usuario usuario){
       if(usuarioService.alterarUsuario(usuario)){
           return new ResponseEntity<>(true, HttpStatus.OK);
       }
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }
    
     @GetMapping("/user")
    public ResponseEntity<List<Usuario>> listarUsuario(){
        List<Usuario> listCli = usuarioService.listarUsuarios();
        if(! listCli.isEmpty()){
            return new ResponseEntity<>(listCli ,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
   
}
