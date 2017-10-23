import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, RefreshControl } from 'react-native';
import moment from 'moment' // for datetime format
import { GetPostsAsync } from 'utils/RestService'

export default class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      refreshing: false,
    }
  }

  componentDidMount() {
    return this._loadData();
  }

  async _loadData() {
    let respJson = await GetPostsAsync();
    console.log(respJson);
    if (respJson) {
      this.setState({
        isLoading: false,
        dataSource: respJson
      });
    }
  }

  static toDateTimeString(dateStr: string) {
    return moment(new Date(dateStr)).format('lll');
  }



  _onRefresh() {
    if (!this.state.isLoading) {
      this.setState({ refreshing: true });
      this._loadData().then(() => {
        this.setState({ refreshing: false });
      });
    }
  }

  GetFlatListItem(fruit_name) {

    alert(JSON.stringify(fruit_name));

  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 0, paddingBottom: 20, alignItems: 'stretch' }}>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={rowData => rowData._id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          renderItem={({ item }) => {
            // renderItem={(row) => {
            // var rowData = (row.item);
            console.log(item);
            return (<View
              style={{ flex: 2, padding: 10, marginTop: 5, marginBottom: 5, marginLeft: 10, marginRight: 10, backgroundColor: '#f2f9ff', alignItems: 'stretch' }}>
              <Text>{item.text}</Text>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Text>Posted by @{item.created_by}</Text>
                <Text>{Posts.toDateTimeString(item.created_at)}</Text>
              </View>
            </View>)
          }
          }
        />
      </View>
    );
  }


}