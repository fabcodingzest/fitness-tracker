import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SummaryCard from "./SummaryCard";

const SummaryScreen = () => {
  return (
    <View>
      <Text>SummaryScreen</Text>
      {/* Weekly Summary card  */}
      <SummaryCard type="weekly" />
      {/* Daily Summary card  */}
      <SummaryCard type="daily" />
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({});
