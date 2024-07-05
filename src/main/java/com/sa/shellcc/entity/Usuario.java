
    package com.sa.shellcc.entity;

    import com.fasterxml.jackson.annotation.JsonManagedReference;
    import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.ManyToMany;
    import jakarta.persistence.OneToMany;
    import jakarta.persistence.Table;
    import java.util.Set;

    @Entity
    @Table(name="usuarios")
    public class Usuario {

     
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idUsuario;

    @Column(nullable = false)
    private Boolean isHost;

    //@ManyToMany
<<<<<<< HEAD
   // @JsonManagedReference
=======
    //@JsonManagedReference
>>>>>>> 041f918 (controller funcionando)
   // private Set<Sala> sala;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = true, unique = true)
    private String tokkenSenha;

    @Column(nullable = true)
    private Integer cargo;

        //------------------------------G&S----------------------------------------

        public Long getIdUsuario() {
            return idUsuario;
        }

        public void setIdUsuario(Long idUsuario) {
            this.idUsuario = idUsuario;
        }

        public Boolean getIsHost() {
            return isHost;
        }

        public void setIsHost(Boolean isHost) {
            this.isHost = isHost;
        }

<<<<<<< HEAD
        // public Set<Sala> getSala() {
        //     return sala;
        // }

        // public void setSala(Set<Sala> sala) {
        //     this.sala = sala;
        // }    
=======
   // public Set<Sala> getSala() {
    //    return sala;
   // }

   // public void setSala(Set<Sala> sala) {
   //     this.sala = sala;
   // }    
    
    
    public String getEmail() {
        return email;
    }
>>>>>>> 041f918 (controller funcionando)


        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getSenha() {
            return senha;
        }

        public void setSenha(String senha) {
            this.senha = senha;
        }

        public String getTokkenSenha() {
            return tokkenSenha;
        }

        public void setTokkenSenha(String tokkenSenha) {
            this.tokkenSenha = tokkenSenha;
        }

        public Integer getCargo() {
            return cargo;
        }

        public void setCargo(Integer cargo) {
            this.cargo = cargo;
        }



    }
