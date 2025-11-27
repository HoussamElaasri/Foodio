
import { useEffect, useState } from "react"
import axios from "axios"
import { Link , useLocation } from "react-router-dom"


export default function Recipes() {
  const [recipes, setRecipes] = useState([])
  const location = useLocation();
    const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(0)

  const [q, setQ] = useState(() => 
    {
      const params = new URLSearchParams(location.search)
      return params.get("q") || "" 
    }
  )
  const [cuisine, setCuisine] = useState("all")

  useEffect(()=>{
  const params = new URLSearchParams(location.search);
  const searchTerm = params.get("q") || "";
  setQ(searchTerm);
  },[location.search])

  useEffect(() => {

      let url = ""
      if (q === "") {
        url = `https://dummyjson.com/recipes`
      } else {
        url = `https://dummyjson.com/recipes/search?q=${q}`
      }
      axios.get(url)
      .then(res => {
        setRecipes(res.data.recipes)
        setCuisine("all")
      })
      .catch(e=>console.log(e.message))
      .finally(() => setDone(p => p + 1))


      
  }, [q])

useEffect(()=>{
  if (done === 1) {
    setLoading(false)
  }
},[done])
 

 
  const cuisinesSet = new Set() // drtha set bach mayt3awdoch
  recipes.forEach((r) => {
      cuisinesSet.add(r.cuisine)
  })

  const cuisines = ["all", ...Array.from(cuisinesSet)]  // 7wlt set l array

  const visible = recipes.filter((r) => {
    if (cuisine === "all") return true
    return r.cuisine === cuisine
  })


  if (loading) {
    return (
      <div style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <main className="recipes-page" >
      <header className="recipes-header" >
        <div>
          <h2 >All Recipes</h2>
          <p >Browse and find your next meal</p>
        </div>

        <div className="recipes-search">
          <input
            type="text"
            placeholder="Search recipes…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="button" aria-label="Search">
            <SearchIcon />
          </button>
        </div>
      </header>

      <div className="recipes-filters">
        <div className="recipes-filter">
          <label >Cuisine</label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          >
            {cuisines.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>


      {/* الشبكة */}
      <section className="recipes-grid">
        {visible.map((r,i) => (
<Link key={i} className="recipes-card" to={`/recipe/${r.id}`}>
            <div className="recipes-thumb" style={{ backgroundImage: `url('${r.image}')` }} />
            <div className="recipes-body">
              <h3 className="recipes-name">{r.name}</h3>
              <p className="recipes-meta">
                {r.cuisine} • {(r.mealType || []).join(", ") || "—"}
              </p>
              <div className="recipes-stats">
                <span className="recipes-chip">
                  <StarIcon /> {r.rating?.toFixed ? r.rating.toFixed(1) : r.rating}
                </span>
                <span className="recipes-chip">
                  <ClockIcon /> {(r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0)} min
                </span>
                {r.difficulty && (
                  <span className="recipes-chip">{r.difficulty}</span>
                )}
              </div>
            </div>
          </Link>


        ))}
      </section>


    </main>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/><line x1="16.65" y1="16.65" x2="21" y2="21"/>
    </svg>
  );
}
function StarIcon(){ return (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="#e11d48"><path d="M12 17.3l-5.4 3 1-6-4.3-4.2 6-.9L12 3l2.7 6.2 6 .9-4.3 4.2 1 6z"/></svg>
); }
function ClockIcon(){ return (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="#6b7280" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5h-2v6l5 3 1-1-4-2V7z"/></svg>
); }