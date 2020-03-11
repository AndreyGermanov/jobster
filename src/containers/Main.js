import Base from "./Base";
import MainComponent from "../components/Main";
import {connect} from 'react-redux';

/**
 * Controller for Files List page
 */
export default class Main extends Base {

    /**
     * Binds properties and methods of this controller main screen view and returns component
     * with properties and methods
     * @returns Component to display
     */
    static component = null;
    static getComponent() {
        if (!Main.component) {
            const item = new Main();
            Main.component =
                connect(item.mapStateToProps.bind(item), item.mapDispatchToProps.bind(item))(MainComponent);
        }
        return Main.component;
    }

    /**
     * Binds application state properties to properties of current component
     * @param state - Link to state
     * @param ownProps - Link to properties, manually set to this component tag
     * @returns {*}
     */
    setupStateProps(state, ownProps) {
        return Object.assign(super.setupStateProps(state, ownProps), {
        })
    }

    /**
     * Method runs when this component appears for the first time
     */
    async Init() {
        super.Init();
    }
}
