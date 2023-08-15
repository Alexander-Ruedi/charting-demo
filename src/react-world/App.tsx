import './App.css';
import {SprottyComponent} from "./Sprotty/SprottyComponent";
import { graphData} from "../sprotty-world/model-source";

function App() {
  return (
    <div className="App" style={{height: "100%"}}>
      <SprottyComponent data={graphData}/>
    </div>
  );
}

export default App;
