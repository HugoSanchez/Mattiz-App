import React, { Component } from 'react';
import { RootNavigator } from './navigator';

export default class Root extends Component {
    constructor(props){
        super(props);
        console.disableYellowBox = true;
    }
    
    render() {
        const Root = RootNavigator()
        return <Root />
    }
}