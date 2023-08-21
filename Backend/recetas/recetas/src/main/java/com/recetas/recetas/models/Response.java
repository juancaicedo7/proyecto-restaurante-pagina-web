package com.recetas.recetas.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response <T,K>{

    private Boolean ok;
    private T message;
    private K data;
    
}
