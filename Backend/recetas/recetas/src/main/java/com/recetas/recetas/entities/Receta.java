package com.recetas.recetas.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "recetas")
public class Receta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url_imagen", nullable = false)
    @NotEmpty(message = "El campo url imagen es obligatorio")
    private String url_imagen;

    @Column(name = "titulo", nullable = false)
    @NotEmpty(message = "El campo title es obligatorio")
    @Size(min = 4, max = 150)
    private String titulo;

    @Column(name = "instrucciones", nullable = false)
    @NotEmpty(message = "El campo instruction es obligatorio")
    private String instrucciones;

    @Column(name = "pais", nullable = false)
    @NotEmpty(message = "El campo country es obligatorio")
    @Size(min = 4, max = 25)
    private String pais;

    @Column(name = "url_video", nullable = false)
    @NotEmpty(message = "El campo url video es obligatorio")
    private String url_video;

    // Relacion muchos a uno (LAZY carga perezoza me consulte en la base cuando lo
    // requiera)
    // (jsonProperty para que solo me traiga los atributos de recipe)


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    //@JsonProperty(access = Access.READ_ONLY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "recetas"})
    private Categoria categoria;


}
