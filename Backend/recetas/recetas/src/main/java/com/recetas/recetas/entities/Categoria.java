package com.recetas.recetas.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, unique = true)
    @NotNull(message = "El campo nombre es obligatorio")
    @Size(min = 4, max = 20)
    private String nombre;

    // Relacion uno a muchos (cascade que cuando elimine una category, se me elimine
    // tambien la lista de recipe que tenga)

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL)
    @JsonProperty(access = Access.READ_ONLY)
    @JsonIgnoreProperties({ "categoria", "recetas" })
    private List<Receta> recetas;

}
