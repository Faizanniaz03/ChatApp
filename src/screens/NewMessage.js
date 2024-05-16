import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewMessage = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const [imageData, setImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [userId, setUserId] = useState('')
    console.log("🚀 ~ NewMessage ~ userId:", userId)
    const getUserId = async ()=>{
         const UID = await AsyncStorage.getItem('@UserId')
         setUserId(UID)
    }
    useEffect(()=>{
        getUserId()
    },[])
    const { userName,} = route.params; // Assuming userId is passed as a route param

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('chats')
            .doc(userName)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .onSnapshot(snapshot => {
                const allMessages = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const createdAt = data.createdAt
                        ? data.createdAt.toDate()
                        : new Date();
                    return {
                        ...data,
                        createdAt,
                        _id: doc.id,
                    };
                });
                setMessages(allMessages);
            });
        return () => unsubscribe();
    }, [userName]);

    const onSend = messageArray => {
        let myMsg = null;
        if (imageUrl !== '') {
            const msg = messageArray[0];
            myMsg = {
                ...msg,
                image: imageUrl,
                user: { _id: userId },
            };
        } else {
            const msg = messageArray[0];
            myMsg = {
                ...msg,
                image: '',
                user: { _id: userId },
            };
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
        firestore()
            .collection('chats')
            .doc(userName)
            .collection('messages')
            .add({
                ...myMsg,
                createdAt: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                console.log('Message sent');
            });
        setImageUrl('');
        setImageData(null);
    };

    const openCamera = async () => {
        const result = await launchCamera({ mediaType: 'photo' });
        if (!result.didCancel) {
            setImageData(result);
            uploadImage(result);
        }
    };

    const uploadImage = async imageData => {
        const reference = storage().ref(imageData.assets[0].fileName);
        const pathToFile = imageData.assets[0].uri;
        await reference.putFile(pathToFile);
        const url = await reference.getDownloadURL();
        setImageUrl(url);
    };

    const renderInputToolbar = props => (
        <InputToolbar
            {...props}
            textInputProps={{
                style: { color: 'black', width: '87%', marginLeft: 5, fontSize: 18 },
            }}
            maxInputLength={20}
        />
    );

    return (
        <View style={{ height: '100%', backgroundColor: '#fff' }}>
            <GiftedChat
                alwaysShowSend
                renderSend={props => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                        <Send {...props} containerStyle={{ justifyContent: 'center' }}>
                            <Text style={{ color: 'blue', fontSize: 18 }}>Send</Text>
                        </Send>
                    </View>
                )}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{ _id: userId }} // Ensure correct user ID is used
                renderBubble={props => (
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: { backgroundColor: 'orange' },
                        }}
                    />
                )}
                renderInputToolbar={renderInputToolbar}
            />
        </View>
    );
};

export default NewMessage;
