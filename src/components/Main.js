import React,{Component} from 'react'
import Header from '../containers/Header';

/**
 * Component used to display Main page
 */
export default class Main extends Component {

    /**
     * Method used to render component on the screen
     */
    render() {
        const HeaderComponent = Header.getComponent();
        return <div className="container-fluid">
            <div className="row">
                <div className="col-sm" style={{backgroundColor:"#7777ff",margin:'10px',padding:'30px',textAlign:'center'}}>
                    <a href="/#/position">Create one or more new Positions</a>
                </div>
                <div className="col-sm" style={{backgroundColor:"#7777ff",margin:'10px',padding:'30px',textAlign:'center'}}>
                    <a href="#">Create one or more new Candidates</a>
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
