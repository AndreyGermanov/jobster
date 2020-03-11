import Base from "./Base";
import ConfirmationComponent from "../components/Confirmation";
import {connect} from 'react-redux';

/**
 * Controller for Confirmation page
 */
export default class Confirmation extends Base {

    /**
     * Binds properties and methods of this controller main screen view and returns component
     * with properties and methods
     * @returns Component to display
     */
    static component = null;
    static getComponent() {
        if (!Confirmation.component) {
            const item = new Confirmation();
            Confirmation.component =
                connect(item.mapStateToProps.bind(item), item.mapDispatchToProps.bind(item))(ConfirmationComponent);
        }
        return Confirmation.component;
    }

    /**
     * Binds application state properties to properties of current component
     * @param state - Link to state
     * @param ownProps - Link to properties, manually set to this component tag
     * @returns {*}
     */
    setupStateProps(state, ownProps) {
        return Object.assign(super.setupStateProps(state, ownProps), {
            positions: state.positions,
            testingMode: state.testingMode
        })
    }

    /**
     * Method runs when this component appears for the first time
     */
    async Init() {
        super.Init();
        const positions = window.localStorage.getItem("positions");
        if (positions && !this.testingMode) {
            try {
                this.positions = JSON.parse(positions);
                this.applyPropsToState();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
