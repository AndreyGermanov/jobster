import Store from "../store/Store";
import _ from "lodash";

/**
 * Class which used as a base for all controllers. Contains helpful functions to
 * manage application state
 */
export default class Base {

    constructor() {
        // Contains list of properties of current controller, which linked to application state properties
        // of the same name
        this.propNames = [];
        // Name of property of application state, which contains properties related to current controller
        // If empty, then properties of current controller are in the root of application state.
        this.subState = "";
    }

    /**
     * Redux Method used to propagate methods from controller to component via "this.props".
     * All methods with uppercased names automatically propagated
     */
    mapDispatchToProps() {
        return this.getClassFunctionsForImport()
    }

    /**
     * Redux method to bind object properties to application state properties
     * @param state - Link to application state
     * @param ownProps - Link to properties, provided to related component as tag attributes
     */
    mapStateToProps(state,ownProps) {
        let stateProps = {};
        let props = this.setupStateProps(state,ownProps);
        this.propNames = [];
        for (let name in props) {
            this[name] = props[name];
            this.propNames.push(name);
            stateProps[name] = props[name];
        }
        return stateProps;
    }

    /**
     * Binds application state properties to properties of current component
     * @param state - Link to state
     * @param ownProps - Link to properties, manually set to this component tag
     * @returns {*}
     */
    setupStateProps(state,ownProps) {
        let result = {};
        if (ownProps.props && Object.getOwnPropertyNames(ownProps.props).length) {
            for (let fieldName in ownProps.props) {
                result[fieldName] = ownProps.props[fieldName]
            }
        }
        if (ownProps && typeof(ownProps) !=="undefined") {
            for (let i in ownProps) {
                result[i] = ownProps[i]
            };
        }
        return result;
    }

    /**
     * Method gets list of methods of controller, which will be propagated to component via "this.props"
     * @param obj - Object to get methods from
     * @returns Hashmap of methods
     */
    getClassFunctionsForImport(obj) {
        if (typeof(obj) === "undefined") obj = this;
        let result = {};
        let functionNames = this.getClassFunctionNamesForImport(obj);
        for (let name in functionNames) {
            if (this[functionNames[name]] && this[functionNames[name]].bind) {
                result[functionNames[name]] = this[functionNames[name]].bind(this);
            }
        }
        return result;
    }

    /**
     * Method gets list of method names of controller, which will be propagated to component via "this.props"
     * @param obj - Object to get methods from
     * @returns Array of method names
     */
    getClassFunctionNamesForImport(obj) {
        return this.getClassFunctionNames(obj).filter((prop) =>  prop[0] === prop[0].toUpperCase())
    }

    /**
     * Method returns list of method names of specified object
     * @param obj - Object to get methods from
     * @return Array of method names
     */
    getClassFunctionNames(obj) {
        let props = [];
        do {
            props = props.concat(Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj));
        return props;
    }

    /**
     * Method used to get all properties of controller, which were bound to application state
     * via "setupStateProps" method and apply these values to related properties of application state
     * @param scopes - Which nested states to use in operation
     */
    applyPropsToState(scopes) {
        let state = Store.getState();
        let subStores = Store.getSubStores();
        if (typeof(scopes) === "undefined") { scopes = [this.subState]; }
        let stateProps = _.cloneDeep(state);
        scopes.forEach(scope => {
            let stateScope = state;
            if (scope !== "") {
                eval("stateScope = state"+Store.getPropertyNameExpression(scope)+";");
            }
            if (typeof(stateScope) === "undefined") { return };
            for (let propName in stateScope) {
                if (this.propNames.indexOf(propName) === -1) { continue; }
                if (typeof(this[propName]) === typeof(stateScope[propName])) {
                    if (scope !== "" || subStores.indexOf(propName) === -1) {
                        stateScope[propName] = this[propName];
                    }
                }
            }
            if (scope !== "") {
                eval("stateProps" + Store.getPropertyNameExpression(scope) + "=_.cloneDeep(stateScope);");
            } else {
                eval("stateProps=_.cloneDeep(stateScope);");
            }
        });
        Store.changeProperties(stateProps);
    }

    /**
     * Basic method to change object field value by name
     * @param name - Name of field
     * @param value - Value of field
     */
    ChangeField(name,value) {
        this[name] = value;
        this.applyPropsToState();
    }

    /**
     * Method used to show and then hide success message after successful operation
     * @param text - Text to show in message
     */
    showSuccessMessage(text) {
        this.successMessageText = text;
        this.applyPropsToState();
        setTimeout(() => {
            this.successMessageText = "";
            Store.changeProperty("successMessageText","");
        },3000)
    }

    /**
     * Method runs when this component appears for the first time
     */
    Init() {
        this.successMessageText = "";
        Store.changeProperty("successMessageText","");
    }
}
