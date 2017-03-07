package org.lebondz.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Ville {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idVille;
	
	private String villeLibelle;
	
	@OneToMany
	private List<Annonce> listAnnonces;

	public int getIdVille() {
		return idVille;
	}

	public void setIdVille(int idVille) {
		this.idVille = idVille;
	}

	public String getVilleLibelle() {
		return villeLibelle;
	}

	public void setVilleLibelle(String villeLibelle) {
		this.villeLibelle = villeLibelle;
	}

}
