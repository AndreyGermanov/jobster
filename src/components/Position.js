import React,{Component} from 'react'
import Header from '../containers/Header';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'

/**
 * Component used to display Add Position page
 */
export default class Position extends Component {

    /**
     * Method used to render component on the screen
     */
    render() {
        const HeaderComponent = Header.getComponent();
        return <div className="container-fluid" style={{margin:'30px'}}>
            <div className="row"><h3>Add Position</h3></div>
            <div className="row">
                <div className="col-sm">
                    <form style={{marginRight:'100px'}}>
                        {this.props.successMessage ?
                            <div className="alert alert-success">{this.props.successMessage}</div>
                        : null }
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input className={"form-control "+(this.props.errors["title"] ? "is-invalid" : "")}
                                   id="title" value={this.props.title} type="text"
                                   onChange={(e)=>this.props.ChangeField('title',e.target.value)}
                            />
                            <div className="invalid-feedback">Invalid title</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department</label>
                            <input className={"form-control "+(this.props.errors["department"] ? "is-invalid" : "")}
                                   id="department" value={this.props.department} type="text"
                                   onChange={(e)=>this.props.ChangeField('department',e.target.value)}
                            />
                            <div className="invalid-feedback">Invalid department</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className={"form-control "+(this.props.errors["description"] ? "is-invalid" : "")}
                                      id="description" value={this.props.description}
                                      onChange={(e)=>this.props.ChangeField('description',e.target.value)}
                            />
                            <div className="invalid-feedback">Invalid description</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select  className={"form-control "+(this.props.errors["status"] ? "is-invalid" : "")}
                                     id="status" value={this.props.status}
                                onChange={(e)=>this.props.ChangeField('status',e.target.value)}>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                            <div className="invalid-feedback">Invalid status</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Position Create Date</label>
                            <DateTime id="create_date" value={this.props.create_date} required={true}
                                  className={(this.props.errors["create_date"] ? "is-invalid" : "")}
                                  onChange={value=>this.props.ChangeField('create_date',value)}
                            />
                            <div className="invalid-feedback">Invalid create date</div>
                        </div>
                        <button className="btn btn-primary" type="button" onClick={()=>this.props.OnSaveClick()}>
                            Save
                        </button>
                        <button className="btn btn-primary pull-right" type="button"
                            onClick={()=>this.props.OnSaveAndAddAnotherClick()}>
                            Save and Add Another
                        </button>
                    </form>
                </div>
            </div>
        </div>
    }

    /**
     * Method executed automatically after component appears on the screen
     */
    componentDidMount() {
        this.props.Init();
    }
}
