import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./styles/_index.scss" 
import { Provider } from "react-redux"
import store from "./store/store.ts"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<App />
	</Provider>
)
