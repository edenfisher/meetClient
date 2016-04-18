/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Alert,
  Navigator,
  ToolbarAndroid,
  BackAndroid
} from 'react-native';
import Button from 'react-native-button';

class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Button
        style={{fontSize: 10, color: 'black'}}
        onPress={()=>console.log()}
      >
        Press Me!
      </Button>
      <Navigation />
      </View>
    );
  }
}

class Navigation extends Component{
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'first'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'first':
        return (<First navigator={navigator} title="first"/>);
      case 'second':
        return (<Second navigator={navigator} title="second" />);
    }
  }
}
var _navigator; // we fill this up upon on first navigation.

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

class Second extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
                        title={this.props.title}
                        onIconClicked={this.props.navigator.pop}
                        titleColor={'#FFFFFF'}/>
        <Text>
          Second screen
        </Text>
      </View>
    );
  }
};

class First extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  navSecond(){
    this.props.navigator.push({
      id: 'second'
    })
  }
  render() {
    if (!this.state.loaded) {
        return this.renderLoadingView();
      }
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
                        title={this.props.title}
                        titleColor={'#FFFFFF'}/>
        <TouchableHighlight onPress={this.navSecond.bind(this)}>
          <Text>Navigate to second screen</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderGroup}
          style={styles.listView}
        />
      </View>
    );
  }
  _handlePress(event) {
      console.log('pressed');
  }
  componentDidMount() {
      this.fetchData();
    }
  fetchData() {
    var groups = ["angularjs","react-native","android"];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(groups),
      loaded: true,
    });
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading groups...
        </Text>
      </View>
    );
  }
  _onPressButton() {
    Alert.alert(
          'Alert Title',
          "alertMessage",
        );
  }
  renderGroup(group) {
    return (
      <TouchableHighlight onPress={()=>Alert.alert(
            'Group',
            group,
          )}>
        <View style={styles.container}>
          <Text style={styles.title}>{group}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding:40,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection:'row',
    backgroundColor: '#98E2FA',
  },
  listView: {
    backgroundColor: '#F5FCFF',
    flex:1,
    alignSelf:'center'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
