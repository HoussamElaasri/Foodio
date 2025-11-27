import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function Home() {
  const [mainrecipe,setmainrecipe]=useState({})
  const [firstr,setfirstr]=useState({})
  const [secondr,setsecondr]=useState({})
  const [thirtr,setthirtr]=useState({})
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(0)


  useEffect(() => {
  var mainrecipeid = Math.floor(Math.random() * 40)+1
  var firstrid = Math.floor(Math.random() * 40)+1
  var secondrid = Math.floor(Math.random() * 40)+1
  var thirtrid = Math.floor(Math.random() * 40)+1

  axios.get(`https://dummyjson.com/recipes/${mainrecipeid}`)
    .then(res=>setmainrecipe(res.data))
    .catch(err=>console.log("Error :" + err))
    .finally(() => setDone(p => p + 1))  // 🔥 NEW

  axios.get(`https://dummyjson.com/recipes/${firstrid}`)
    .then(res=>setfirstr(res.data))
    .catch(err=>console.log("Error :" + err))
    .finally(() => setDone(p => p + 1));  // 🔥 NEW

  axios.get(`https://dummyjson.com/recipes/${secondrid}`)
    .then(res=>setsecondr(res.data))
    .catch(err=>console.log("Error :" + err))
    .finally(() => setDone(p => p + 1));  // 🔥 NEW

  axios.get(`https://dummyjson.com/recipes/${thirtrid}`)
    .then(res=>setthirtr(res.data))
    .catch(err=>console.log("Error :" + err))
    .finally(() => setDone(p => p + 1));  // 🔥 NEW

}, []);

useEffect(()=>{
  if (done === 4) {
    setLoading(false)
  }
},[done])
    



     const categories = [
    { label: "Soup", icon: SoupIcon },
    { label: "Pasta", icon: PastaIcon },
    { label: "Pizza", icon: PizzaIcon },
    { label: "Salad", icon: SaladIcon },
  ];

  const popular = [
    {
      id: firstr.id,
      title: firstr.name,
      cuisine: firstr.cuisine,
      time: firstr.prepTimeMinutes,
      img: firstr.image,
    },
    {
      id: secondr.id,
      title: secondr.name,
      cuisine: secondr.cuisine,
      time: secondr.prepTimeMinutes,
      img: secondr.image,
    },
    {
      id: thirtr.id,
      title: thirtr.name,
      cuisine: thirtr.cuisine,
      time: thirtr.prepTimeMinutes,
      img: thirtr.image,
    },
    
  ];
  const navigate = useNavigate();
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
  );
}



  return (
    
    <main className="home-page">
      <div className="home-search">
        <input type="text" placeholder="Looking for something delicious ?" />
        <button type="button" aria-label="Open camera">
          <SearchIcon />
        </button>
      </div>

      <section className="home-section">
        <div className="home-row">
          <h3 className="home-title">Discover Recipes</h3>
        </div>

        <article className="home-feature">
          <div className="home-feature__info">
            <p className="home-feature__eyebrow">{mainrecipe.cuisine}</p>
            <h4 className="home-feature__title">{mainrecipe.name}</h4>

            <div className="home-feature__rating">
              <StarsIcon />
              <span>{mainrecipe.reviewCount} ratings</span>
            </div>

            <Link to={`/recipe/${mainrecipe.id}`} className="home-btn home-btn--solid login-bttn">
              Check recipe
            </Link>
          </div>

           <div className="home-feature__media">
    <img
      src={mainrecipe.image}
      onClick={()=>navigate("/recipe/"+mainrecipe.id)}
      style={{maxHeight:"300px"}}
      className="home-feature__img"
    />
    <BookmarkBadge />
  </div>

        </article>
      </section>

      <section className="home-section">
        <div className="home-row">
          <h3 className="home-title">Pick a category</h3>
          <Link className="home-see-more" to={"/categories"}>See more →</Link>
        </div>

        <div className="home-cats">
          {categories.map((c) => (
            <button className="home-cat" key={c.label} type="button" onClick={() => navigate(`/recipes?q=`+c.label)}>
              <c.icon />
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h3 className="home-title">Popular today</h3>

        <div className="home-grid">
          {popular.map((p) => (
            <article className="home-card" key={p.id} onClick={()=>navigate("/Recipe/"+p.id)}>
              <div
                className="home-card__img"
                style={{ backgroundImage: `url('${p.img}')` }}
                role="img"
                aria-label={p.title}
              />
              <div className="home-card__body">
                <h4 className="home-card__title">{p.title}</h4>
                <p className="home-card__meta">{p.cuisine}</p>
                <div className="home-card__footer">
                  <ClockIcon />
                  <span>{p.time} min</span>
                </div>
              </div>
            </article>
          ))}
        </div>
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
      aria-hidden="true"
      fill="none"
      stroke="#e11d48"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" />
    </svg>
  );
}


function StarsIcon() {
  return (
    <div className="home-stars" aria-hidden="true">
      <span>★★★★★</span>
    </div>
    
  );
}
function BookmarkBadge() {
  return (
    <span className="home-bookmark" aria-label="Save recipe">
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path fill="#fff" d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z"/>
        <path fill="#e11d48" d="M7 4h10v13l-5-3-5 3V4z"/>
      </svg>
    </span>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path fill="#6b7280" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5h-2v6l5 3 1-1-4-2V7z"/>
    </svg>
  );
}

function SoupIcon(){ return <img height={'40px'} src="../public/icons/soupicon.png" alt="" /> ; }
function PastaIcon(){ return <img height={'40px'} src="../public/icons/pastaicon.png" alt="" /> ; }
function PizzaIcon(){ return <img height={'40px'} src="../public/icons/pizzaicon.png" alt="" /> ; }
function SaladIcon(){ return <img height={'40px'} src="../public/icons/saladicon.png" alt="" /> ; }
