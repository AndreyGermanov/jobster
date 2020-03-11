import {createStore} from 'redux'
import rootReducer from './RootReducer'
import _ from 'lodash';
import async from 'async';
import actions from '../actions/Actions'

/**
 * Wrapper class for Redux store, which used to manage application state
 */
const Store = class {

    // Link to current Redux Store instance
    static instance;

    /**
     * Method used to implement "Singleton" pattern for this object. It returns single instance of Application state store
     * @returns Store instance
     */
    static getInstance() {
        if (Store.instance == null)
            Store.instance = new Store();
        return Store.instance;
    }

    /**
     * Class constructor
     */
    constructor() {
        // Link to actual Redux store, which manages application state using RootReducer
        this.store = createStore(rootReducer);
        // List of registered events and their subscribers
        this.events = {};
        // Link of nested stores inside this store
        this.subStores = [];
    }

    /**
     * Method returns copy of current application state
     */
    getState() {
        return _.cloneDeep(this.store.getState());
    }

    /**
     * Method used to trigger custom events, which will be propagated to all listeners
     * @param event Name of event
     * @param params Params which sent to event
     * @param callback function, which will be called after event handled by all subscribed listeners
     */
    triggerEvent(event,params,callback) {
        if (!this.events[event] || !this.events[event].length) return;
        let events = _.clone(this.events[event]);
        let responses = [];
        async.eachSeries(events,(handler,callback) => {
            if (typeof(handler) !== "function") {
                callback();
                return;
            }
            if (handler.length < 3) { handler(event,params);callback();return; }
            handler(event, params,(obj,response) => {
                if (typeof(obj) !== 'undefined' && typeof(response) !== 'undefined') {
                    responses.push({obj:obj,response:response});
                }
                callback();
            })
        }, function() {
            if (callback) callback(responses);
        })
    }


    /**
     * Method which used to subscribe object to specified custom event
     * @param event - Name of event to subscribe to
     * @param callback - Handler function which will be executed
     */
    subscribe(event,callback) {
        if (!this.events[event]) this.events[event] = [];
        if (this.events[event].indexOf(callback) === -1) this.events[event].push(callback);
        return callback;

    }

    /**
     * Method which used to unsubscribe object from specified custom event
     * @param event - Name of event to unsubscribe from
     * @param callback - Handler function which will be executed
     */
    unsubscribe(event,callback) {
        if (!this.events || !this.events[event] || !this.events[event].indexOf) { return }
        let index = this.events[event].indexOf(callback);
        if (index === -1) { return; }
        this.events[event].splice(index,1);
    }

    /**
     * Method triggers reducer to change application property change event
     * @param name - Name of property
     * @param value - New value
     */
    changeProperty(name,value) {
        this.store.dispatch(actions.changeProperty(name,value))
    }

    /**
     * Method triggers reducer to change group of properties in application state
     * @param keyValues - Hashmap of property names and their values {key1:value1,key2:value2,...}
     */
    changeProperties(keyValues) {
        this.store.dispatch(actions.changeProperties(keyValues))
    }

    /**
     * Method used to construct property name expression from
     * @param name, can be hierarchical: like "ProductsPage.item.name"
     * @returns String expression, which points to property path, like ProductsPage["item"]["name"]
     */
    getPropertyNameExpression(name) {
        return name.split(".").map( namePart => "['"+namePart+"']").reduce((s,s1) => s+s1)
    }

    /**
     * Method returns value of specified property
     * @param name - Name of property
     * @returns value of property
     */
    getValue(name) {
        let state = this.getState();
        return eval("state"+this.getPropertyNameExpression(name))
    }

    /**
     * Returns value of property by name (flat fast variant)
     * @param name - Name of property
     */
    getProperty(name) { return this.getValue(name)};

    /**
     * Getter method for this.subStores
     * @returns {Array|*}
     */
    getSubStores() {return this.subStores; }

    /**
     * Setter method for this.subStores
     * @param subStores
     */
    setSubStores(subStores) { this.subStores = subStores;}
};

export default Store.getInstance()
