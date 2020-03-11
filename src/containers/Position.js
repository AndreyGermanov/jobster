import Base from "./Base";
import PositionComponent from "../components/Position";
import {connect} from 'react-redux';
import Store from "../store/Store";

/**
 * Controller for Add Position page
 */
export default class Position extends Base {

    /**
     * Binds properties and methods of this controller main screen view and returns component
     * with properties and methods
     * @returns Component to display
     */
    static component = null;
    static getComponent() {
        if (!Position.component) {
            const item = new Position();
            Position.component =
                connect(item.mapStateToProps.bind(item), item.mapDispatchToProps.bind(item))(PositionComponent);
        }
        return Position.component;
    }

    /**
     * Binds application state properties to properties of current component
     * @param state - Link to state
     * @param ownProps - Link to properties, manually set to this component tag
     * @returns {*}
     */
    setupStateProps(state, ownProps) {
        return Object.assign(super.setupStateProps(state, ownProps), {
            title:state.title,
            department:state.department,
            description:state.description,
            status:state.status,
            errors:state.errors,
            create_date:state.create_date,
            positions: state.positions,
            successMessage:state.successMessage,
            testingMode:state.testingMode
        })
    }

    /**
     * Method runs when this component appears for the first time
     */
    async Init() {
        super.Init();
        this.clearForm();
        const positions = window.localStorage.getItem("positions");
        if (positions && !this.testingMode) {
            try {
                this.positions = JSON.parse(positions);
                this.applyPropsToState();
            } catch (err) {
                console.error(err);
            }
        }
        Store.changeProperty("successMessage","");
    }

    ChangeField(name,value) {
        if (name === "create_date" && typeof(value) === "object") { value = value.toDate(); }
        super.ChangeField(name,value);
    }

    OnSaveAndAddAnotherClick() {
        this.errors = {};
        this.applyPropsToState();
        if (this.validateForm()) {
            this.addToPositions();
            this.clearForm();
            this.applyPropsToState();
            Store.changeProperty("successMessage","Position added successfully");
            setTimeout(()=>Store.changeProperty("successMessage",""),3000);
        } else {
            this.applyPropsToState();
        }
    }

    OnSaveClick() {
        this.errors = {};
        this.applyPropsToState();
        if (this.validateForm()) {
            this.addToPositions();
            if (!this.testingMode) {
                window.localStorage.setItem("positions", JSON.stringify(this.positions));
            }
            this.clearForm();
            window.location.href = window.location.origin+"/#/confirmation";
        }
        this.applyPropsToState();
    }

    validateForm() {
        if (!this.title) { this.errors["title"] = "Title is required"; }
        if (!this.department) { this.errors["department"] = "Department is required "; }
        if (!this.description) { this.errors["description"] ="Description is required"; }
        if (!this.status) { this.errors["status"] = "Status is required"; }
        if (!this.create_date) { this.errors["create_date"] = "Create date is required" }
        return !Object.getOwnPropertyNames(this.errors).length
    }

    addToPositions() {
        this.positions.push({title:this.title,department:this.department,description:this.description,status:this.status,create_date:this.create_date});
    }

    clearForm() {
        this.title = "";
        this.department = "";
        this.description = "";
        this.status = "open";
        this.create_date = new Date();
    }
}
