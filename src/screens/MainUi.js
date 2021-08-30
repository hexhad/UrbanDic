import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import CONSTANTS from '../constants/Token';

export default function MainUi() {
  const [apiList, setApiList] = useState();
  const [word, setWord] = useState();

  const RealDate = date => {
    return date.substr(0, 10);
  };

  const UrbanCall = term => {
    let url = CONSTANTS.MAIN + '?term=' + term;
    fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': CONSTANTS.HOST,
        'x-rapidapi-key': CONSTANTS.TOKEN,
      },
    })
      .then(response => response.json()) // or .text(), or .blob(), etc
      .then(resultJson => {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXX' + resultJson.list);
        setApiList(resultJson.list);
      });
  };

  return (
    <SafeAreaView style={styles.container} forceInset={{bottom: 'never'}}>
      <View style={styles.statusbar}>
        <StatusBar
          translucent
          backgroundColor="#F3F5F7"
          barStyle="dark-content"
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            marginVertical: 5,
            marginLeft: 5,
            fontFamily: 'Poppins-SemiBold',
            color: '#142847',
          }}>
          Urban Dic
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 5,
          }}>
          <TextInput
            onChangeText={word => setWord(word)}
            value={word}
            placeholder="Search"
            numberOfLines={1}
            placeholderTextColor="#A2A2A6"
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#000',
              borderRadius: 10,
              backgroundColor: '#FFFFFF',
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginRight: 5,
              flexGrow: 1,
            }}
          />
          <View>
            <TouchableOpacity
              style={styles.search}
              onPress={() => UrbanCall(word)}>
              <Image
                resizeMode="contain"
                source={require('../assets/icons/search.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#FFF',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={apiList}
          contentContainerStyle={{
            paddingBottom: 20,
            borderRadius: 10,
          }}
          ListFooterComponent={<View style={{height: 300}} />}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                padding: 20,
                marginVertical: 5,
              }}>
              <Text style={{color: '#142847', fontFamily: 'Poppins-SemiBold'}}>
                {item.word}
              </Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {item.definition
                  .split(/[ :;?!~,`&|<>{}\r\n/\\]+/)
                  .map((k, v, f) => {
                    if (k.includes('[')) {
                      if (k.includes(']')) {
                        var left = k.replace('[', '');
                        var right = left.replace(']', '');
                        console.log(':???????????????:::::>' + right);
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setWord(right);
                              UrbanCall(right);
                            }}
                            style={{
                              backgroundColor: '#0052CC',
                              padding: 1,
                              borderRadius: 3,
                              paddingHorizontal: 6,
                            }}>
                            <Text
                              style={{
                                color: '#FFF',
                                fontFamily: 'Poppins-Medium',
                              }}>
                              {right + ' '}
                            </Text>
                          </TouchableOpacity>
                        );
                      } else {
                        console.log('::::::>' + k, f[v + 1]);
                        var first = k.replace('[', '');
                        var second = f[v + 1].replace(']', '');
                        console.log(
                          '>>>>>>>>>>>>>>>>>>>>>>>?' + first + second,
                        );
                        return (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                setWord(first + ' ' + second);
                                UrbanCall(first + ' ' + second);
                              }}
                              style={{
                                backgroundColor: '#0052CC',
                                borderRadius: 3,
                                marginHorizontal: 1,
                                paddingHorizontal: 6,
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                {first + ' ' + second + ' '}
                              </Text>
                            </TouchableOpacity>
                          </>
                        );
                      }
                    }
                    if (k.includes(']')) {
                      return;
                    }
                    console.log(k + v);
                    return (
                      <Text
                        style={{
                          color: '#707070',
                          fontFamily: 'Poppins-Medium',
                        }}>
                        {k + ' '}
                      </Text>
                    );
                  })}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginVertical: 10,
                }}>
                {item.example
                  .split(/[ :;?!~,`&|<>{}\r\n/\\]+/)
                  .map((k, v, f) => {
                    if (k.includes('[')) {
                      if (k.includes(']')) {
                        var left = k.replace('[', '');
                        var right = left.replace(']', '');
                        console.log(':???????????????:::::>' + right);
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setWord(right);
                              UrbanCall(right);
                            }}
                            style={{
                              backgroundColor: '#f7f7f7',
                              padding: 1,
                              borderRadius: 3,
                              paddingHorizontal: 6,
                              marginHorizontal: 3,
                            }}>
                            <Text
                              style={{
                                color: '#959AA1',
                                fontFamily: 'Poppins-Regular',
                              }}>
                              {right + ' '}
                            </Text>
                          </TouchableOpacity>
                        );
                      } else {
                        console.log('::::::>' + k, f[v + 1]);
                        var first = k.replace('[', '');
                        var second = f[v + 1].replace(']', '');
                        console.log(
                          '>>>>>>>>>>>>>>>>>>>>>>>?' + first + second,
                        );
                        return (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                setWord(first + ' ' + second);
                                UrbanCall(first + ' ' + second);
                              }}
                              style={{
                                backgroundColor: '#f7f7f7',
                                borderRadius: 3,
                                marginHorizontal: 1,
                                paddingHorizontal: 6,
                              }}>
                              <Text
                                style={{
                                  color: '#959AA1',
                                  fontFamily: 'Poppins-Regular',
                                }}>
                                {first + ' ' + second + ' '}
                              </Text>
                            </TouchableOpacity>
                          </>
                        );
                      }
                    }
                    if (k.includes(']')) {
                      return;
                    }
                    console.log(k + v);
                    return (
                      <Text
                        style={{
                          color: '#959AA1',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {k + ' '}
                      </Text>
                    );
                  })}
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexGrow: 1, flex: 1}}>
                  <Text
                    style={{color: '#959AA1', fontFamily: 'gelasio-regular'}}>
                    {RealDate(item.written_on)}
                  </Text>
                  <Text
                    style={{color: '#959AA1', fontFamily: 'gelasio-regular'}}>
                    {item.author}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../assets/icons/thumbs_up.png')}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: '#959AA1',
                    }}
                  />
                  <Text
                    style={{color: '#959AA1', fontFamily: 'gelasio-regular'}}>
                    {item.thumbs_up}
                  </Text>
                  <Image
                    resizeMode="contain"
                    source={require('../assets/icons/thumbs_down.png')}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: '#959AA1',
                    }}
                  />
                  <Text
                    style={{color: '#959AA1', fontFamily: 'gelasio-regular'}}>
                    {item.thumbs_down}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statusbar: {
    height: 24,
    backgroundColor: '#F3F5F7',
  },
  container: {
    backgroundColor: '#F3F5F7',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  search: {
    borderRadius: 10,
    backgroundColor: '#0052CC',
    padding: 12,
    // borderColor: '#000',
    // borderWidth: 1,
    marginLeft: 5,
  },
});
