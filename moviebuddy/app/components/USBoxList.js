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
import USBoxDetail from './USBoxDetail';



const REQUST_URL = 'https://api.douban.com/v2/movie/us_box';

export default class USBox extends Component {
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
        component:USBoxDetail, 
        passProps:{movie} 
      })
    }
    renderMovieList(movie){
      return (
      <TouchableHighlight underlayColor="rgba(34,26,38,0.1)" onPress={()=>{
        this.showMovieDetail(movie);
      }}>
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image source={{uri:movie.subject.images.large}} style={styles.image}/>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.subject.title}</Text>
            <Text style={styles.itemMeta}>{movie.subject.original_title} ({movie.subject.year})</Text>
            <Text style={styles.redText}>{movie.subject.rating.average}</Text>
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
