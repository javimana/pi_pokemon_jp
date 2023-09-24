import { Route, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import { Home, Landing, Detail, Form } from "./views/myViews";
import NavBar from "./components/NavBar/NavBar";
import About from "./views/About/About";

function App() {
  const location = useLocation(); //me muestro en el objeto location en la propiedad pathname donde estas ubicado

  //comentario prueba git flow
  // segunda prueba
  // finish

  return (
    <div className="App">
      {/* {location.pathname !== "/" && <NavBar />} */}
      <Route path="/home" render={() => <Home />} />
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/about" component={About} />
    </div>
  );
}

export default App;
