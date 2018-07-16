import React from "react";
import { render } from 'react-dom';
import {BrowserRouter,HashRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import App from './containers/app.jsx';
import store from "./store/store.js";
import style from "./scss/main.scss";

render(	  <Provider store={store}>
				<BrowserRouter basename="/SolversHost">
				      <App/>
				</BrowserRouter>
			</Provider>,
			    document.getElementById('root'));
		