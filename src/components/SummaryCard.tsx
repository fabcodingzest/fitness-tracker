import ProgressBar from "@/components/ProgressBar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SummaryPropTypes {
  type: "weekly" | "daily";
}

const SummaryCard = ({ type }: SummaryPropTypes) => {
  return (
    <View>
      <Text>SummaryCard - {type}</Text>
      <ProgressBar />
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({});
