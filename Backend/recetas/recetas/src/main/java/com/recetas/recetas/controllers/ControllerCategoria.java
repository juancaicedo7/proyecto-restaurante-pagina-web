package com.recetas.recetas.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recetas.recetas.entities.Categoria;
import com.recetas.recetas.helpers.Helpers;
import com.recetas.recetas.models.Response;
import com.recetas.recetas.repositories.RepositoryCategoria;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")
public class ControllerCategoria {

    @Autowired
    private RepositoryCategoria repositoryCategoria;

    @Autowired
    private Helpers helps;

    @GetMapping()
    public ResponseEntity<?> listaCategorias() {
        Map<String, Object> response = new HashMap<>();

        try {
            List<Categoria> categorias = repositoryCategoria.findAll();

            response = helps.ApiResponse(new Response<>(true, "Lista de categorías", categorias));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (DataAccessException e) {
            return helps.catchError(e, "Error al obtener la lista de categorías");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listaCategoriasId(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        try {
            Categoria categoriaEncontrada = repositoryCategoria.findById(id).orElse(null);

            if (categoriaEncontrada == null) {
                response = helps.ApiResponse(new Response<>(false, "Categoría no encontrada", ""));
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            response = helps.ApiResponse(new Response<>(true, "Categoría encontrada", categoriaEncontrada));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (DataAccessException e) {
            return helps.catchError(e, "No se encontró la categoría");
        }
    }

    @PostMapping()
    public ResponseEntity<?> guardarCategoria(@Valid @RequestBody Categoria categoria, BindingResult result) {
        Map<String, Object> response = new HashMap<>();
        if (result.hasErrors()) {
            return helps.validarCampos(result);
        }

        try {

            Categoria categoriaFind = this.repositoryCategoria.findOneByNombre(categoria.getNombre());

            if (categoriaFind == null) {

                repositoryCategoria.save(categoria);
                response = helps.ApiResponse(new Response<>(true, "Categoría guardada con exito", categoria));
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }

            response = helps.ApiResponse(new Response<>(false, "La categoria ya existe", ""));
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        } catch (DataAccessException e) {
            return helps.catchError(e, "Error al guardar categoría");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            Categoria categoriaEncontrada = repositoryCategoria.findById(id).orElse(null);

            if (categoriaEncontrada == null) {
                response = helps.ApiResponse(new Response<>(false, "No se encontro la categoria", ""));
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            repositoryCategoria.delete(categoriaEncontrada);

            response = helps.ApiResponse(new Response<>(true, "Categoria eliminada", ""));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (DataAccessException e) {
            return helps.catchError(e, "Error al eliminar la categoria");
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCategoria(@Valid @RequestBody Categoria categoria, BindingResult result,
            @PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            return helps.validarCampos(result);
        }

        try {

            Categoria categoriaEncontrada = repositoryCategoria.findById(id).orElse(null);

            if (categoriaEncontrada == null) {
                response = helps.ApiResponse(new Response<>(false, "No se encontro la categoria", ""));
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            Categoria categoryFind = repositoryCategoria.findOneByNombre(categoria.getNombre());

            if (categoryFind == null) {
                categoriaEncontrada.setNombre(categoria.getNombre());

                repositoryCategoria.save(categoriaEncontrada);
                response = helps.ApiResponse(new Response<>(true, "Categoria actualizada", ""));
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

            response = helps.ApiResponse(new Response<>(false, "La categoria ya existe", ""));
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

        } catch (DataAccessException e) {
            return helps.catchError(e, "Error al actualizar categoria");
        }

    }

}
