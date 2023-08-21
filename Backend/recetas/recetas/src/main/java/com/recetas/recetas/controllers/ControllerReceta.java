package com.recetas.recetas.controllers;

import java.util.ArrayList;
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
import com.recetas.recetas.entities.Receta;
import com.recetas.recetas.helpers.Helpers;
import com.recetas.recetas.models.Response;
import com.recetas.recetas.repositories.RepositoryCategoria;
import com.recetas.recetas.repositories.RepositoryReceta;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/recetas")
@CrossOrigin(origins = "*")
public class ControllerReceta {

    @Autowired
    private RepositoryReceta repositoryReceta;

    @Autowired
    private RepositoryCategoria repositoryCategoria;

    @Autowired
    private Helpers helpers;


    @GetMapping
    public ResponseEntity<?> obtenerRecetas(String titulo) {

        Map<String, Object> response = new HashMap<>();

        try {
            List<Receta> recetas = new ArrayList<Receta>();

            if(titulo == null){
                recetas = repositoryReceta.findAllWithCategoria();
            }else{
                recetas = repositoryReceta.findByTituloContains(titulo);
            }

            response = helpers.ApiResponse(new Response<>(true, "Lista recetas", recetas));

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (DataAccessException e) {
            return helpers.catchError(e, "Error al consultar las recetas");
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerRecetaId(@PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();

        try {

            Receta recetaFind = repositoryReceta.findById(id).orElse(null);

            if (recetaFind == null) {

                response = helpers.ApiResponse(new Response<>(false, "Receta no encontrado", ""));
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            response = helpers.ApiResponse(new Response<>(true, "Receta encotrado", recetaFind));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (DataAccessException e) {
            return helpers.catchError(e, "Error al consultar por id la receta");

        }
    }

    @PostMapping
    public ResponseEntity<?> guardarReceta(@Valid @RequestBody Receta receta, BindingResult result) {

        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            return helpers.validarCampos(result);
        }

        try {

            Categoria category = this.repositoryCategoria.findById(receta.getCategoria().getId()).orElse(null);

            if (category == null) {

                response = helpers.ApiResponse(
                        new Response<>(false, "La categoria no sé encontro, no se puede guardar la receta", ""));
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            repositoryReceta.save(receta);

            response = helpers.ApiResponse(new Response<>(true, "Receta guardada", receta));
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (DataAccessException e) {
            return helpers.catchError(e, "Error al guardar la receta");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarReceta(@Valid @RequestBody Receta receta, BindingResult result,
            @PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            return helpers.validarCampos(result);
        }

        try {

            Receta recetaUpdate = repositoryReceta.findById(id).orElse(null);

            if (recetaUpdate == null) {

                response = helpers.ApiResponse(new Response<>(false, "Receta no encontrada", " "));
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            recetaUpdate.setUrl_imagen(receta.getUrl_imagen());
            recetaUpdate.setTitulo(receta.getTitulo());
            recetaUpdate.setInstrucciones(receta.getInstrucciones());
            recetaUpdate.setPais(receta.getPais());
            recetaUpdate.setUrl_video(receta.getUrl_video());

            repositoryReceta.save(recetaUpdate);
            response = helpers.ApiResponse(new Response<>(true, "Receta actualizada con exito", ""));
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (DataAccessException e) {
            return helpers.catchError(e, "Error al actualizar la receta");
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarReceta(@PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();

        try {

            Receta recetaDelete = repositoryReceta.findById(id).orElse(null);

            if (recetaDelete == null) {
                response = helpers.ApiResponse(new Response<>(false, "La receta no se encontro", ""));
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            repositoryReceta.delete(recetaDelete);
            response = helpers.ApiResponse(new Response<>(true, "La receta se elimino con exito", " "));

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (DataAccessException e) {
            return helpers.catchError(e, "Error al eliminar el empleado");
        }

    }

}
