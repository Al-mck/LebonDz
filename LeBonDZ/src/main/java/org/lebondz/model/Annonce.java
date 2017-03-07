package org.lebondz.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Annonce {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int idAnnonce;
	
	private Date dateAnnonce;
	
	private String titre;
	
	private String detailAnnonce;
	
	@ManyToOne
	private Utilisateur utilisateur;
	
	@ManyToOne
	private Ville ville;
	
	@ManyToOne
	private Categorie categorie;
	
	@OneToMany(cascade=CascadeType.REMOVE, mappedBy="annonce")
	private List<Commentaire> listCommentaires;

	public int getIdAnnonce() {
		return idAnnonce;
	}

	public void setIdAnnonce(int idAnnonce) {
		this.idAnnonce = idAnnonce;
	}

	public Date getDateAnnonce() {
		return dateAnnonce;
	}

	public void setDateAnnonce(Date dateAnnonce) {
		this.dateAnnonce = dateAnnonce;
	}

	public String getTitre() {
		return titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public String getDetailAnnonce() {
		return detailAnnonce;
	}

	public void setDetailAnnonce(String detailAnnonce) {
		this.detailAnnonce = detailAnnonce;
	}
	

}
