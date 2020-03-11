import React from 'react'
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Confirmation from '../containers/Confirmation';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

describe('Confirmation screen',()=> {
    const initialState = {positions:[],successMessage:"",testingMode:true};
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        Enzyme.configure({ adapter: new Adapter() })
        store = mockStore(initialState);
    })

    it('render component', () => {
        const ConfirmationComponent = Confirmation.getComponent();
        wrapper = shallow(<Provider store={store}><ConfirmationComponent/></Provider>);
        expect(wrapper.find(ConfirmationComponent).length).toEqual(1);
    });
});

