package com.recetas.recetas.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.recetas.recetas.entities.Receta;

public interface RepositoryReceta extends JpaRepository<Receta, Long>{

    @Query("SELECT r FROM Receta r JOIN FETCH r.categoria")
    List<Receta> findAllWithCategoria();

    List<Receta> findByTituloContains(String titulo);

    

    
}
