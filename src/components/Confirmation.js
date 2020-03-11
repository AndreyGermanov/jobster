import React,{Component} from 'react'
import Header from '../containers/Header';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';

/**
 * Component used to display Confirmation page
 */
export default class Confirmation extends Component {

    /**
     * Method used to render component on the screen
     */
    render() {
        console.log(this.props.positions);
        const HeaderComponent = Header.getComponent();
        return <div className="container-fluid" style={{margin:'30px'}}>

            <div className="row">
                <h3>Your Position Posted Successfully !</h3>
            </div>
            <div className="row">
                <div className="accordion col-md-11" id="positionsAccordion">
                    { this.props.positions.map((item, index) => this.renderPosition(item,index)) }
                </div>
            </div>
        </div>
    }

    renderPosition(item,index) {
        return (
            <div className="card">
                <div className="card-header" data-toggle="collapse" data-target={"#item" + index} aria-expanded="false">
                        {item.title}
                    {item.status === "open" ?
                        <a className="btn btn-primary pull-right">Apply</a>
                        : <span className="pull-right">Closed</span>
                    }
                </div>
                <div className="collapse" id={"item"+index}
                     data-parent="#positionsAccordion">
                    <div className="card-body">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <th>Title</th>
                                <td>{item.title}</td>
                            </tr>
                            <tr>
                                <th>Create Date</th>
                                <td>{moment(item.create_date).format("YYYY-MM-DD")}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{item.status}</td>
                            </tr>
                            <tr>
                                <th>Department</th>
                                <td>{item.department}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{item.description}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Method executed automatically after component appears on the screen
     */
    componentDidMount() {
        this.props.Init();
    }
}
