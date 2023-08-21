package com.recetas.recetas.helpers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.recetas.recetas.models.Response;

@Service
public class Helpers {

    public <T,K> Map<String, Object> ApiResponse(Response<T,K> data){


        Map<String, Object> response = new HashMap<>();

        response.put("ok", data.getOk());
        response.put("message", data.getMessage());
        response.put("data", data.getData());

        return response;

    }

    public ResponseEntity<?> validarCampos(BindingResult result){

        Map<String, Object> response = new HashMap<>();

        List<String> errors = result.getFieldErrors().stream().map(err -> err.getDefaultMessage()).collect(Collectors.toList());

        response = ApiResponse(new Response<>(false, errors, " "));
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> catchError(DataAccessException e, String message){

        Map<String, Object> response = new HashMap<>();

        response = ApiResponse(new Response<>(false, message + e.getMessage() + " " + e.getMostSpecificCause().getMessage(), " "));

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
