package com.todolist.todolist.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.todolist.todolist.domain.entities.Usuario;
import com.todolist.todolist.domain.entities.auth.UsuarioAuth;
import com.todolist.todolist.repositories.UsuarioRepository;

@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String apelido) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByApelido(apelido);
        if (usuario == null) {
            throw new UsernameNotFoundException("Usuario nao encontrado");
        }
        return new UsuarioAuth(usuario.getCodigo(), usuario.getApelido(), usuario.getSenha());  
    }
    
}
