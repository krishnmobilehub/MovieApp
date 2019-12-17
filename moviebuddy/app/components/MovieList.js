import React,{Component} from 'react';
import {
    Text,
    View,
    Image,
    ListView,
    ActivityIndicator,  
    TouchableHighlight, 
} from 'react-native';
import {styles} from '../styles/Main';
import MovieDetail from './MovieDetail';
const REQUST_URL = 'https://api.douban.com/v2/movie/top250';

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: new ListView.DataSource({
              rowHasChanged:(row1,row2) => row1 !== row2
            }),
            loaded:false
        }
        this.fetchData();
    }

    fetchData(){
      fetch(REQUST_URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          movies:this.state.movies.cloneWithRows(responseJson.subjects),
          loaded:true
        })
      })
      .done();
    }
    showMovieDetail(movie){
      this.props.navigator.push({
        title:movie.title,    
        component:MovieDetail, 
        passProps:{movie} 
      })
    }
    renderMovieList(movie){
      return (
      <TouchableHighlight underlayColor="rgba(34,26,38,0.1)" onPress={()=>{
          this.showMovieDetail(movie)
      }}>
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image source={{uri:movie.images.large}} style={styles.image}/>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.title}</Text>
            <Text style={styles.itemMeta}>{movie.original_title} ({movie.year})</Text>
            <Text style={styles.redText}>{movie.rating.average}</Text>
          </View>
        </View>
      </TouchableHighlight>
      )
    }
    render() {
        if (!this.state.loaded){
          return (
            <View style={styles.container}>
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#6435c9"/>
                </View>
            </View>
          )
        }
        return (
            <View style={[styles.container,{paddingTop:70}]}>
                <ListView dataSource={this.state.movies} renderRow={this.renderMovieList.bind(this)}/>
            </View>
        );
    }
}
