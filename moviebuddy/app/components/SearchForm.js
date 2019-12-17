import React from 'react';
import {View,Text,TextInput,ActivityIndicator} from 'react-native';
import {styles} from '../styles/Main';
import SearchResult from './SearchResult';
class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query:'',
      show:false,
    }
  }
  fetchData(){
    this.setState({
      show:true,
    })
    const REQUST_URL = `https://api.douban.com/v2/movie/search?q=${this.state.query}`
    fetch(REQUST_URL)
    .then((response)=>response.json())
    .then((responseJson)=>{
      this.setState({
        show:false,
      })
      this.props.navigator.push({
        title:responseJson.title,
        component:SearchResult,
        passProps:{
          results:responseJson.subjects
        }
      })
    })
    .done();
  }
  render(){
    let IsShowActivityIndicator = this.state.show?(
      <ActivityIndicator size="small" color="#6435c9" style={{
        position:'absolute',
        right:10,
        top:20,
      }} animating={true}/>
    ):null
    return (
      <View style={{paddingTop:60}}>
        <View style={{paddingTop:7,paddingLeft:7,paddingRight:7,borderColor:'rgba(100,53,201,.1)',borderBottomWidth:1}}>
          <TextInput
            style={{height:50}}
            placeholder="Search for..."
            placeholderTextColor="#6435c9"
            autoCorrect={true} 
            keyboardType="web-search" 
            clearButtonMode="while-editing" 
            clearTextOnFocus={true} 
            returnKeyType="next" 
            onChangeText={(query) => {
              this.setState({
                query
              });
            }}
            onSubmitEditing={this.fetchData.bind(this)}
          />
          {IsShowActivityIndicator}
        </View>
      </View>
    )
  }
}
export default SearchForm
