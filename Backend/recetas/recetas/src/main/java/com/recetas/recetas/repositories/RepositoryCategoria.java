package com.recetas.recetas.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import com.recetas.recetas.entities.Categoria;

public interface RepositoryCategoria extends JpaRepository<Categoria, Long> {

    Categoria findOneByNombre(final String nombre);

  

}
