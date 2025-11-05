import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { ajouter,supprimer } from "./actions";

export default function Recipe() {
  const {id} = useParams()
  const [r,setr]=useState({})
  const [issaved , setissaved] = useState(false)

  const allrecipes = useSelector((r)=>r.recipes)
  useEffect(()=>{
    allrecipes.map((r)=>{
    if(r.id == id){
      setissaved(true)
    }
    else{
      setissaved(false)
    }
  })

  },[issaved])
  
  useEffect(()=>{
    
    axios.get(`https://dummyjson.com/recipes/${Number(id)}`)
    .then(res=>setr(res.data))
    .catch(err=>console.log("Error get data " + err))
  },[id])

  const [checked, setChecked] = useState({});
  function toggle(i){
    setChecked((s) => ({ ...s, [i]: !s[i] }))
  }

  const link = `http://localhost:5173/recipe/${id}`;
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(link)  // bach ncopier link
      .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 4000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }


  const dispatch = useDispatch();

function Save() {
  const saved = {
    id: r.id,
    name: r.name,
    image: r.image,
    rating: r.rating,
    cuisine: r.cuisine,
    totalMinutes: r.prepTimeMinutes,
  }
  dispatch(ajouter(saved))
  setissaved(true)
}




  return (
    <main className="recipe-page">
      {/* HERO */}
      <header className="recipe-hero">
          <img src={r.image} alt={r?.name ?? "Recipe image"} className="recipe-hero-img" />
        <div className="recipe-hero-top">
          <button className="recipe-icon-btn" aria-label="Back">
            <ArrowLeftIcon />
          </button>
          <div className="recipe-hero-actions">
            <button className="recipe-icon-btn" aria-label="Share" onClick={copy}>
              <ShareIcon />
            </button>
            {copied && <span className="copy-toast">✅ Copied!</span>}

            {
              issaved===true?
              <button className="recipe-icon-btn" aria-label="Bookmark" onClick={() => {dispatch(supprimer(r.id));setissaved(false)}}>
              <BookmarkIcondone />
            </button>
            
            :<button className="recipe-icon-btn" aria-label="Bookmark" onClick={Save}>
              <BookmarkIcon />
            </button>

            }

          </div>
        </div>

          <div className="recipe-title-card">
            <h1 className="recipe-title">{r.name}</h1>
          </div>
      </header>

      <section className="recipe-body">
          <div className="recipe-rating-row">
            <div className="recipe-stars">Rating : ★{r.rating}</div>
            <span className="recipe-rating-text"> ( {r.reviewCount} ratings )</span>
          </div>


        
          <div className="recipe-box">
            <h3 className="recipe-box-title">Time needed</h3>
            <div className="recipe-time-grid">
                <TimeStat label="Prep" value={`${r.prepTimeMinutes} min`} />
                <TimeStat label="Cook" value={`${r.cookTimeMinutes} min`} />
            </div>
          </div>
        


          <div className="recipe-box">
            <h3 className="recipe-box-title">Nutrition (per serving)</h3>
            <div className="recipe-nutrition-grid">
              <div className="recipe-nutri">
                <div className="recipe-nutri-k">Calories</div>
                <div className="recipe-nutri-v">{r.caloriesPerServing}</div>
              </div>
            </div>
          </div>
{Array.isArray(r?.ingredients) && r.ingredients.length > 0 && (      // fix le problem de chargement  
   
    <div className="recipe-box">
            <div className="recipe-box-head">
              <h3 className="recipe-box-title">Ingredients</h3>
              <span className="recipe-count">{r.ingredients.length}</span>
            </div>
            <ul className="recipe-list">
              {r.ingredients.map((intg, i) => (
                <li key={i} className={`recipe-li ${checked[i] ? "done" : ""}`}>
                  <label className="recipe-check">
                    <input
                      type="checkbox"
                      checked={!!checked[i]}
                      onChange={() => toggle(i)}
                    />
                    <span className="recipe-custom-checkbox" />
                    <span className="recipe-li-text">{intg}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
  )
}
          

        {Array.isArray(r?.instructions) && r.instructions.length > 0 && (
          <div className="recipe-box">
            <h3 className="recipe-box-title">Directions</h3>
            <ol className="recipe-steps">
              {r.instructions.map((inst, i) => (
                <li key={i} className="recipe-step">
                  <strong>Step {i + 1}</strong>
                  <p>{inst}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {Array.isArray(r?.tags) && r.tags.length > 0 && (
          <div className="recipe-tags">
            {r.tags.map((tag,i) => (
              <span className="recipe-tag" key={i}>#{tag}</span>
            ))}
          </div>
        )}

        <div className="recipe-enjoy">
          <span>ENJOY YOUR MEAL !</span>
        </div>
      </section>
    </main>
  );
}

function TimeStat({ label, value }) {
  return (
    <div className="recipe-time">
      <div>
        <div className="recipe-time-label">{label}</div>
        <div className="recipe-time-value">{value}</div>
      </div>
    </div>
  );
}

function ArrowLeftIcon(){ return (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/><path d="M21 12H9"/>
  </svg>
); }

function ShareIcon(){ return (
  <svg  viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 3.9M15.4 6.6L8.6 10.5"/>
  </svg>
); }

function BookmarkIcondone(){ return (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path fill="#e11d48" d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z"/>
    <path fill="#e9e1e3ff" d="M7 4h10v13l-5-3-5 3V4z"/>
  </svg>
); }
function BookmarkIcon(){ return (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path fill="#333131ff" d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z"/>
    <path fill="#e9e1e3ff" d="M7 4h10v13l-5-3-5 3V4z"/>
  </svg>
); }



