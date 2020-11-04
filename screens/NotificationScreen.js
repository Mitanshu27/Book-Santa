import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import config from '../config';
export default class NotificationScreen extends Component {
    constructor() {
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            allNotifications : [],
        }
        this.notificatonRef=null;
    }
    getNotification = () => {
        this.requestref = db.collection('all_notifications')
        .where('notification_status','==','unread')
        .where('targeted_user_id','==',this.state.userId)
        .onSnapshot((snapshot) => {
            var allNotifications = [];
            snapshot.docs.map((doc)=>{
                var notification = [];
                notification['doc.id']=doc.id;
                allNotifications.push(notification);
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }
    componentDidMount() {
        this.getNotification();
    }
    componentWillUnmount(){
        this.notificatonRef();
    }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({item,index}) =>{
        return (
          <ListItem
            key={index}
            leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
            title={item.book_name}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={item.message}
            bottomDivider
          />
        )
   }
    render(){
        return(
          <View style={styles.container}>
            <View style={{flex:0.1}}>
              <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
            </View>
            <View style={{flex:0.9}}>
              {
                this.state.allNotifications.length === 0
                ?(
                  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:25}}>You have no notifications</Text>
                  </View>
                )
                :(
                  <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                  />
                )
              }
            </View>
          </View>
        )
      }
    }
    
    
    const styles = StyleSheet.create({
      container : {
        flex : 1
      }
    })