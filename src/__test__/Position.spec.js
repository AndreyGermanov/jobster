import React from 'react'
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Position from '../containers/Position';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

describe('Add Position screen',()=> {
    const initialState = {positions:[],successMessage:"",title:"",description:"",department:"",status:'open',create_date:new Date(),testingMode:true,errors:{}};
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        Enzyme.configure({ adapter: new Adapter() })
        store = mockStore(initialState);
    })

    it('render component', () => {
        const PositionComponent = Position.getComponent();
        wrapper = shallow(<Provider store={store}><PositionComponent/></Provider>);
        expect(wrapper.find(PositionComponent).length).toEqual(1);
    });
});

