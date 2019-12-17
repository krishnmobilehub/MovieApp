import React, {Component} from 'react';
import MovieList from './components/MovieList';
import USBoxRouter from './components/USBoxRouter';
import styles from './styles/Main';
import {icons} from './Assets/Icons';
import Featured from './components/Featured';
import SearchRouter from './components/SearchRouter';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TabBarIOS
} from 'react-native';
const REQUST_URL = 'https://api.douban.com/v2/movie/top250';

export default class MovieBuddy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured'
        }
    }
    render() {
        return (
            <TabBarIOS barTintColor="#9c27b0" tintColor="#6036aa" unselectedItemTintColor="rgba(255,255,255,.8)">
                <TabBarIOS.Item icon={{uri:icons.home,scale:8}} selectedIcon={{uri:icons.homeActive,scale:8}}  selected={this.state.selectedTab === 'featured'} title="Domestic movie" onPress={() => {
                    this.setState({selectedTab: 'featured'})
                }}>
                    <Featured/>
                </TabBarIOS.Item>
                <TabBarIOS.Item icon={{uri:icons.USAMovie,scale:7}} title="North American film" selectedIcon={{uri:icons.USAMovieActive,scale:7}} selected={this.state.selectedTab === 'us_box'} onPress={() => {
                    this.setState({selectedTab: 'us_box'})
                }}>
                    <USBoxRouter/>
                </TabBarIOS.Item>
                <TabBarIOS.Item icon={{uri:icons.search,scale:8}} title="Search for movies" selectedIcon={{uri:icons.searchActive,scale:8}} selected={this.state.selectedTab === 'search'} onPress={()=>{
                  this.setState({selectedTab: 'search'})
                }}>
                    <SearchRouter/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('moviebuddy', () => MovieBuddy);
