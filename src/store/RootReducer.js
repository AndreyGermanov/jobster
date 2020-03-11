import actions from '../actions/Actions';
import Store from '../store/Store';

/**
 * Root reducer function
 * @param state: Current state before change
 * @param action: Action, which should be applied to state
 * @returns new state after apply action
 */
export default function rootReducer(state,action) {

    if (!state) state = {
        errors:{},
        positions:[],
        title:"",
        department:"",
        description:"",
        status:'open',
        create_date: new Date(),
        successMessage: "",
        testingMode:false
    };
    let newState = require('lodash').cloneDeep(state);
    switch (action.type) {
        case actions.types.CHANGE_PROPERTY:
            changeProperty(action.name,action.value,newState);
            break;
        case actions.types.CHANGE_PROPERTIES:
            for (let name in action.properties) changeProperty(name,action.properties[name],newState);
            break;
        default:
            break;
    }
    return newState;
}

/**
 * Method used to change property in application state. Supports hierarchical properties
 * @param name - Name of property to change
 * @param value - new property value
 * @param newState - link to application state
 * @returns Modified application state
 */
const changeProperty = function(name,value,newState) {
    eval("newState"+Store.getPropertyNameExpression(name)+ " = _.cloneDeep(value);");
    return newState
};
