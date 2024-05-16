import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {Bold, Styles, primaryColor} from '../utils/Style';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../images/profile.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../images/profile.png'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../images/profile.png'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../images/profile.png'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../images/profile.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const MessagesScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  return (
    <ScrollView
      style={{
        height: height,
        width: width,
      }}>
      <View>
        <Text
          style={Styles.HeaderTitle}>
          Your Chats Are Here!
        </Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        <FlatList
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={Styles.FlatlistTO}
              onPress={() =>
                navigation.navigate('NewMessage', {userName: item.userName,})
              }>
              <View style={Styles.FlatlistMainView}>
                <View style={Styles.ImageView}>
                  <Image
                    source={item.userImg}
                    style={{height: 100, width: 100}}
                  />
                </View>
                <View style={Styles.TextView}>
                  <View>
                    <Text style={Styles.FlatlistText}>{item.userName}</Text>
                    <Text style={Styles.FlatlistText}>{item.messageTime}</Text>
                  </View>
                  <Text style={Styles.FlatlistText}>{item.messageText}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
