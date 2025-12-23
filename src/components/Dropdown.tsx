import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  data: DropdownOption[];
  active: string;
  onSelect: (value: string) => void;
}

const Dropdown = ({ data, active, onSelect }: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={() => setOpen(!open)}>
        <Text style={styles.text}>{active}</Text>
      </Pressable>

      {open && (
        <View style={styles.dropdownContainer}>
          <ScrollView contentContainerStyle={{ gap: 4, width: 80 }}>
            {data?.map((item, i) => {
              return (
                <Pressable
                  onPress={() => {
                    onSelect(item.value);
                    setOpen(false);
                  }}
                  style={styles.item}
                  key={item.value + i}
                >
                  <Text style={styles.text}>{item.label}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    width: "30%",
    zIndex: 2,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: { width: "100%", textAlign: "center" },
  btn: { width: "100%", textAlign: "center", padding: 10 },
  dropdownContainer: {
    gap: 2,
    width: 90,
    maxHeight: 300,
    backgroundColor: "lightgrey",
    padding: 4,
    top: 40,
    zIndex: 10,
    // left: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
  },
  item: {
    width: 80,
    backgroundColor: "grey",
    // width: "100%",
    // height: 30,
    padding: 10,
    borderRadius: 5,
  },
});
