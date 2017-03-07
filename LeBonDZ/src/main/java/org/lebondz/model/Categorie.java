package org.lebondz.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Categorie {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idCat;
	
	private String categorieLibelle;
	
	@OneToMany
	private List<Annonce> listAnnonces;

	public String getCategorieLibelle() {
		return categorieLibelle;
	}

	public void setCategorieLibelle(String categorieLibelle) {
		this.categorieLibelle = categorieLibelle;
	}

	public int getIdCat() {
		return idCat;
	}

	public void setIdCat(int idCat) {
		this.idCat = idCat;
	}
	
}
