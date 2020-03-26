import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './StatsCountryStyles';
import {inject, observer} from 'mobx-react';
import {StackedBarChart, Grid} from 'react-native-svg-charts';
import Flag from 'react-native-flags';
@inject('statsStore')
@inject('analyticsStore')
@observer
class StatsCountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      colors: ['#65B0FC', '#84EBB6', '#F7C75F'],
      keys: ['total_confirmed', 'total_recovered', 'total_deaths'],
    };
  }
  async componentDidMount() {
    await this.fetchStatsCountry().then(() => {
      this.setState({
        data: this.props.analyticsStore.countryAnalytics,
      });
    });
  }

  /**
   * function support
   */
  fetchStatsCountry = async () => {
    await this.props.statsStore.getStatsCountry(this.props.country.countryCode);
    await this.props.analyticsStore.getCountryAnalytics(
      this.props.country.countryCode,
    );
  };
  /**
   * render view
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.countryOver}>
          <Text style={styles.textDeath}>
            {this.props.statsStore.statsCountry.country}
          </Text>
          <Flag code={`${this.props.country.countryCode}`} size={32} />
        </View>
        <View style={styles.countryDetail}>
          <View style={{flex: 1, marginTop: 40}}>
            <View style={styles.overview}>
              <View style={styles.columnOverview}>
                <Text style={styles.textConfirm}>
                  {this.props.statsStore.statsCountry.totalConfirmed}
                </Text>
                <Text style={styles.explain}>Confirmed</Text>
                <Text style={styles.textDescriptionConfirm}>
                  + {this.props.statsStore.statsCountry.dailyConfirmed} since
                  yesterday
                </Text>
              </View>
              <View style={styles.columnOverview}>
                <Text style={styles.textDeath}>
                  {this.props.statsStore.statsCountry.totalDeaths}
                </Text>
                <Text style={styles.explain}>Deaths</Text>
                <Text style={styles.textDescriptionDeath}>
                  + {this.props.statsStore.statsCountry.dailyDeaths} since
                  yesterday
                </Text>
              </View>
              <View style={styles.columnOverview}>
                <Text style={styles.textRecovered}>
                  {this.props.statsStore.statsCountry.totalRecovered}
                </Text>
                <Text style={styles.explain}>Recovered</Text>
                <Text style={styles.textDescriptionDeath} />
              </View>
            </View>
            <View style={styles.chart}>
              <StackedBarChart
                style={{height: 300, padding: 4}}
                keys={this.state.keys}
                colors={this.state.colors}
                data={this.state.data}
                contentInset={{top: 20, bottom: 20}}>
                <Grid />
              </StackedBarChart>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <View style={styles.explainChart}>
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: '#65B0FC',
                    }}
                  />
                  <Text style={styles.textExplainChart}>Confirm</Text>
                </View>
                <View style={styles.explainChart}>
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: '#84EBB6',
                    }}
                  />
                  <Text style={styles.textExplainChart}>Recovered</Text>
                </View>
                <View style={styles.explainChart}>
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: '#F7C75F',
                    }}
                  />
                  <Text style={styles.textExplainChart}>Deaths</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default StatsCountry;
