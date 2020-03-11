import Base from "./Base";
import HeaderComponent from "../components/Header";
import {connect} from 'react-redux';

/**
 * Controller for Header navigation bar component
 */
export default class Header extends Base {

    /**
     * Binds properties and methods of this controller main screen view and returns component
     * with properties and methods
     * @returns Component to display
     */
    static component = null;
    static getComponent() {
        if (!Header.component) {
            const item = new Header();
            Header.component =
                connect(item.mapStateToProps.bind(item), item.mapDispatchToProps.bind(item))(HeaderComponent);
        }
        return Header.component;
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
}
