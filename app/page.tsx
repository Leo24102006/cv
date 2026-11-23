import {
  profil,
  experiences,
  projets,
  formations,
  competences,
  outils,
  langues,
  qualites,
  loisirs,
} from "./data";

function Liste({ items }: { items: string[] }) {
  return (
    <ul className="tags">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <header className="entete">
        <div className="conteneur">
          <h1>
            {profil.prenom} <span>{profil.nom}</span>
          </h1>
          <p className="titre">{profil.titre}</p>
          <p className="recherche">{profil.recherche}</p>
          <p className="contact">
            <a href={`mailto:${profil.email}`}>{profil.email}</a>
            <span aria-hidden="true"> · </span>
            <span>{profil.localisation}</span>
          </p>
        </div>
      </header>

      <main className="conteneur grille">
        <div className="principal">
          <section aria-labelledby="t-exp">
            <h2 id="t-exp">Expérience professionnelle</h2>
            {experiences.map((e) => (
              <article key={e.entreprise} className="bloc">
                <h3>
                  {e.poste} · {e.entreprise}
                </h3>
                <p className="meta">{e.periode}</p>
                <p>{e.description}</p>
                <p>
                  <a href={e.lien.url} rel="noopener noreferrer">
                    {e.lien.texte}
                  </a>
                </p>
              </article>
            ))}
          </section>

          <section aria-labelledby="t-proj">
            <h2 id="t-proj">Projets universitaires</h2>
            <ul className="puces">
              {projets.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="t-form">
            <h2 id="t-form">Formation</h2>
            {formations.map((f) => (
              <article key={f.diplome} className="bloc">
                <h3>{f.diplome}</h3>
                <p className="meta">
                  {f.etablissement} · {f.periode}
                </p>
              </article>
            ))}
          </section>
        </div>

        <aside className="lateral">
          <section aria-labelledby="t-comp">
            <h2 id="t-comp">Compétences</h2>
            <Liste items={competences} />
          </section>
          <section aria-labelledby="t-outils">
            <h2 id="t-outils">Outils et environnements</h2>
            <Liste items={outils} />
          </section>
          <section aria-labelledby="t-lang">
            <h2 id="t-lang">Langues</h2>
            <Liste items={langues} />
          </section>
          <section aria-labelledby="t-qual">
            <h2 id="t-qual">Qualités</h2>
            <Liste items={qualites} />
          </section>
          <section aria-labelledby="t-lois">
            <h2 id="t-lois">Loisirs</h2>
            <p>{loisirs}</p>
          </section>
        </aside>
      </main>

      <footer className="pied">
        <div className="conteneur">
          <p>
            Site statique sans cookie ni traceur. Hébergé par GitHub Pages
            (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107,
            États-Unis).
          </p>
        </div>
      </footer>
    </>
  );
}
