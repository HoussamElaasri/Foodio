import { useSelector, useDispatch } from "react-redux";
import { supprimer } from "./actions";

export default function SavedRecipes() {
  const saved = useSelector(state => state.recipes);
  const dispatch = useDispatch();

  return (
    <main className="saved-page">
      <header className="saved-header">
        <h2 className="saved-title">Saved Recipes</h2>
        <p className="saved-sub">Your favorite picks in one place</p>
      </header>

      {saved.length === 0 && (
        <p className="saved-empty">No saved recipes yet.</p>
      )}

      <section className="saved-grid">
        {saved.map(r => (
          <div key={r.id} className="saved-card">
            <div
              className="saved-thumb"
              style={{ backgroundImage: `url('${r.image}')` }}
              aria-label={r.name}
              role="img"
            />
            <div className="saved-body">
              <h3 className="saved-name">{r.name}</h3>
              <p className="saved-meta">
                {r.cuisine || "—"} • {r.totalMinutes || 0} min
              </p>

              <div className="saved-actions">
                <a className="saved-link" href={`/recipe/${r.id}`}>Open</a>
                <button
                  className="saved-delete"
                  type="button"
                  onClick={() => dispatch(supprimer(r.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
