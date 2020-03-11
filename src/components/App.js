import React, { Component } from 'react';
import {HashRouter} from 'react-router-dom';
import {Route,Switch} from 'react-router';
import Main from '../containers/Main';
import Position from '../containers/Position';
import Confirmation from '../containers/Confirmation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/font-awesome.min.css';
import '../css/main.css';

window.$ = window.jQuery = require('jquery');
require('bootstrap/dist/js/bootstrap.min');

/**
 * Main application component. Used as a router to display various pages, depending on URL path
 */
class App extends Component {

    /**
     * Method used to render component on the screen
     */
    render() {
        return (
            <HashRouter>
                { this.renderRoutes() }
            </HashRouter>
        )
    }

    /**
     * Method renders list of Routes for React Router, which determines which page to show
     * depending on URL
     */
    renderRoutes() {
        const MainComponent = Main.getComponent();
        const PositionComponent = Position.getComponent();
        const ConfirmationComponent = Confirmation.getComponent();
        return (
            <Switch>
                <Route path="/position" render={() => <PositionComponent/> } />
                <Route path="/confirmation" render={() => <ConfirmationComponent/> } />
                <Route render={() => <MainComponent/> } />
            </Switch>
        )
    }

    /**
     * Method executed after component rendered on the screen
     */
    componentDidMount() {
        this.props.Init();
    }
}

export default App;
