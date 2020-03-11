import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import Store from "./store/Store";
import {Provider} from 'react-redux';

const AppComponent = App.getComponent();
ReactDOM.render(
    <Provider store={Store.store}>
        <AppComponent />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
