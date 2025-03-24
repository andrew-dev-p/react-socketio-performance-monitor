import socketConnection from "./socketConnection";

function App() {
  socketConnection.on("connect", () => {
    console.log("Connected to server");
  });

  return <>123</>;
}

export default App;
