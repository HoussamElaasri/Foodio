import { useEffect, useState } from "react" 
import { useNavigate } from "react-router-dom" 


export default function Categories() {
  const [categories, setCategories] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("https://dummyjson.com/recipes/tags")
      .then(res => res.json())
      .then(data => {
        setCategories(data) 
        setFiltered(data) 
      })
      .catch(err => console.log(err))
  }, [])
  const navigate = useNavigate() 


  useEffect(() => {
    const q = search.trim().toLowerCase() 
    if (!q) setFiltered(categories) 
    else setFiltered(categories.filter(c => c.toLowerCase().includes(q))) 
  }, [search, categories]) 



  function geticon(name){


    if (name.toLowerCase().includes("soup")) return <SoupIcon /> 
    if (name.toLowerCase().includes("pasta")) return <PastaIcon /> 
    if (name.toLowerCase().includes("pizza")) return <PizzaIcon /> 
    if (name.toLowerCase().includes("salad")) return <SaladIcon /> 


    return <OtherIcon /> 
  }

  return (
    <main className="categories-page">
      <h2 className="categories-title">All Categories</h2>
      <p className="categories-sub">Lorem ipsum dolor, sit amet consectetur adipisicing.</p>

      <div className="categories-searchbar">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" aria-label="Search">
          <SearchIcon />
        </button>
      </div>

      {filtered.length === 0 && (
        <p className="categories-empty">No found</p>
      )}

      <section className="categories-grid">
        {filtered.map((c, i) => (

          <button
            className="home-cat"
            key={i}
            type="button"
            onClick={() => navigate('/recipes?q='+c)}
            title={`Explore ${c}`}
          >
            {geticon(c)}
            <span>{c}</span>
          </button>
        ))}
      </section>
    </main>
  ) 
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="#e11d48"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" />
    </svg>
  ) 
}

function SoupIcon(){ return <img height={'40px'} src="../public/icons/soupicon.png" alt="" />   }
function PastaIcon(){ return <img height={'40px'} src="../public/icons/pastaicon.png" alt="" />   }
function PizzaIcon(){ return <img height={'40px'} src="../public/icons/pizzaicon.png" alt="" />   }
function SaladIcon(){ return <img height={'40px'} src="../public/icons/saladicon.png" alt="" />   }
function OtherIcon(){ return <img height={'40px'} src="../public/icons/other.png" alt="" />   }
