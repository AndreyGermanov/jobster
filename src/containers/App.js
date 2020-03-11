import Base from './Base';
import AppComponent from '../components/App';
import {connect} from 'react-redux';

/**
 * Controller for root application component
 */
export default class App extends Base {

    /**
     * Binds properties and methods of this controller main screen view and returns component
     * with properties and methods
     * @returns Component to display
     */
    static component = null;
    static getComponent() {
        if (!App.component) {
            const item = new App();
            App.component =
                connect(item.mapStateToProps.bind(item), item.mapDispatchToProps.bind(item))(AppComponent);
        }
        return App.component;
    }

    /**
     * Binds application state properties to properties of current component
     * @param state - Link to state
     * @param ownProps - Link to properties, manually set to this component tag
     * @returns {*}
     */
    setupStateProps(state,ownProps) {
        return Object.assign(super.setupStateProps(state,ownProps),{
            errors: state.errors
        })
    }

    /**
     * Method runs when this component appears for the first time
     */
    async Init() {
        super.Init();
    }
}
